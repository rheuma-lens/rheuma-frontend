export interface ImageDimensions {
  width: number;
  height: number;
}

/** Stub: load image dimensions from a File object */
export const getImageDimensions = (file: File): Promise<ImageDimensions | null> => {
  return new Promise((resolve) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      resolve({ width: image.width, height: image.height });
      URL.revokeObjectURL(objectUrl);
    };
    image.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(objectUrl);
    };
    image.src = objectUrl;
  });
};

/** Stub: validate image file type */
export const isValidImageType = (mimeType: string): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return validTypes.includes(mimeType);
};

/** Stub: generate thumbnail from image file */
export const generateThumbnail = (
  file: File,
  maxSize = 160,
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));

      const context = canvas.getContext("2d");
      if (!context) {
        resolve(null);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        resolve(blob);
        URL.revokeObjectURL(objectUrl);
      }, file.type || "image/png");
    };

    image.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  });
};

/** Stub: convert image to base64 */
export const imageToBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
    reader.onerror = () => reject(null);
    reader.readAsDataURL(file);
  });
};
