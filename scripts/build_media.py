#!/usr/bin/env python3
"""
Pipeline de Mídias — Irondina Mascarenhas (lp-irondina)
- Lê apenas as fotos eleitas de _projeto/insumos-instagram/ (sem modificar nada em _projeto/).
- Executa enquadramento assistido focado no rosto via OpenCV (Haar Cascade) + margem de proteção
  para penteados/testa/queixo, exportando em WebP otimizado nas proporções exatas (4:5, 3:4, 1:1).
- Gera os 5 mini-avatares WebP (128x128) reais confirmados (IG-38, IG-01, IG-32, IG-09, IG-31).
- Gera os 4 placeholders WebP nas proporções exatas (4:5 e 1:1) a partir das fotos geradas/base
  para receberem a tag HTML centralizada TROCAR nos componentes React.
- Gera 1 vídeo MVP mudo curto (< 1.5 MB, WebM VP9 + MP4 H.264 + poster.webp) via ffmpeg.
- Gera a imagem Open Graph 1200x630 em public/og-image.webp e public/og-image.jpg.
"""

import json
import os
import subprocess
import sys
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent.parent
INSUMOS_DIR = ROOT / "_projeto" / "insumos-instagram"
INDICE_JSON = INSUMOS_DIR / "grades-curadoria" / "indice_tags.json"
OUT_MEDIA = ROOT / "src" / "assets" / "media"
PUBLIC_DIR = ROOT / "public"

OUT_MEDIA.mkdir(parents=True, exist_ok=True)
PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

# Inicializa detector facial OpenCV
CASCADE_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
FACE_CASCADE = cv2.CascadeClassifier(CASCADE_PATH)


def load_tag_map() -> dict[str, Path]:
    with open(INDICE_JSON, "r", encoding="utf-8") as f:
        items = json.load(f)
    mapping = {}
    for item in items:
        tag = item["tag"]
        folder = item["folder"]
        arquivo = item["arquivo"]
        mapping[tag] = INSUMOS_DIR / folder / arquivo
    return mapping


def detect_primary_face(pil_img: Image.Image) -> tuple[int, int, int, int] | None:
    """Retorna (x, y, w, h) da face principal detectada ou None."""
    rgb = np.array(pil_img.convert("RGB"))
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    h_img, w_img = gray.shape[:2]

    # Reduz escala para detecção consistente em fotos 3000x4000
    scale = 1000.0 / max(w_img, h_img) if max(w_img, h_img) > 1000 else 1.0
    small = cv2.resize(gray, (int(w_img * scale), int(h_img * scale)))

    faces = FACE_CASCADE.detectMultiScale(
        small,
        scaleFactor=1.08,
        minNeighbors=5,
        minSize=(45, 45),
    )
    if len(faces) == 0:
        return None

    # Escolhe a maior face próxima ao centro
    best_face = max(faces, key=lambda b: b[2] * b[3])
    x, y, w, h = [int(v / scale) for v in best_face]
    return (x, y, w, h)


