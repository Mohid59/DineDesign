// controller
exports.getSuggestions = async (req, res) => {
    const result = await aiService.generateBranding(req.body);
    res.json(result);
  };