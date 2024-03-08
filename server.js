
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const WORDPRESS_API_URL = process.env.STORE_URL;

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get(`${WORDPRESS_API_URL}/products`);
        const products = response.data.map(product => ({
            id: product.id,
            name: product.name
        }));
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get product by ID
app.get('/product/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const response = await axios.get(`${WORDPRESS_API_URL}/products/${productId}`);
        const product = {
            id: response.data.id,
            name: response.data.name,
            
        };
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
