export interface ReceiptData {
    receiptId: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    items: {
        name: string;
        quantity: number;
        unitPrice: number;
    }[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    orderDate: Date;
    storeDetails: {
        names: string;
        address: string;
        phone: string;
        email: string;
    };
}
//# sourceMappingURL=pdf.types.d.ts.map