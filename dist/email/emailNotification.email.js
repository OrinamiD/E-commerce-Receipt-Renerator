import nodemailer from "nodemailer";
export const sendReceiptEmail = async (customerName, email, pdfPath) => {
    const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });
    const emailDetails = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Your Receipt",
        html: `
      <h2>Thank You for Your Purchase, ${customerName}! 🎉</h2>

      <p>
        We sincerely appreciate your patronage and are happy to have served you.
        Your order has been successfully completed.
      </p>

      <p>
        Please find your attached PDF receipt, which contains your full order
        details and serves as proof of payment.
      </p>

      <p>
        If you have any questions or need assistance, feel free to contact us.
        We look forward to serving you again.
      </p>

      <p>
        Warm regards,<br/>
        <strong>The DevCornelius Team</strong>
      </p>
    `,
        attachments: [
            {
                filename: "receipt.pdf",
                path: pdfPath,
                contentType: "application/pdf",
            },
        ],
    };
    await mailTransport.sendMail(emailDetails);
};
//# sourceMappingURL=emailNotification.email.js.map