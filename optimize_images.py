from __future__ import annotations

import json
import re
import shutil
from datetime import datetime
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
ASSETS_DIR = ROOT / "src" / "assets"
SRC_DIR = ROOT / "src"
REPORT_PATH = ROOT / "image_optimization_report.json"
BACKUP_ROOT = ROOT / f"_image_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

SOURCE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".gif"}
IMAGE_EXTENSIONS = SOURCE_EXTENSIONS | {".webp"}
WEBP_QUALITY = 82
WEBP_METHOD = 4


def slugify_filename(path: Path) -> str:
    stem = re.sub(r"[^a-zA-Z0-9]+", "-", path.stem.lower()).strip("-")
    return f"{stem}.webp"


def backup_file(path: Path) -> None:
    relative = path.relative_to(ROOT)
    destination = BACKUP_ROOT / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(path, destination)


def save_as_webp(source: Path, destination: Path) -> int:
    with Image.open(source) as image:
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)
    return destination.stat().st_size


def convert_source_images() -> tuple[dict[str, str], list[dict[str, object]]]:
    path_map: dict[str, str] = {}
    converted: list[dict[str, object]] = []

    for source in sorted(ASSETS_DIR.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in SOURCE_EXTENSIONS:
            continue

        webp_name = slugify_filename(source)
        destination = source.with_name(webp_name)
        original_size = source.stat().st_size

        backup_file(source)
        new_size = save_as_webp(source, destination)
        source.unlink()

        path_map[source.name] = destination.name
        path_map[source.as_posix()] = destination.as_posix()
        converted.append(
            {
                "source": str(source.relative_to(ROOT)),
                "destination": str(destination.relative_to(ROOT)),
                "original_bytes": original_size,
                "webp_bytes": new_size,
            }
        )

    return path_map, converted


def optimize_existing_webp() -> list[dict[str, object]]:
    optimized: list[dict[str, object]] = []

    for temporary in ASSETS_DIR.rglob("*.tmp.webp"):
        temporary.unlink(missing_ok=True)

    for image_path in sorted(ASSETS_DIR.rglob("*.webp")):
        if image_path.name.endswith(".tmp.webp"):
            continue

        original_size = image_path.stat().st_size
        backup_file(image_path)
        temporary = image_path.with_suffix(".tmp.webp")

        try:
            new_size = save_as_webp(image_path, temporary)
            if new_size <= original_size:
                temporary.replace(image_path)
                optimized.append(
                    {
                        "path": str(image_path.relative_to(ROOT)),
                        "before_bytes": original_size,
                        "after_bytes": new_size,
                        "saved_bytes": original_size - new_size,
                    }
                )
            else:
                temporary.unlink(missing_ok=True)
        except Exception as exc:
            temporary.unlink(missing_ok=True)
            optimized.append(
                {
                    "path": str(image_path.relative_to(ROOT)),
                    "error": str(exc),
                }
            )

    return optimized


def update_image_references(path_map: dict[str, str]) -> list[str]:
    changed_files: list[str] = []
    if not path_map:
        return changed_files

    for source_file in sorted(SRC_DIR.rglob("*")):
        if source_file.suffix.lower() not in {".js", ".jsx", ".ts", ".tsx", ".css"}:
            continue

        text = source_file.read_text(encoding="utf-8")
        updated = text
        for old, new in sorted(path_map.items(), key=lambda item: len(item[0]), reverse=True):
            updated = updated.replace(old, new)

        if updated != text:
            source_file.write_text(updated, encoding="utf-8", newline="")
            changed_files.append(str(source_file.relative_to(ROOT)))

    return changed_files


def readable_alt_from_source(source_value: str) -> str:
    cleaned = re.sub(r"[{}$`'\"./_-]+", " ", source_value)
    cleaned = re.sub(r"\b(images|image|src|icon|icons|index|item|card|logo|pillar)\b", " ", cleaned, flags=re.I)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    if not cleaned:
        return "Raj Mali website image"
    return f"{cleaned[:80].strip().title()} image"


def ensure_img_attributes() -> list[str]:
    changed_files: list[str] = []
    img_pattern = re.compile(r"<img\b(?P<attrs>[^>]*?)(?P<closing>/?)>", re.DOTALL)
    src_pattern = re.compile(r"\bsrc=(?P<quote>[\"'])(?P<src>.*?)(?P=quote)|\bsrc=\{(?P<src_expr>[^}]+)\}", re.DOTALL)
    alt_pattern = re.compile(r"\balt=(?P<quote>[\"'])(?P<alt>.*?)(?P=quote)|\balt=\{(?P<alt_expr>[^}]+)\}", re.DOTALL)

    explicit_alt_replacements = {
        'src={pillar.icon} alt="Raj Mali website image"': 'src={pillar.icon} alt={`${pillar.title} coaching pillar icon`}',
        'src={icon} alt="Raj Mali website image"': 'src={icon} alt={`${title} organic play practice icon`}',
        'src={image} alt="Raj Mali website image"': 'src={image} alt={`${title} experiential leadership activity`}',
        'src={images.cta} alt="Cta image"': 'src={images.cta} alt="Organic play leadership session"',
        "alt=\"\"": 'alt="Raj Mali website image"',
        "alt=''": "alt='Raj Mali website image'",
    }

    for source_file in sorted(SRC_DIR.rglob("*")):
        if source_file.suffix.lower() not in {".jsx", ".tsx"}:
            continue

        text = source_file.read_text(encoding="utf-8")

        def replace_img(match: re.Match[str]) -> str:
            tag = match.group(0)
            updated = tag

            if not re.search(r"\bloading=", updated):
                updated = updated.replace("<img", '<img loading="lazy"', 1)

            if not re.search(r"\bdecoding=", updated):
                updated = updated.replace("<img", '<img decoding="async"', 1)

            alt_match = alt_pattern.search(updated)
            if alt_match:
                alt_value = alt_match.group("alt")
                if alt_value is not None and alt_value.strip() == "":
                    src_match = src_pattern.search(updated)
                    source_value = ""
                    if src_match:
                        source_value = src_match.group("src") or src_match.group("src_expr") or ""
                    generated_alt = readable_alt_from_source(source_value)
                    updated = updated[: alt_match.start()] + f'alt="{generated_alt}"' + updated[alt_match.end() :]
            else:
                src_match = src_pattern.search(updated)
                source_value = ""
                if src_match:
                    source_value = src_match.group("src") or src_match.group("src_expr") or ""
                generated_alt = readable_alt_from_source(source_value)
                insert_at = updated.rfind("/>") if updated.rstrip().endswith("/>") else updated.rfind(">")
                updated = f'{updated[:insert_at]} alt="{generated_alt}"{updated[insert_at:]}'

            for old, new in explicit_alt_replacements.items():
                updated = updated.replace(old, new)

            return updated

        updated_text = img_pattern.sub(replace_img, text)

        if updated_text != text:
            source_file.write_text(updated_text, encoding="utf-8", newline="")
            changed_files.append(str(source_file.relative_to(ROOT)))

    return changed_files


def main() -> None:
    if not ASSETS_DIR.exists():
        raise SystemExit(f"Assets directory not found: {ASSETS_DIR}")

    path_map, converted = convert_source_images()
    optimized = optimize_existing_webp()
    reference_files = update_image_references(path_map)
    jsx_files = ensure_img_attributes()

    report = {
        "webp_quality": WEBP_QUALITY,
        "webp_method": WEBP_METHOD,
        "backup_dir": str(BACKUP_ROOT.relative_to(ROOT)) if BACKUP_ROOT.exists() else None,
        "converted_count": len(converted),
        "optimized_count": len([item for item in optimized if "error" not in item]),
        "optimized_saved_bytes": sum(int(item.get("saved_bytes", 0)) for item in optimized),
        "reference_files_changed": reference_files,
        "jsx_files_changed": jsx_files,
        "converted": converted,
        "optimized": optimized,
    }

    REPORT_PATH.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps({key: report[key] for key in report if key not in {"converted", "optimized"}}, indent=2))


if __name__ == "__main__":
    main()
