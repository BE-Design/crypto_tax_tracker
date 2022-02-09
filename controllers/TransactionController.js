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

  // todo what should response be?
  res.redirect('/transactions');
};

exports.update = async (req, res) => {
  const transaction = await Transaction.update(req.body, {
    where: { id: req.params.id }
  });

  // todo what should response be?
  res.json(transaction);
}
