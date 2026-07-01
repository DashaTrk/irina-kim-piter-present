import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// A4 portrait at 96dpi ratio, we use mm units in jsPDF (210x297mm)
export async function generateLandingPdf(root: HTMLElement, filename = "Irina-Kim.pdf") {
  const pages = Array.from(root.querySelectorAll<HTMLElement>("[data-pdf-page]"));
  if (pages.length === 0) throw new Error("PDF pages not found");

  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const el = pages[i];
    const canvas = await html2canvas(el, {
      backgroundColor: el.dataset.pdfBg || "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight,
    });
    const img = canvas.toDataURL("image/jpeg", 0.95);
    if (i > 0) pdf.addPage();
    // Fit width, keep aspect ratio; center vertically if shorter.
    const imgH = (canvas.height * pageWidth) / canvas.width;
    const y = imgH < pageHeight ? (pageHeight - imgH) / 2 : 0;
    pdf.addImage(img, "JPEG", 0, y, pageWidth, Math.min(imgH, pageHeight));
  }

  pdf.save(filename);
}