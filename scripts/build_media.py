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
from pathlib import Path
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

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


def build_video_mvp() -> None:
    """
    Recorta e converte o vídeo MVP mudo (< 1.5 MB) em WebM + MP4 + poster.webp
    a partir de irondina_ero_3806533097748503741_2026-01-09.mp4.
    """
    src_video = (
        INSUMOS_DIR
        / "videos-reels"
        / "irondina_ero_3806533097748503741_2026-01-09.mp4"
    )
    if not src_video.exists():
        raise FileNotFoundError(f"Vídeo fonte não encontrado: {src_video}")

    webm_out = OUT_MEDIA / "video-mvp-galeria.webm"
    mp4_out = OUT_MEDIA / "video-mvp-galeria.mp4"
    poster_png = OUT_MEDIA / "_tmp_poster.png"
    poster_webp = OUT_MEDIA / "video-mvp-poster.webp"

    # Vídeo original é 720x1280 (9:16). Recortamos para 4:5 (720x900 -> 560x700 par) mantendo topo/rosto
    vf_filter = "crop=720:900:0:90,scale=560:700:flags=lanczos,fps=24"

    # 1. Poster frame em t=3.2s
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            "00:00:03.2",
            "-i",
            str(src_video),
            "-vf",
            "crop=720:900:0:90,scale=720:900:flags=lanczos",
            "-frames:v",
            "1",
            str(poster_png),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    with Image.open(poster_png) as p_img:
        save_webp(p_img, poster_webp, quality=84)
    if poster_png.exists():
        subprocess.run(["gio", "trash", str(poster_png)], check=False)

    # 2. WebM (VP9 mudo < 1.5 MB)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            "00:00:01.5",
            "-t",
            "00:00:06.5",
            "-i",
            str(src_video),
            "-an",
            "-vf",
            vf_filter,
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "0",
            "-crf",
            "34",
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

    # 3. MP4 (H.264 mudo < 1.5 MB)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            "00:00:01.5",
            "-t",
            "00:00:06.5",
            "-i",
            str(src_video),
            "-an",
            "-vf",
            vf_filter,
            "-c:v",
            "libx264",
            "-crf",
            "26",
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

    print(
        f"  [OK] video-mvp-galeria.webm -> {webm_out.stat().st_size / 1024:.1f} KB"
    )
    print(
        f"  [OK] video-mvp-galeria.mp4  -> {mp4_out.stat().st_size / 1024:.1f} KB"
    )


def build_og_image(tag_map: dict[str, Path]) -> None:
    """Gera imagem Open Graph 1200x630 editorial em public/og-image.webp e public/og-image.jpg."""
    canvas = Image.new("RGB", (1200, 630), (250, 248, 245))  # #FAF8F5
    draw = ImageDraw.Draw(canvas)

    # Faixa lateral esquerda editorial #F3F0EB
    draw.rectangle([0, 0, 520, 630], fill=(243, 240, 235))
    # Linha divisória Blush/Areia
    draw.rectangle([518, 0, 522, 630], fill=(223, 161, 148))

    # Duas fotos reais à direita: IG-06 (pele clean) e IRO-04 (Irondina)
    with Image.open(tag_map["IG-06"]) as img1:
        p1 = face_aware_crop(img1, 340, 630, mode="portrait")
        canvas.paste(p1, (522, 0))

    with Image.open(tag_map["IRO-04"]) as img2:
        p2 = face_aware_crop(img2, 338, 630, mode="portrait")
        canvas.paste(p2, (862, 0))

    # Moldura tipográfica minimalista na coluna esquerda
    draw.rectangle([48, 52, 138, 54], fill=(109, 63, 40))  # #6D3F28

    og_webp = PUBLIC_DIR / "og-image.webp"
    og_jpg = PUBLIC_DIR / "og-image.jpg"
    save_webp(canvas, og_webp, quality=86)
    canvas.save(og_jpg, "JPEG", quality=86, optimize=True)
    print(f"  [OK] og-image.jpg (1200x630) -> {og_jpg.stat().st_size / 1024:.1f} KB")


