const db = require("../../db/models")

module.exports = (req, res) => {
  db.User.findOne({
    where: {
      id: req.session?.userLogin?.id || req.params.id
    },
    include: ["addresses"]
  })
  .then(user => {
    res.render("users/profile", { user })
  })
}