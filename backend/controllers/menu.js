// controllers/menu.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await prisma.menu.findUnique({
      where: {
        id: parseInt(id)
      }
    });
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createMenu = async (req, res) => {
  const { name, description, price, rating, image, category } = req.body;
  try {
    const newMenu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        rating,
        image,
        category
      }
    });
    res.json(newMenu);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, rating, image, category } = req.body;
  try {
    const updatedMenu = await prisma.menu.update({
      where: {
        id: parseInt(id)
      },
      data: {
        name,
        description,
        price,
        rating,
        image,
        category
      }
    });
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.menu.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
