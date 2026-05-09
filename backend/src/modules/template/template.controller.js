const asyncHandler = require("../../core/utils/asyncHandler");
const { ok } = require("../../core/utils/apiResponse");
const templateService = require("./template.service");

exports.listTemplates = asyncHandler(async (req, res) => {
  return ok(res, templateService.listTemplates(), "Templates");
});

exports.getTemplate = asyncHandler(async (req, res) => {
  const template = templateService.getTemplateById(req.params.id);
  if (!template) {
    return res.status(404).json({ success: false, message: "Template not found" });
  }
  return ok(res, template, "Template");
});

exports.getTemplatePreviewData = asyncHandler(async (req, res) => {
  const previewData = templateService.getPreviewDataByTemplateId(req.params.id);
  if (!previewData) {
    return res.status(404).json({ success: false, message: "Template not found" });
  }
  return ok(res, previewData, "Template preview data");
});

