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

export const downloadSVG = (
  svgElem: HTMLDivElement | null,
  isLarge: boolean
) => {
  const first = svgElem as unknown as HTMLElement;
  const content = first.children[0].innerHTML;
  const size = isLarge ? 1000 : 200;
  const viewBox = (first.children[0] as SVGMarkerElement).viewBox.baseVal;
  const viewBoxString = viewBox
    ? `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    : "0 0 29 29";
  const contentWithSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="${size}" width="${size}" viewBox="${viewBoxString}">${content}</svg>`;
  const blob = new Blob([contentWithSvg], { type: "image/svg+xml" });
  downloadBlob(blob, "qrcode.svg");
};

export const downloadCanvas = (
  elem: HTMLDivElement | null,
  isLarge: boolean
) => {
  const first = elem as unknown as HTMLElement;
  const child = isLarge ? 2 : 0;
  const content = (first.children[child] as HTMLCanvasElement).toDataURL();
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
