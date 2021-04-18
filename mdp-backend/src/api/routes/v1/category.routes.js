const express = require("express");
const controller = require("../../controllers/category.controller");
const router = express.Router();

/**
 * POST v1/category/add
 * creates a new category
 */

router.route("/add").post(controller.add);

/**
 * PUT v1/category/:id
 * update a category by id
 */

router.route("/:id").put(controller.update);

/**
 * DELETE v1/category/:id
 * delete a category
 */

 router.route("/:id").delete(controller.delete);

/**
 * GET v1/category/
 * list catogeries
 */

router.route("/").get(controller.list);

/**
 * GET v1/category/:id
 * get a category by id
 */

 router.route("/:id").get(controller.getById);

module.exports = router;
