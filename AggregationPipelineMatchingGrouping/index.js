import express from 'express';
import Products from './modals/ProductSchema.js';
import mongoose from 'mongoose';

const app = express();



app.get('/', (req, res) => {
    res.send("Hello");
});

app.get('/aggregate', async (req, res) => {
    try {
        const pipeline = [
            { $match: { category: 'phone' } }, // Match documents with category 'phone'
            { $group: { _id: '$category', count: { $sum: 1 } } }, // Group documents by category and calculate the count
        ];

        const result = await Products.aggregate(pipeline);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

mongoose.connect('mongodb+srv://swaraj1920:swaraj1920@cluster0.6yd9l.mongodb.net/arena2?retryWrites=true&w=majority')
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
