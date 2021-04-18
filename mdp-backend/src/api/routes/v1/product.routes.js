const express = require("express");
const controller = require("../../controllers/product.controller");
const router = express.Router();

/**
 * POST v1/product/add
 * creates a new product
 */

router.route("/add").post(controller.add);

/**
 * PUT v1/product/:id
 * update a product by id
 */

router.route("/:id").put(controller.update);

/**
 * DELETE v1/product/:id
 * delete a product
 */

router.route("/:id").delete(controller.delete);

/**
 * GET v1/product/
 * list catogeries
 */

router.route("/").get(controller.list);

/**
 * GET v1/product/:id
 * get a category by id
 */

router.route("/:id").get(controller.getById);

module.exports = router;
