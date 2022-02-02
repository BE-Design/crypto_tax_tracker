// todo is this needed?

const path = require('path');

exports.index = (req, res) => {
  // how the fuck the react script
  //  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  // res.sendFile('../client/build/index.html');
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
};