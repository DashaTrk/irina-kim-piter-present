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

  // Hide elements marked as PDF-invisible (e.g. the download button itself).
  const hidden = Array.from(el.querySelectorAll<HTMLElement>("[data-pdf-hide]"));
  const prevVis = hidden.map((h) => h.style.visibility);
  hidden.forEach((h) => (h.style.visibility = "hidden"));

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
    hidden.forEach((h, i) => (h.style.visibility = prevVis[i]));
  }

  // Single tall page — mirrors the mobile canvas as one continuous sheet.
  const pageW = 210; // mm, mobile width equivalent
  const pageH = (canvas.height * pageW) / canvas.width;
  const pdf = new jsPDF({ unit: "mm", format: [pageW, pageH], orientation: "portrait" });
  const img = canvas.toDataURL("image/jpeg", 0.9);
  pdf.addImage(img, "JPEG", 0, 0, pageW, pageH);
  pdf.save(filename);
}