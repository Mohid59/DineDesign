const router = require("express").Router();
const auth = require("../../middleware/auth.middleware");
const rbac = require("../../core/roles/rbac.middleware");
const ctrl = require("./menu.controller");

router.get("/categories", auth, ctrl.listCategories);
router.post("/categories", auth, rbac("admin", "staff"), ctrl.createCategory);

router.get("/items", auth, ctrl.listMenuItems);
router.post("/items", auth, rbac("admin", "staff"), ctrl.createMenuItem);
router.put("/items/:id", auth, rbac("admin", "staff"), ctrl.updateMenuItem);
router.delete("/items/:id", auth, rbac("admin", "staff"), ctrl.deleteMenuItem);

module.exports = router;
