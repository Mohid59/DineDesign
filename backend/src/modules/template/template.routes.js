const router = require("express").Router();
const ctrl = require("./template.controller");

router.get("/", ctrl.listTemplates);
router.get("/:id", ctrl.getTemplate);
router.get("/:id/preview-data", ctrl.getTemplatePreviewData);

module.exports = router;

