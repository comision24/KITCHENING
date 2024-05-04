const { Op } = require("sequelize");
const db = require("../../../db/models");
const { getOrderPending } = require("../../utils");

module.exports = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!productId) throw new Error("El id no fue recibido");

    let [order, isCreate] = await getOrderPending(req);

    await db.OrderProduct.create({
      orderId: order.id,
      productId,
    });

    order = await order.reload({
      include: [
        {
          association: "products",
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    let total = 0;
    order = order.products.forEach(
      ({
        price,
        orderproducts: {
          dataValues: { quantity },
        },
      }) => {
        const priceTotalProduct = price * quantity;
        total += priceTotalProduct;
      }
    );
    order.total = total;
    await order.save();

    res.status(201).json({
      ok: true,
      msg: "Producto agregado al carrito con éxito",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
  // res.status(200).json({ ok: true, msg: "ok" });
};
