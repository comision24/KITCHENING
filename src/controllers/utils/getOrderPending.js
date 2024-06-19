const { Op } = require("sequelize");
const db = require("../../db/models");

module.exports = async (req) => {
  const dataOrder = await db.Order.findOrCreate({
    where: {
      [Op.and]: [
        {
          userId: req.session.userLogin?.id || req.query.idUser,
        },
        {
          state: "pending",
        },
      ],
    },
    defaults: {
      userId: req.session.userLogin?.id || req.query.idUser,
    },
    include: [
      {
        association: "products",
        through: {
          attributes: ["quantity"],
        },
      },
    ],
  });
  // console.log(dataOrder)
  return dataOrder; // [order,isCreate]
};
