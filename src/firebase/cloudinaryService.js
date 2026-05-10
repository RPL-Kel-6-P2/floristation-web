const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload file gambar ke Cloudinary
 * @param {File} file 
 * @param {Function} onProgress 
 * @returns {Promise<{url: string, public_id: string}>}
 */
export async function uploadToCloudinary(file, onProgress) {

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format foto harus JPG, PNG, atau WEBP");
  }

 
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Ukuran foto maksimal 5MB");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "products");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          url: data.secure_url,
          public_id: data.public_id,
        });
      } else {
        reject(new Error("Upload gagal, coba lagi"));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Koneksi bermasalah saat upload"));
    });

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    );
    xhr.send(formData);
  });
}


export function getCloudinaryThumb(url, width = 400) {
  if (!url) return "";
  
  return url.replace("/upload/", `/upload/w_${width},c_fill,q_auto,f_auto/`);
}
