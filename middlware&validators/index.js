const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a Product model
const Product = mongoose.model('Product', {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Create Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Built-in validator: Data validation using express-validator
app.post(
    '/products',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = new Product(req.body);
        product
            .save()
            .then(() => {
                res.status(201).json({ message: 'Product created successfully' });
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
    }
);

// Custom validator: Check if price is greater than 0
const validatePrice = (req, res, next) => {
    const { price } = req.body;
    if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    next();
};

// Custom validator: Check if quantity is greater than 0
const validateQuantity = (req, res, next) => {
    const { quantity } = req.body;
    if (quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }
    next();
};

// Apply custom validators
app.post(
    '/products/custom',
    validatePrice,
    validateQuantity,
    (req, res) => {
        const product = new Product(req.body);
        product
            .save()
            .then(() => {
                res.status(201).json({ message: 'Product created successfully' });
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
    }
);

// Aggregation middleware: Retrieve total revenue
app.get('/revenue', (req, res) => {
    Product.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
            },
        },
    ])
        .then((result) => {
            res.json({ revenue: result[0].totalRevenue });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Query middleware: Find products with price greater than 100
app.get('/products', (req, res) => {
    Product.find({ price: { $gt: 100 } })
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Document middleware: Capitalize product names before saving
Product.pre('save', function (next) {
    this.name = this.name.toUpperCase();
    next();
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
