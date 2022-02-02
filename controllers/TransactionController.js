// "index" === GET listing of all
// "show" === GET specific item
// "store" === POST create a new item
// "update" === PUT update an item
// "destroy" === DELETE an item
const { Transaction } = require('../models');

exports.index = async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
};

exports.store = async (req, res) => {
  // todo this is all dummy data
  await Transaction.create({
    tradedAt: new Date(),
    tradeType: 'buy',
    currency: 'doge',
    tradedFor: 'usd',
    amount: 12.37434904,
    totalInUsd: 144,
    feesInUsd: 30,
    costBasis: 66,
    acquiredAt: new Date()
  });

  res.redirect('/transactions');
};
