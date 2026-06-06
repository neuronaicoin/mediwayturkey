// ───────────────────────────────────────────────────────────
// FOTOĞRAF SIKIŞTIRMA — tarayıcıda, harici kütüphane yok
// 3-5 MB foto → ~200-400 KB. Maks 1600px genişlik, JPEG kalite 0.8.
// Hem depolama alanını korur hem sayfa hızını (SEO) artırır.
// ───────────────────────────────────────────────────────────

export async function compressImage(
  file: File,
  maxWidth = 1600,
  quality = 0.8
): Promise<File> {
  // Sadece görsel dosyaları işle
  if (!file.type.startsWith("image/")) return file;

  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);

  // Hedef boyutu hesapla (en-boy oranını koru)
  let { width, height } = img;
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file; // canvas desteklenmiyorsa orijinali kullan
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, quality);
  if (!blob) return file;

  // Yeni dosya adı (.jpg)
  const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], newName, { type: "image/jpeg" });
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
  });
}
