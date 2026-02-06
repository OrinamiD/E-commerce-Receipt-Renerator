import { allOrder, getOrder, newOrders } from "../service/order.service.js";
export const craeteOrder = async (req, res) => {
    console.log("REQ BODY:", req.body);
    try {
        // const { orderId } = req.body;
        const { order, user } = await newOrders(req.body);
        return res.status(200).json({
            success: true,
            message: "order created successfully",
            data: {
                orderId: order?.orderId,
                items: order?.items,
                subtotal: order?.subtotal,
                tax: order?.tax,
                total: order?.totalAmount,
                paymentMethod: order?.paymentMethod,
                orderDate: order?.orderDate,
                customerName: user?.customerName,
                customerEmail: user?.customerEmail,
                customerId: order?.customerId,
            },
        });
    }
    catch (error) {
        if (error.message === "Request body is missing")
            return res.status(404).json({ success: false, message: error.message });
        if (error.message === "Required fields are missing")
            return res.status(404).json({ success: false, message: error.message });
        if (error.message === "user does not exist")
            return res.status(404).json({ success: false, message: error.message });
        // if (error.message === "Order does not exist")
        //   return res.status(404).json({ success: false, message: error.message });
        else {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
// <{ userId: string; orderId: string }>,
export const getAnOrder = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        const { order, user } = await getOrder(userId, orderId);
        return res.status(200).json({
            success: true,
            message: "order fetched successfully",
            data: {
                orderId: order.orderId,
                item: order.items,
                subtotal: order.subtotal,
                tax: order.tax,
                paymentMethod: order.paymentMethod,
                orderDate: order.orderDate,
                storeDetails: order.storeDetails,
                customerName: user.customerName,
                customerEmail: user.customerEmail,
                customerId: order.customerId,
            },
        });
    }
    catch (error) {
        if (error.message === "user does not exist") {
            return res.status(404).json({ success: false, message: error.message });
        }
        if (error.message === "You are not allowed") {
            return res.status(403).json({ success: false, message: error.message });
        }
        if (error.message === "order does not exist") {
            return res.status(404).json({ success: false, message: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
export const getAllOrder = async (req, res) => {
    try {
        const { order } = await allOrder();
        return res
            .status(200)
            .json({ success: true, message: "order retrieved successfully", order });
    }
    catch (error) {
        if (error.message === "could not find order") {
            return res.status(404).json({ success: false, message: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
