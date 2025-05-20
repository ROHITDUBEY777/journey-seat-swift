
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generateTicket = async (ticketRef: React.RefObject<HTMLDivElement>): Promise<void> => {
  if (!ticketRef.current) return;
  
  const canvas = await html2canvas(ticketRef.current, {
    scale: 2,
    useCORS: true,
    logging: false,
  });
  
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [210, 297], // A4 size
  });
  
  // Calculate dimensions to fit the ticket properly
  const imgWidth = 190;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  pdf.save("e-ticket.pdf");
};
