const { getOrderPending } = require("../../utils");

module.exports = async (req, res) => {
  try {
    const [order, isCreate] = await getOrderPending(req);

    if (!isCreate) {
      order.state = "completed";
      await order.save();
    }

    res.status(200).json({
      ok:true,
      msg: "Orden completada con éxito"
    })

  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: err.message,
    });
  }
  // res.status(200).json({ ok: true, msg: "ok" });
};