def main() -> None:
    print("=== Iniciando Pipeline de Mídias (lp-irondina) ===")
    tag_map = load_tag_map()

    # 1. Hero (LCP estático real + responsividade + palco cinematográfico full-bleed)
    print("\n1. Processando fotos da Hero (sec-01-hero)...")
    with Image.open(tag_map["IG-06"]) as img:
        save_webp(
            face_aware_crop(img, 960, 1200, "portrait"),
            OUT_MEDIA / "hero-ig-06.webp",
            quality=85,
        )
        save_webp(
            face_aware_crop(img, 720, 900, "hero_mobile"),
            OUT_MEDIA / "hero-ig-06-sm.webp",
            quality=83,
        )
    with Image.open(tag_map["IG-09"]) as img:
        save_webp(
            face_aware_crop(img, 720, 900, "portrait"),
            OUT_MEDIA / "hero-ig-09.webp",
            quality=84,
        )
    with Image.open(tag_map["IG-03"]) as img:
        save_webp(
            face_aware_crop(img, 1200, 1500, "portrait"),
            OUT_MEDIA / "hero-stage-ig03.webp",
            quality=86,
        )
        save_webp(
            face_aware_crop(img, 720, 900, "hero_mobile"),
            OUT_MEDIA / "hero-stage-ig03-sm.webp",
            quality=83,
        )
    with Image.open(tag_map["IG-01"]) as img:
        save_webp(
            face_aware_crop(img, 1200, 1500, "portrait"),
            OUT_MEDIA / "hero-stage-ig01.webp",
            quality=85,
        )
        save_webp(
            face_aware_crop(img, 720, 900, "hero_mobile"),
            OUT_MEDIA / "hero-stage-ig01-sm.webp",
            quality=83,
        )

    # 2. Galeria & Serviços (Proporções 4:5, 3:4, 1:1)
    print("\n2. Processando fotos eleitas da Galeria e Serviços...")
    gallery_specs = [
        # (Tag, output_name, width, height)
        ("IG-09", "ig-09.webp", 720, 900),    # 4:5 Social Make + Penteado
        ("IG-10", "ig-10.webp", 720, 900),    # 4:5 Social Nanda Soares
        ("IG-11", "ig-11.webp", 720, 900),    # 4:5 Social Resultado sorrindo
        ("IG-12", "ig-12.webp", 720, 900),    # 4:5 Social Rafaella Lopes
        ("IG-16", "ig-16.webp", 720, 720),    # 1:1 Close delineado
        ("IG-18", "ig-18.webp", 720, 900),    # 4:5 Social pêssego/champagne
        ("IG-19", "ig-19.webp", 720, 900),    # 4:5 Social sardas naturais
        ("IG-20", "ig-20.webp", 720, 900),    # 4:5 Social pele negra + cachos
        ("IG-24", "ig-24.webp", 720, 900),    # 4:5 Social olhos verdes
        ("IG-28", "ig-28.webp", 720, 900),    # 4:5 Social ondas longas
        ("IG-49", "ig-49.webp", 720, 900),    # 4:5 Social rabo meio alto
        ("IG-58", "ig-58.webp", 720, 900),    # 4:5 Social clássica
        ("IG-59", "ig-59.webp", 720, 900),    # 4:5 Penteado preso coque
        ("IG-66", "ig-66.webp", 720, 900),    # 4:5 Penteado rabo alto
        # Ensaios
        ("IG-01", "ig-01.webp", 750, 1000),   # 3:4 Fernanda Rodrigues coque alto
        ("IG-03", "ig-03.webp", 750, 1000),   # 3:4 Fernanda Rodrigues cachos 3D
        ("IG-13", "ig-13.webp", 720, 900),    # 4:5 Lourrainy corporativo
        ("IG-15", "ig-15.webp", 720, 900),    # 4:5 Lourrainy cubo
        ("IG-32", "ig-32.webp", 720, 900),    # 4:5 Poliana Souza
        ("IG-33", "ig-33.webp", 720, 900),    # 4:5 Poliana Souza skincare
        ("IG-37", "ig-37.webp", 720, 900),    # 4:5 Lash designer bege
        ("IG-38", "ig-38.webp", 720, 720),    # 1:1 Sara Lidia
        ("IG-44", "ig-44.webp", 720, 900),    # 4:5 Blazer bege
        # Noivas & Civil
        ("IG-30", "ig-30.webp", 720, 900),    # 4:5 Renata Felipe close make/trança
        ("IG-31", "ig-31.webp", 720, 900),    # 4:5 Renata Felipe sorrindo
        # Antes & Depois
        ("IG-04", "ig-04-antes.webp", 750, 1000),        # 3:4 Berta Leite Antes
        ("IG-05", "ig-05-depois-olhos.webp", 750, 1000), # 3:4 Berta Leite Depois olhos fechados + painel
        ("IG-06", "ig-06-depois.webp", 750, 1000),       # 3:4 Berta Leite Depois olhos abertos
        # Sobre (Sec 04)
        ("IRO-04", "iro-04.webp", 750, 1000),            # 3:4 Irondina blazer bege (reserva)
        ("IRO-06", "iro-06.webp", 750, 1000),            # 3:4 Irondina estúdio confiante
        ("IRO-03", "iro-03.webp", 750, 1000),            # 3:4 Irondina golden hour
        ("IRO-01", "iro-01.webp", 750, 1000),            # 3:4 Irondina golden hour 1
        # Cursos (Sec 06)
        ("IG-41", "ig-41-curso.webp", 720, 900),         # 4:5 Curso Profissional Iniciante
    ]

    for tag, out_name, w, h in gallery_specs:
        with Image.open(tag_map[tag]) as img:
            cropped = face_aware_crop(img, w, h, mode="portrait")
            save_webp(cropped, OUT_MEDIA / out_name, quality=83)

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
            save_webp(av, OUT_MEDIA / out_name, quality=85)

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
        brain_dir / "raw_placeholder_noiva_cartorio_1795255682018.jpg",
        tag_map["IG-31"],
        OUT_MEDIA / "placeholder-noiva-cartorio.webp",
        720,
        900,
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

    # 5. Vídeo MVP Mudo (< 1.5 MB)
    print("\n5. Gerando Vídeo MVP Mudo (WebM + MP4 + poster.webp)...")
    build_video_mvp()

    # 6. Open Graph 1200x630
    print("\n6. Gerando Open Graph Image (1200x630)...")
    build_og_image(tag_map)

    print("\n=== Pipeline de Mídias Concluído com Sucesso! ===")


if __name__ == "__main__":
    main()
