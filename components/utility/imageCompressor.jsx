// export const compressImage = (
//   file,
//   maxSizeKB = 500,
//   minSizeKB = 300,
//   maxDim = 800
// ) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target.result;

//       img.onload = () => {
//         const canvas = document.createElement("canvas");

//         let width = img.width;
//         let height = img.height;

//         // Resize while maintaining aspect ratio
//         if (width > maxDim || height > maxDim) {
//           if (width > height) {
//             height = (height * maxDim) / width;
//             width = maxDim;
//           } else {
//             width = (width * maxDim) / height;
//             height = maxDim;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, width, height);

//         let quality = 0.9;
//         let dataUrl = canvas.toDataURL("image/jpeg", quality);

//         while (dataUrl.length / 1024 > maxSizeKB && quality > 0.1) {
//           quality -= 0.05;
//           dataUrl = canvas.toDataURL("image/jpeg", quality);
//         }

//         const sizeKB = Math.round((dataUrl.length * 3) / 4 / 1024);

//         if (sizeKB < minSizeKB) {
//           reject("Compressed image is smaller than 300 KB.");
//         } else {
//           resolve(dataUrl);
//         }
//       };
//     };

//     reader.onerror = () => reject("Failed to read image file.");
//     reader.readAsDataURL(file);
//   });
export const compressImage = (file, maxSizeKB = 500, maxDim = 800) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        // Resize while maintaining aspect ratio
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height * maxDim) / width;
            width = maxDim;
          } else {
            width = (width * maxDim) / height;
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.9;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        while (dataUrl.length / 1024 > maxSizeKB && quality > 0.1) {
          quality -= 0.05;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(dataUrl);
      };
    };

    reader.onerror = () => reject("Failed to read image file.");
    reader.readAsDataURL(file);
  });
