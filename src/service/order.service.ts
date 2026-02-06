import Order, { type IOrder } from "../model/order.model.js";
import Receipt from "../model/receipt.model.js";
import User from "../model/user.model.js";

import { orderPaid } from "../utils/receipt.generation.js";

export const newOrders = async (data: IOrder) => {
  if (!data) {
    throw new Error("Request body is missing");
  }
  const { customerId, items, paymentMethod, storeDetails } = data;

  if (!customerId || !items) {
    throw new Error("Required fields are missing");
  }

  const user = await User.findById(customerId);

  if (!user) throw new Error("user does not exist");

  const generatedOrderId = await orderPaid();


  // const exisitingOrder = await Order.findOne({ orderId: generatedOrderId });

  // if (!exisitingOrder) {
  //   throw new Error("Order does not exist");
  // }

  const itemsArray = items.map((item: any) => ({
    name: item.name,
    quantity: Number(item.quantity),
    unitPrice: Number(item.unitPrice),
  }));

  const subTotal = itemsArray.reduce(
    (sum: number, item: any) => sum + item.quantity * item.unitPrice,
    0,
  );

  const tax = 0.02 * subTotal;

  const totalAmount = subTotal + tax;

  // if (items[1]?.quantity === 100 && items[2]?.unitPrice === 50000) {
  //   const discount = 0.015 * subTotal;
  //   total -= discount;
  // }

  const newOrder = new Order({
    orderId: generatedOrderId,
    // customerName: user?.customerName,
    // customerEmail: user?.customerEmail,
    customerId: user?._id,
    items: itemsArray,
    subtotal: subTotal,
    tax,
    totalAmount,
    paymentMethod,
    paymentStatus: "pending",
    orderDate: new Date(),
    storeDetails,
    // : {
    //   name: exisitingOrder.storeDetails,
    //   address: exisitingOrder.storeDetails,
    //   phone: exisitingOrder.storeDetails,
    //   email: exisitingOrder.storeDetails,
    // },
  });

  await newOrder.save();

  return {
    order: newOrder,
    user: user,
  };
};

export const getOrder = async (orderId: string, userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("user does not exist");
  }

  if (user.role != "E-CommerceBusiness") {
    throw new Error("You are not allowed");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("order does not exist");
  }

  return { order: order, user: user };
};

export const allOrder = async () => {
  const order = await Receipt.find();

  if (!order) {
    throw new Error("could not find order");
  }

  return {
    order: order,
  };
};
