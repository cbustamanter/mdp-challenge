const express = require("express");
const categoryRoutes = require("../v1/category.routes");
const productRoutes = require("../v1/product.routes");
const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => {
  res.json({
    message: "OK",
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  });
});

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);

module.exports = router;
