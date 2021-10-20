const calculatePrice = (items) => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };
  
  module.exports = calculatePrice;