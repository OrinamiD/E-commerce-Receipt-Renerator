export const receiptGenerate = async () => {
    const fixed = "de767nncdfes762009q";
    const receipt = Math.floor(100000 + Math.random() * 900000).toString();
    const fullReceipt = `${fixed}${receipt}`;
    return fullReceipt;
};
export const orderPaid = async () => {
    const orderDerails = "ADRHf";
    const order = Math.floor(100000 + Math.random() * 900000).toString();
    const newOrder = `${orderDerails}${order}`;
    return newOrder;
};
//# sourceMappingURL=receipt.generation.js.map