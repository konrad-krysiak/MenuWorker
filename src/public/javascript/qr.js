import { downloadURI } from "../../helpers/downloadURI.js";

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("qrcode-download-btn")
    .addEventListener("click", function () {
      const qrCodeImageSource = document.querySelector("#qrcodeImage").src;
      downloadURI(qrCodeImageSource, "qrcode.png");
    });
});
