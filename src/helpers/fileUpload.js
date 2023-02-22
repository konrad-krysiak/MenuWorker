// import gc from "../config/gc";
// import { Readable } from "stream";
// const bucket = gc.bucket("bucket-quickstart-konrad"); // should be your bucket name

// /**
//  *
//  * @param { File } object file object that will be uploaded
//  * @description - This function does the following
//  * - It uploads a file to the image bucket on Google Cloud
//  * - It accepts an object as an argument with the
//  *   "originalname" and "buffer" as keys
//  */

// export const uploadImage = (file) =>
//   new Promise((resolve, reject) => {
//     const { originalname, buffer } = file;

//     const blob = bucket.file(originalname.replace(/ /g, "_"));
//     blob
//       .createWriteStream({
//         resumable: false,
//       })
//       .on("finish", () => {
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         resolve(publicUrl);
//       })
//       .on("error", (e) => {
//         console.log(e);
//         reject(`Unable to upload image, something went wrong`);
//       })
//       .end(buffer);
//   });

// export const uploadPdf = (pdfBuffer, pdfName) =>
//   new Promise((resolve, reject) => {
//     const blob = bucket.file(pdfName);
//     blob
//       .createWriteStream({
//         resumable: false,
//       })
//       .on("finish", () => {
//         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//         resolve(publicUrl);
//       })
//       .on("error", (e) => {
//         console.log(e);
//         reject(`Unable to upload file, something went wrong`);
//       })
//       .end(pdfBuffer);
//   });
