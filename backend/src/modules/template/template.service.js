const { templates, previewMenuItems } = require("./template.data");

function listTemplates() {
  return templates;
}

function getTemplateById(id) {
  return templates.find((template) => template.id === id) || null;
}

function getPreviewDataByTemplateId(id) {
  const template = getTemplateById(id);
  if (!template) return null;
  return {
    templateId: id,
    menuItems: previewMenuItems,
  };
}

module.exports = { listTemplates, getTemplateById, getPreviewDataByTemplateId };

