const router = require("express").Router();
const { listApi, storeApi, updateApi } = require("../../controllers/api/admin");
const { uploadProducts } = require("../../middlewares/uploads");

/* /api/products */
router.get("/", listApi);
router.post(
  "/",
  uploadProducts.fields([
    { name: "imagePrincipal" },
    { name: "imagesSecondary" },
  ]),
  storeApi
);
router.put("/:id", updateApi);

module.exports = router;
