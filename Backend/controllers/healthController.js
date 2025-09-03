function healthCheck(req, res) {
  res.json({ message: 'Server is running!' });
}

module.exports = {
  healthCheck
};