export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Comprime y redimensiona una imagen en el cliente.
 * @param file Archivo o Blob de imagen original
 * @param maxWidth Ancho máximo permitido (ej. 500px)
 * @param quality Calidad JPEG (0 a 1)
 */
export const compressImage = (
  file: File | Blob, 
  maxWidth: number = 800, 
  quality: number = 0.7
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    
    image.onload = () => {
      const canvas = document.createElement("canvas");
      
      let width = image.width;
      let height = image.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo obtener el contexto del canvas"));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Error al comprimir la imagen"));
          }
          URL.revokeObjectURL(image.src); 
        },
        "image/jpeg",
        quality
      );
    };

    image.onerror = (error) => reject(error);
  });
};