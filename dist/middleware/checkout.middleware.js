export const validateCheckoutPayment = async (req, res, next) => {
    const { paymentStatus } = req.body;
    const errors = [];
    if (!paymentStatus) {
        errors.push("paymentStatus is required");
    }
    if (errors.length > 0) {
        return res.status(200).json({ success: true, message: errors });
    }
    next();
};