def face_aware_crop(
    pil_img: Image.Image,
    target_w: int,
    target_h: int,
    mode: str = "portrait",
) -> Image.Image:
    """
    Recorta pil_img na proporção target_w:target_h preservando rosto, penteado e queixo.
    mode:
      - 'portrait': mantém headroom amplo para penteados/coques e busto editorial.
      - 'hero_mobile': posiciona topo do cabelo próximo à borda superior e olhos a ~22% do topo
        para liberar a metade inferior ao degradê escuro e tipografia sem cobrir o rosto.
      - 'avatar': foca no rosto + topo do cabelo + pescoço para mini-avatar 128x128.
    """
    src_w, src_h = pil_img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    face = detect_primary_face(pil_img)

    if mode == "avatar" and face is not None:
        fx, fy, fw, fh = face
        cx = fx + fw / 2.0
        # Centro levemente acima do centro geométrico da face para proteger penteado e queixo
        cy = fy + fh * 0.46
        # Janela quadrada cobrindo ~2.35x a altura da face (inclui cabelo e queixo com folga)
        box_size = min(src_w, src_h, int(max(fw, fh) * 2.45))
        box_size = max(box_size, int(min(src_w, src_h) * 0.45))

        left = int(round(cx - box_size / 2))
        top = int(round(cy - box_size * 0.50))

        left = max(0, min(left, src_w - box_size))
        top = max(0, min(top, src_h - box_size))
        cropped = pil_img.crop((left, top, left + box_size, top + box_size))
        return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Modo retrato / galeria (4:5, 3:4, 1:1) / hero_mobile
    if src_ratio > target_ratio:
        # Imagem mais larga que o alvo: ajusta largura
        crop_h = src_h
        crop_w = int(round(crop_h * target_ratio))
    else:
        # Imagem mais alta que o alvo: ajusta altura
        crop_w = src_w
        crop_h = int(round(crop_w / target_ratio))

    if mode == "hero_mobile":
        if face is not None:
            fx, fy, fw, fh = face
            face_cx = fx + fw / 2.0
            # Garante zoom mais próximo para o rosto ficar nítido na metade superior sem espaço morto
            desired_crop_h = max(int(round(fh * 3.15)), int(round(src_h * 0.62)))
            desired_crop_h = min(desired_crop_h, src_h)
            desired_crop_w = int(round(desired_crop_h * target_ratio))
            if desired_crop_w <= src_w:
                crop_w = desired_crop_w
                crop_h = desired_crop_h

            head_top = max(0, int(fy - fh * 0.45))
            eye_y = fy + fh * 0.36
            desired_top = int(round(eye_y - crop_h * 0.22))
            if desired_top < 0:
                desired_top = 0
            if desired_top > head_top:
                desired_top = head_top
            left = int(round(face_cx - crop_w / 2.0))
            left = max(0, min(left, src_w - crop_w))
            top = max(0, min(desired_top, src_h - crop_h))
        else:
            left = (src_w - crop_w) // 2
            top = int((src_h - crop_h) * 0.08)
    elif face is not None:
        fx, fy, fw, fh = face
        face_cx = fx + fw / 2.0
        # Queremos o topo da cabeça (aprox fy - 0.55*fh) sempre dentro do quadro
        head_top = max(0, int(fy - fh * 0.60))
        chin_bottom = min(src_h, int(fy + fh * 1.25))

        left = int(round(face_cx - crop_w / 2.0))
        left = max(0, min(left, src_w - crop_w))

        # Posiciona os olhos a ~34% do topo do quadro, garantindo head_top >= top
        eye_y = fy + fh * 0.38
        desired_top = int(round(eye_y - crop_h * 0.34))
        if desired_top > head_top:
            desired_top = head_top
        if desired_top + crop_h < chin_bottom:
            desired_top = chin_bottom - crop_h

        top = max(0, min(desired_top, src_h - crop_h))
    else:
        # Fallback editorial: centralizado horizontalmente e priorizando o terço superior (penteado/rosto)
        left = (src_w - crop_w) // 2
        top = int((src_h - crop_h) * 0.18)

    cropped = pil_img.crop((left, top, left + crop_w, top + crop_h))
    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)


def save_webp(img: Image.Image, dest: Path, quality: int = 84) -> None:
    img.convert("RGB").save(dest, "WEBP", quality=quality, method=6)
    kb = dest.stat().st_size / 1024
    print(f"  [OK] {dest.name} ({img.size[0]}x{img.size[1]}) -> {kb:.1f} KB")


def create_styled_placeholder(
    raw_generated_path: Path,
    fallback_src_path: Path,
    dest_path: Path,
    target_w: int,
    target_h: int,
    mode: str = "portrait",
) -> None:
    """
    Se a imagem fotográfica gerada pelo subagent image-generator existir, usa ela
    com face_aware_crop na proporção exata. Caso contrário, gera uma composição
    editorial provisória a partir da foto de referência do acervo até o subagent terminar.
    """
    if raw_generated_path.exists():
        with Image.open(raw_generated_path) as raw_img:
            out = face_aware_crop(raw_img, target_w, target_h, mode=mode)
            save_webp(out, dest_path, quality=84)
            return

    with Image.open(fallback_src_path) as base_img:
        out = face_aware_crop(base_img, target_w, target_h, mode=mode)
        # Suavização editorial sutil para diferenciar visualmente como slot provisório
        enhancer = ImageEnhance.Color(out)
        out = enhancer.enhance(0.88)
        save_webp(out, dest_path, quality=82)


