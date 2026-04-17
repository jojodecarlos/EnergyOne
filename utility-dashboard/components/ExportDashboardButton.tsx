"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function ExportDashboardButton() {
  const handleExportPDF = async () => {
    try {
      const element = document.getElementById("dashboard-export-content");
      if (!element) return;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#f9fafb",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = pageWidth;
        const imgHeight = (img.height * imgWidth) / img.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("dashboard-report.pdf");
      };
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      className="mt-4 w-full rounded-full bg-blue-800 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-900"
    >
      Export Dashboard PDF
    </button>
  );
}