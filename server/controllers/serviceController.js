const servicesService = require('../services/serviceService');

async function getServices(req, res) {
  try {
    const services = await servicesService.selectServices();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка получения списка услуг' });
  }
}

module.exports = { getServices };
