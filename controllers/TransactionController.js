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
  await Transaction.create(req.body);

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

exports.destroy = async (req, res) => {
  await Transaction.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: true })
}
