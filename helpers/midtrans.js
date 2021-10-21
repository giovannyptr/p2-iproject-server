const midtransClient = require("midtrans-client");
let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: 'SB-Mid-server-S5ZhpVBKVz3QUhtj81U9-xkk',
  clientKey: 'SB-Mid-client-RsRoKSMk5cCFU_lb',
});

const createTransaction = (parameter) => {
  return snap.createTransaction(parameter);
};

module.exports = createTransaction;
