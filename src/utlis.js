const Total = (cart) => {
  let totalAmount = 0;
  let totalCost = 0;
  for (let { price, amount } of cart.values()) {
    totalCost += price * amount;
    totalAmount += amount;
  }
  return { totalAmount, totalCost };
};
export default Total;
