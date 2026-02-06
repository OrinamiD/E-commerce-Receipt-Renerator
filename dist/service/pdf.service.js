import pdfDocument from "pdfkit";
import fs from "fs";
import path from "path";
// const receiptsDir = path.join(process.cwd(), "receipts");
export const generateReceiptPDF = async (data) => {
    return new Promise((resolve, reject) => {
        const receiptsDir = path.join(process.cwd(), "receipts");
        if (!fs.existsSync(receiptsDir)) {
            fs.mkdirSync(receiptsDir, { recursive: true });
        }
        const fileName = `receipt-${data.receiptId}.pdf`;
        const filePath = path.join(receiptsDir, fileName);
        const document = new pdfDocument({ margin: 40 });
        const stream = fs.createWriteStream(filePath);
        document.pipe(stream);
        document
            .fontSize(20)
            .text("E-Commerce Payment Reciept", { align: "center" });
        document.moveDown();
        // header
        document
            .fontSize(10)
            .text("Business Name: DevCornelius")
            .text("Email: dongoorinami@gmail.com")
            .text("phone: 08139566000");
        document.moveDown();
        document.text(`Reciept ID: ${data.receiptId}`);
        document.text(`Order ID: ${data.orderId}`);
        document.text(`Date: ${new Date(Date().toLocaleString())}`);
        document.moveDown();
        // customer
        document.fontSize(12).text("customer Information", { underline: true });
        document
            .fontSize(10)
            .text(`Name: ${data.customerName}`)
            .text(`Email: ${data.customerEmail}`);
        document.moveDown();
        // table
        document.fontSize(10).text("Items", 40, document.y, { continued: true });
        document.text("Quantity", 250, document.y, { continued: true });
        document.text("Price", 300, document.y, { continued: true });
        document.text("Total", 370, document.y);
        document.moveDown();
        data.items.forEach((item) => {
            document.text(item.name, 40, document.y, { continued: true });
            document.text(item.quantity.toString(), 250, document.y, {
                continued: true,
            });
            document.text(`N${item.unitPrice}`, 300, document.y);
        });
        document.moveDown();
        // summary
        document.text(`Subtotal: ${data.subtotal}`, { align: "right" });
        document.text(`Tax: ${data.tax}`, { align: "right" });
        document
            .font("Helvetica-Bold")
            .text(`Total amount paid: ${data.total}`, { align: "right" });
        document.moveDown();
        document.fontSize(10).text(`Payment Method: ${data.paymentMethod}`);
        document.moveDown();
        document.fontSize(10).text(`Store Details: ${data.storeDetails}`);
        document.moveDown(2);
        document
            .font("Helvetica")
            .text("Thank you for your purchase!", { align: "right" })
            .text("This reciept serves as proof of payment.", { align: "center" });
        document.end();
        stream.on("finish", () => resolve(filePath));
        stream.on("error", reject);
    });
};
//# sourceMappingURL=pdf.service.js.map