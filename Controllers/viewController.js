exports.getSignUpForm = (req, res) => {
  res.status(200).render("signup");
};
exports.getOverView = (req, res) => {
  res.status(200).render("overview.pug");
};
