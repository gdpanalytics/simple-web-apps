window.onload = function () {
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200,
  });

  document.getElementById("generate-btn").onclick = function () {
    var text = document.getElementById("text-input").value;
    if (!text) {
      alert("Insert text to generate qr code!");
      return;
    }
    qrcode.makeCode(text);
  };

  document.getElementById("download-btn").onclick = function () {
    var img = document.getElementById("qrcode").querySelector("img");
    var canvas = document.getElementById("qrcode").querySelector("canvas");
    var link = document.createElement("a");
    if (canvas) {
      link.href = canvas.toDataURL("image/png");
    } else if (img) {
      link.href = img.src;
    }
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
};
