const axios = require('axios');

const fakestoreApiUrl = 'https://fakestoreapi.com/';

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const response = await axios.get(`${fakestoreApiUrl}products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${fakestoreApiUrl}products/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { title, price, description, category, image } = req.body;
    try {
        const response = await axios.post(`${fakestoreApiUrl}products`, {
            title,
            price,
            description,
            category,
            image,
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;
    try {
        const response = await axios.put(`${fakestoreApiUrl}products/${id}`, {
            title,
            price,
            description,
            category,
            image,
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await axios.delete(`${fakestoreApiUrl}products/${id}`);
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
