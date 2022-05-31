export const downloadBlob = (blob: Blob, filename: string) => {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
};

export const downloadSVG = (svgElem: HTMLDivElement | null) => {
  const first = svgElem as unknown as HTMLElement;
  const content = first.children[0].innerHTML;
  const contentWithSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="200" width="200" viewBox="0 0 29 29">${content}</svg>`;
  const blob = new Blob([contentWithSvg], { type: "image/svg+xml" });
  downloadBlob(blob, "qrcode.svg");
};

export const downloadCanvas = (elem: HTMLDivElement | null) => {
  const first = elem as unknown as HTMLElement;
  const content = (first.children[0] as HTMLCanvasElement).toDataURL();
  const blob = dataURIToBlob(content);
  downloadBlob(blob, "qrcode.png");
};

const dataURIToBlob = (dataURI: string) => {
  const binStr = atob(dataURI.split(",")[1]);
  const arr = new Uint8Array(binStr.length);
  for (var i = 0; i < binStr.length; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr]);
};