def _render_montage_from_segments(
    segments: list[tuple[Path, float, float, float, int]],
    xfade_dur: float,
    transition_name: str,
    poster_src: Path,
    poster_ts: float,
    poster_crop_y: int,
    poster_out: Path,
    webm_out: Path,
    mp4_out: Path,
    poster_size: tuple[int, int] = (480, 600),
    images_only: bool = False,
) -> None:
    """
    Monta um showreel editorial sem áudio com aceleração (speed ramp) por clipe,
    transições suaves (xfade), normalização de cor e saída dupla WebM VP9 + MP4 H.264.
    segments: lista de (caminho_video, inicio_s, fim_s, fator_aceleracao, crop_y)
    """
    if not poster_src.exists():
        raise FileNotFoundError(f"Vídeo fonte não encontrado: {poster_src}")

    # 1. Extrai poster WebP limpo na dimensão exibida (evita sobredimensionamento no PageSpeed)
    pw, ph = poster_size
    poster_png = OUT_MEDIA / f"_tmp_{poster_out.stem}.png"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            f"{poster_ts:.2f}",
            "-i",
            str(poster_src),
            "-vf",
            f"crop=720:900:0:{poster_crop_y},scale={pw}:{ph}:flags=lanczos",
            "-frames:v",
            "1",
            str(poster_png),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    with Image.open(poster_png) as p_img:
        save_webp(p_img, poster_out, quality=74)
    if poster_png.exists():
        subprocess.run(["gio", "trash", str(poster_png)], check=False)

    if images_only and webm_out.exists() and mp4_out.exists():
        print(f"  [SKIP] {webm_out.name} / {mp4_out.name} (--images-only)")
        return

    for src_path, *_ in segments:
        if not src_path.exists():
            raise FileNotFoundError(f"Vídeo fonte não encontrado: {src_path}")

    # 2. Monta grafo de filtros com speed-up e xfade sincronizado
    cmd_inputs: list[str] = ["ffmpeg", "-y"]
    filter_parts: list[str] = []
    durations: list[float] = []

    for idx, (src_path, start_s, end_s, speed, crop_y) in enumerate(segments):
        cmd_inputs.extend(["-ss", f"{start_s:.2f}", "-t", f"{end_s - start_s:.2f}", "-i", str(src_path)])
        durations.append((end_s - start_s) / speed)
        # Normaliza FPS, timebase, aceleração e proporção 4:5 (560x700)
        filter_parts.append(
            f"[{idx}:v]fps=30,format=yuv420p,setpts=(PTS-STARTPTS)/{speed:.4f},"
            f"crop=720:900:0:{crop_y},scale=560:700:flags=lanczos,"
            f"eq=contrast=1.03:saturation=1.04,settb=AVTB[v{idx}]"
        )

    last_label = "[v0]"
    cumulative = durations[0]
    for idx in range(1, len(segments)):
        offset = max(0.05, cumulative - xfade_dur)
        next_label = f"[x{idx}]" if idx < len(segments) - 1 else "[vout]"
        filter_parts.append(
            f"{last_label}[v{idx}]xfade=transition={transition_name}:duration={xfade_dur:.2f}:offset={offset:.3f}{next_label}"
        )
        last_label = next_label
        cumulative = offset + durations[idx]

    filter_complex = ";".join(filter_parts)
    master_mp4 = OUT_MEDIA / f"_tmp_{mp4_out.stem}_master.mp4"

    # 3. Renderiza master intermediário CRF 14
    subprocess.run(
        [
            *cmd_inputs,
            "-an",
            "-filter_complex",
            filter_complex,
            "-map",
            "[vout]",
            "-c:v",
            "libx264",
            "-crf",
            "14",
            "-preset",
            "medium",
            "-pix_fmt",
            "yuv420p",
            str(master_mp4),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    # 4. WebM (VP9 otimizado para web)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(master_mp4),
            "-an",
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "0",
            "-crf",
            "33",
            "-row-mt",
            "1",
            "-pix_fmt",
            "yuv420p",
            str(webm_out),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    # 5. MP4 (H.264 universal +faststart)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(master_mp4),
            "-an",
            "-c:v",
            "libx264",
            "-crf",
            "25",
            "-preset",
            "slow",
            "-movflags",
            "+faststart",
            "-pix_fmt",
            "yuv420p",
            str(mp4_out),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    if master_mp4.exists():
        subprocess.run(["gio", "trash", str(master_mp4)], check=False)

    print(f"  [OK] {webm_out.name} -> {webm_out.stat().st_size / 1024:.1f} KB")
    print(f"  [OK] {mp4_out.name}  -> {mp4_out.stat().st_size / 1024:.1f} KB")


def build_video_mvp(images_only: bool = False) -> None:
    """
    Vídeo 01 (Seção 02 — Galeria): Montagem dinâmica acelerada de 5 modelos prontas
    (Raila, Faah Gomes, Cliente loira, Produção noturna e Morena sorrindo), mudo e sem texto.
    """
    vdir = INSUMOS_DIR / "videos-reels"
    v1 = vdir / "irondina_ero_3997558677174646392_2026-09-30.mp4"
    v4 = vdir / "irondina_ero_3495587945390659397_2024-11-06.mp4"
    v2 = vdir / "irondina_ero_3806533097748503741_2026-01-09.mp4"
    v6 = vdir / "irondina_ero_3282912122597067321_2024-01-18.mp4"
    v7 = vdir / "irondina_ero_3093791015533217140_2023-05-02.mp4"

    segments = [
        (v1, 0.4, 3.6, 1.30, 65),    # Raila Almeida pronta (close)
        (v4, 10.6, 14.2, 1.30, 80),  # Faah Gomes pronta (ondas glam)
        (v2, 11.0, 14.8, 1.30, 85),  # Cliente loira sorriso final
        (v6, 27.4, 31.0, 1.35, 85),  # Produção social noturna
        (v7, 11.2, 14.8, 1.35, 80),  # Cliente morena sorrindo
    ]

    _render_montage_from_segments(
        segments=segments,
        xfade_dur=0.32,
        transition_name="smoothleft",
        poster_src=v1,
        poster_ts=1.2,
        poster_crop_y=65,
        poster_out=OUT_MEDIA / "video-mvp-poster.webp",
        webm_out=OUT_MEDIA / "video-mvp-galeria.webm",
        mp4_out=OUT_MEDIA / "video-mvp-galeria.mp4",
        poster_size=(480, 600),
        images_only=images_only,
    )


def build_video_about_broll(images_only: bool = False) -> None:
    """
    Vídeo 02 (Seção 04 — Sobre & Estúdio): Montagem dinâmica de bancada Chanel/Dior
    + acabamento de estúdio + Irondina finalizando cabelo em set iluminado.
    """
    vdir = INSUMOS_DIR / "videos-reels"
    v5 = vdir / "anna.costa.a_3286847687659092550_2024-01-23.mp4"
    v1 = vdir / "irondina_ero_3997558677174646392_2026-09-30.mp4"

    segments = [
        (v5, 9.2, 13.0, 1.50, 140),  # Close produtos Chanel & Dior
        (v1, 44.4, 46.8, 1.30, 85),  # Acabamento técnico labial no estúdio
        (v5, 47.2, 51.8, 1.35, 40),  # Irondina em ação finalizando cachos
    ]

    _render_montage_from_segments(
        segments=segments,
        xfade_dur=0.30,
        transition_name="fade",
        poster_src=v5,
        poster_ts=49.0,
        poster_crop_y=40,
        poster_out=OUT_MEDIA / "video-sobre-poster.webp",
        webm_out=OUT_MEDIA / "video-sobre-bastidores.webm",
        mp4_out=OUT_MEDIA / "video-sobre-bastidores.mp4",
        poster_size=(360, 450),
        images_only=images_only,
    )


def _load_font(candidates: list[str], size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def build_og_image(tag_map: dict[str, Path]) -> None:
    """
    Gera duas miniaturas Open Graph Dark Luxe com retrato exclusivo da Irondina Mascarenhas (IRO-03):
    1) public/og-image.jpg & .webp (1200x630): texto centralizado na safe-zone (x=190) para não cortar
       letras no preview horizontal/quadrado do WhatsApp, com o lado direito excessivo removido.
    2) public/og-image-square.jpg & .webp (800x800): proporção 1:1 dedicada para miniaturas quadradas de mensageria.
    """
    serif_regular = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Roman.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        54,
    )
    serif_brand = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Roman.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        42,
    )
    serif_italic = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Italic.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-italic.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        26,
    )
    sans_meta = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/NimbusSans-Regular.otf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ],
        16,
    )

    blush = (223, 161, 148)     # #DFA194
    alabaster = (250, 248, 245) # #FAF8F5
    sand = (212, 197, 183)      # #D4C5B7

    # ------------------------------------------------------------------
    # 1) Versão Wide Safe-Zone (1200x630)
    # ------------------------------------------------------------------
    with Image.open(tag_map["IRO-03"]) as src_img:
        src_rgb = src_img.convert("RGB")
        sw, sh = src_rgb.size
        # Corta ~12% do espaço vazio à direita conforme solicitado pelo usuário e enquadra mais próximo no rosto
        trimmed = src_rgb.crop((int(sw * 0.04), 0, int(sw * 0.90), sh))
        photo = face_aware_crop(trimmed, 730, 630, mode="portrait").convert("RGBA")

    base = Image.new("RGBA", (1200, 630), (21, 16, 14, 255))  # #15100E

    # Degradê horizontal suave na borda esquerda da foto para fundir com a coluna de texto
    alpha_mask = Image.new("L", (730, 630), 255)
    mask_px = alpha_mask.load()
    fade_w = 240
    for x in range(fade_w):
        alpha_val = int(255 * ((x / fade_w) ** 1.35))
        for y in range(630):
            mask_px[x, y] = alpha_val

    base.paste(photo, (470, 0), alpha_mask)

    # Scrim RGBA à esquerda garante contraste alto mesmo sobre a área de transição
    scrim = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    scrim_px = scrim.load()
    for x in range(690):
        t = 1.0 - (x / 690.0)
        a = int(250 * (t ** 1.15))
        for y in range(630):
            scrim_px[x, y] = (21, 16, 14, a)

    canvas = Image.alpha_composite(base, scrim).convert("RGB")
    draw = ImageDraw.Draw(canvas)

    # Bloco Tipográfico na Safe Zone Central-Esquerda (x=190 evita cortes nas laterais do WhatsApp)
    tx = 190
    draw.text((tx, 102), "IRO", font=serif_brand, fill=blush)
    draw.rectangle([tx, 162, tx + 86, 164], fill=blush)

    draw.text((tx, 198), "Irondina", font=serif_regular, fill=alabaster)
    draw.text((tx, 258), "Mascarenhas", font=serif_regular, fill=blush)

    draw.text((tx + 2, 344), "BEAUTY ARTIST · GOIÂNIA–GO", font=sans_meta, fill=sand)

    draw.rectangle([tx, 392, tx + 44, 394], fill=blush)
    draw.text((tx, 416), "Make embelezadora.", font=serif_italic, fill=alabaster)
    draw.text((tx, 452), "Não transforma, realça.", font=serif_italic, fill=blush)

    og_webp = PUBLIC_DIR / "og-image.webp"
    og_jpg = PUBLIC_DIR / "og-image.jpg"
    save_webp(canvas, og_webp, quality=88)
    canvas.save(og_jpg, "JPEG", quality=88, optimize=True)
    print(f"  [OK] og-image.jpg (1200x630 safe-zone) -> {og_jpg.stat().st_size / 1024:.1f} KB")

    # ------------------------------------------------------------------
    # 2) Versão Quadrada 1:1 para Miniaturas de WhatsApp (800x800)
    # ------------------------------------------------------------------
    with Image.open(tag_map["IRO-03"]) as src_img:
        src_rgb_sq = src_img.convert("RGB")
        sw_sq, sh_sq = src_rgb_sq.size
        trimmed_sq = src_rgb_sq.crop((int(sw_sq * 0.05), 0, int(sw_sq * 0.95), sh_sq))
        sq_photo = face_aware_crop(trimmed_sq, 680, 680, mode="portrait").convert("RGBA")

    sq_base = Image.new("RGBA", (800, 800), (21, 16, 14, 255))

    # Máscara alpha bidirecional suave nas bordas esquerda (fade horizontal) e inferior (fade vertical)
    # para eliminar 100% de quina ou linha reta ao fundir com o palco #15100E
    sq_alpha = Image.new("L", (680, 680), 255)
    sq_alpha_px = sq_alpha.load()
    fade_x = 180
    fade_y_start = 460
    for y in range(680):
        ay = 1.0 if y < fade_y_start else max(0.0, 1.0 - ((y - fade_y_start) / (680 - fade_y_start)) ** 1.1)
        for x in range(680):
            ax = 1.0 if x >= fade_x else (x / fade_x) ** 1.35
            sq_alpha_px[x, y] = int(255 * ax * ay)

    sq_base.paste(sq_photo, (120, 0), sq_alpha)

    sq_scrim = Image.new("RGBA", (800, 800), (0, 0, 0, 0))
    sq_px = sq_scrim.load()
    for y in range(800):
        vy = max(0.0, (y - 380) / 300.0)
        vy = min(1.0, vy)
        for x in range(800):
            hx = max(0.0, 1.0 - (x / 340.0))
            alpha_f = min(1.0, (vy ** 1.15) * 0.97 + (hx ** 1.45) * 0.85 * (1.0 - vy * 0.6))
            sq_px[x, y] = (21, 16, 14, int(250 * alpha_f))

    sq_canvas = Image.alpha_composite(sq_base, sq_scrim).convert("RGB")
    sq_draw = ImageDraw.Draw(sq_canvas)

    sq_serif_title = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Roman.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        58,
    )
    sq_serif_brand = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Roman.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-regular.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        40,
    )
    sq_serif_italic = _load_font(
        [
            "/usr/share/fonts/opentype/urw-base35/P052-Italic.otf",
            "/usr/share/fonts/truetype/gfonts/alegreya/alegreya-v13-latin-italic.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        ],
        28,
    )

    sq_draw.text((64, 58), "IRO", font=sq_serif_brand, fill=blush)
    sq_draw.rectangle([64, 114, 144, 116], fill=blush)

    sq_draw.text((64, 512), "Irondina Mascarenhas", font=sq_serif_title, fill=alabaster)
    sq_draw.text((66, 588), "BEAUTY ARTIST · GOIÂNIA–GO", font=sans_meta, fill=sand)
    sq_draw.rectangle([64, 630, 112, 632], fill=blush)
    sq_draw.text((64, 654), "Make embelezadora. Não transforma, realça.", font=sq_serif_italic, fill=blush)

    og_sq_webp = PUBLIC_DIR / "og-image-square.webp"
    og_sq_jpg = PUBLIC_DIR / "og-image-square.jpg"
    save_webp(sq_canvas, og_sq_webp, quality=88)
    sq_canvas.save(og_sq_jpg, "JPEG", quality=88, optimize=True)
    print(f"  [OK] og-image-square.jpg (800x800 1:1) -> {og_sq_jpg.stat().st_size / 1024:.1f} KB")


def main() -> None:
    images_only = "--images-only" in sys.argv
    print("=== Iniciando Pipeline de Mídias (lp-irondina) ===")
    tag_map = load_tag_map()

    # 1. Hero (LCP estático calibrado + responsivo mobile 750x938 para 412@1.75x & desktop 960x1200)
    print("\n1. Processando fotos da Hero (sec-01-hero)...")
    with Image.open(tag_map["IG-06"]) as img:
        save_webp(
            face_aware_crop(img, 960, 1200, "portrait"),
            OUT_MEDIA / "hero-ig-06.webp",
            quality=76,
        )
        save_webp(
            face_aware_crop(img, 750, 938, "hero_mobile"),
            OUT_MEDIA / "hero-ig-06-sm.webp",
            quality=73,
        )
    with Image.open(tag_map["IG-09"]) as img:
        save_webp(
            face_aware_crop(img, 720, 900, "portrait"),
            OUT_MEDIA / "hero-ig-09.webp",
            quality=78,
        )
    with Image.open(tag_map["IG-03"]) as img:
        save_webp(
            face_aware_crop(img, 960, 1200, "portrait"),
            OUT_MEDIA / "hero-stage-ig03.webp",
            quality=78,
        )
        save_webp(
            face_aware_crop(img, 750, 938, "hero_mobile"),
            OUT_MEDIA / "hero-stage-ig03-sm.webp",
            quality=73,
        )
    with Image.open(tag_map["IG-01"]) as img:
        save_webp(
            face_aware_crop(img, 960, 1200, "portrait"),
            OUT_MEDIA / "hero-stage-ig01.webp",
            quality=76,
        )
        save_webp(
            face_aware_crop(img, 750, 938, "hero_mobile"),
            OUT_MEDIA / "hero-stage-ig01-sm.webp",
            quality=73,
        )

    # 2. Galeria & Serviços (Lightbox 720x900 quality=78 + Card responsivo -sm.webp 400x500 / 420x560 quality=76)
    print("\n2. Processando fotos eleitas da Galeria e Serviços (720x900 + variantes -sm)...")
    gallery_specs = [
        # (Tag, output_name, width, height, sm_w, sm_h)
        ("IG-09", "ig-09.webp", 720, 900, 400, 500),
        ("IG-10", "ig-10.webp", 720, 900, 400, 500),
        ("IG-11", "ig-11.webp", 720, 900, 400, 500),
        ("IG-12", "ig-12.webp", 720, 900, 400, 500),
        ("IG-16", "ig-16.webp", 720, 900, 400, 500),
        ("IG-18", "ig-18.webp", 720, 900, 400, 500),
        ("IG-19", "ig-19.webp", 720, 900, 400, 500),
        ("IG-20", "ig-20.webp", 720, 900, 400, 500),
        ("IG-24", "ig-24.webp", 720, 900, 400, 500),
        ("IG-28", "ig-28.webp", 720, 900, 400, 500),
        ("IG-49", "ig-49.webp", 720, 900, 400, 500),
        ("IG-58", "ig-58.webp", 720, 900, 400, 500),
        ("IG-59", "ig-59.webp", 720, 900, 400, 500),
        ("IG-66", "ig-66.webp", 720, 900, 400, 500),
        # Ensaios
        ("IG-01", "ig-01.webp", 720, 900, 400, 500),
        ("IG-03", "ig-03.webp", 720, 900, 400, 500),
        ("IG-13", "ig-13.webp", 720, 900, 400, 500),
        ("IG-15", "ig-15.webp", 720, 900, 400, 500),
        ("IG-32", "ig-32.webp", 720, 900, 400, 500),
        ("IG-33", "ig-33.webp", 720, 900, 400, 500),
        ("IG-37", "ig-37.webp", 720, 900, 400, 500),
        ("IG-38", "ig-38.webp", 720, 900, 400, 500),
        ("IG-44", "ig-44.webp", 720, 900, 400, 500),
        # Noivas & Civil
        ("IG-30", "ig-30.webp", 720, 900, 400, 500),
        ("IG-31", "ig-31.webp", 720, 900, 400, 500),
        # Antes & Depois (Cards 3:4 420x560 em sm + 720x900 no lightbox)
        ("IG-04", "ig-04-antes.webp", 720, 900, 420, 560),
        ("IG-05", "ig-05-depois-olhos.webp", 720, 900, 420, 560),
        ("IG-06", "ig-06-depois.webp", 720, 900, 420, 560),
        # Sobre (Sec 04)
        ("IRO-04", "iro-04.webp", 750, 1000, 0, 0),
        ("IRO-06", "iro-06.webp", 720, 900, 0, 0),
        ("IRO-03", "iro-03.webp", 750, 1000, 0, 0),
        ("IRO-01", "iro-01.webp", 750, 1000, 0, 0),
        # Cursos (Sec 06)
        ("IG-41", "ig-41-curso.webp", 720, 900, 0, 0),
    ]

    for tag, out_name, w, h, sm_w, sm_h in gallery_specs:
        with Image.open(tag_map[tag]) as img:
            cropped = face_aware_crop(img, w, h, mode="portrait")
            save_webp(cropped, OUT_MEDIA / out_name, quality=78)
            if sm_w > 0 and sm_h > 0:
                sm_path = OUT_MEDIA / f"{Path(out_name).stem}-sm.webp"
                sm_cropped = face_aware_crop(img, sm_w, sm_h, mode="portrait")
                save_webp(sm_cropped, sm_path, quality=76)

    # 3. Mini-Avatares 128x128 (Sec 05)
    print("\n3. Processando 5 Mini-Avatares Reais (128x128 WebP)...")
    avatars = [
        ("IG-38", "avatar-sara-ig38.webp"),
        ("IG-01", "avatar-fernanda-ig01.webp"),
        ("IG-32", "avatar-poliana-ig32.webp"),
        ("IG-09", "avatar-julia-ig09.webp"),
        ("IG-31", "avatar-renata-ig31.webp"),
    ]
    for tag, out_name in avatars:
        with Image.open(tag_map[tag]) as img:
            av = face_aware_crop(img, 128, 128, mode="avatar")
            save_webp(av, OUT_MEDIA / out_name, quality=80)

    # 4. Imagens Provisórias na Proporção Ideal (para slots TROCAR)
    print("\n4. Processando imagens provisórias para slots com tag central TROCAR...")
    brain_dir = Path("/home/leossd/.gemini/antigravity/brain/54a14b99-d87a-4d39-86d0-6339493f12e2")
    create_styled_placeholder(
        brain_dir / "raw_placeholder_penteado_costas_1795255667779.jpg",
        tag_map["IG-59"],
        OUT_MEDIA / "placeholder-penteado-costas.webp",
        720,
        900,
        mode="portrait",
    )
    create_styled_placeholder(
        brain_dir / "raw_placeholder_penteado_costas_1795255667779.jpg",
        tag_map["IG-59"],
        OUT_MEDIA / "placeholder-penteado-costas-sm.webp",
        400,
        500,
        mode="portrait",
    )
    create_styled_placeholder(
        brain_dir / "raw_placeholder_noiva_cartorio_1795255682018.jpg",
        tag_map["IG-31"],
        OUT_MEDIA / "placeholder-noiva-cartorio.webp",
        720,
        900,
        mode="portrait",
    )
    create_styled_placeholder(
        brain_dir / "raw_placeholder_noiva_cartorio_1795255682018.jpg",
        tag_map["IG-31"],
        OUT_MEDIA / "placeholder-noiva-cartorio-sm.webp",
        400,
        500,
        mode="portrait",
    )
    create_styled_placeholder(
        brain_dir / "raw_placeholder_curso_automaquiagem_1795255737543.jpg",
        tag_map["IRO-04"],
        OUT_MEDIA / "placeholder-curso-automaquiagem.webp",
        720,
        900,
        mode="portrait",
    )
    create_styled_placeholder(
        brain_dir / "raw_placeholder_avatar_fabiane_1795255703123.jpg",
        tag_map["IG-11"],
        OUT_MEDIA / "placeholder-avatar-fabiane.webp",
        128,
        128,
        mode="avatar",
    )

    # 5. Posters Reduzidos + Vídeos Editoriais Mudos (pula re-encode se --images-only)
    print("\n5. Processando Posters otimizados e Vídeos Editoriais Mudas...")
    build_video_mvp(images_only=images_only)
    build_video_about_broll(images_only=images_only)

    # 6. Open Graph 1200x630 & 800x800
    print("\n6. Gerando Open Graph Image (1200x630 + 800x800)...")
    build_og_image(tag_map)

    print("\n=== Pipeline de Mídias Concluído com Sucesso! ===")


if __name__ == "__main__":
    main()
