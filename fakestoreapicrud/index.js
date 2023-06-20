const express = require('express');
const bodyParser = require('body-parser');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./controllers');

const app = express();
app.use(bodyParser.json());

// Get all products
app.get('/products', getAllProducts);

// Get a product by ID
app.get('/products/:id', getProductById);

// Create a new product
app.post('/products', createProduct);

// Update a product
app.put('/products/:id', updateProduct);

// Delete a product
app.delete('/products/:id', deleteProduct);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
