import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

/**
 * Render the landing page (mobile layout) into an A4 PDF, so the exported
 * file matches the on-screen mobile visual exactly. The element is captured
 * at a fixed mobile width, then the tall canvas is sliced into A4-portrait
 * pages.
 */
export async function generateLandingPdf(el: HTMLElement, filename = "Irina-Kim.pdf") {
  const MOBILE_WIDTH = 430; // fixed capture width — mobile layout

  // Force mobile layout during capture by clamping width.
  const prev = {
    width: el.style.width,
    maxWidth: el.style.maxWidth,
    margin: el.style.margin,
  };
  el.style.width = `${MOBILE_WIDTH}px`;
  el.style.maxWidth = `${MOBILE_WIDTH}px`;
  el.style.margin = "0 auto";

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(el, {
      backgroundColor: "#0a0a0a",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: MOBILE_WIDTH,
      width: MOBILE_WIDTH,
    });
  } finally {
    el.style.width = prev.width;
    el.style.maxWidth = prev.maxWidth;
    el.style.margin = prev.margin;
  }

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  // Page slice height in canvas pixels, matching A4 aspect ratio.
  const sliceHeightPx = Math.floor((canvas.width * pageH) / pageW);
  const totalPages = Math.ceil(canvas.height / sliceHeightPx);

  for (let i = 0; i < totalPages; i++) {
    const sy = i * sliceHeightPx;
    const sh = Math.min(sliceHeightPx, canvas.height - sy);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = sh;
    const ctx = pageCanvas.getContext("2d")!;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

    const img = pageCanvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) pdf.addPage();
    const imgH = (sh * pageW) / canvas.width;
    pdf.addImage(img, "JPEG", 0, 0, pageW, imgH);
  }

  pdf.save(filename);
}