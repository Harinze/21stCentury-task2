
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config();

// Configure WooCommerce client
const WooCommerce = new WooCommerceRestApi({
    url: process.env.STORE_URL,
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    version: 'wc/v3'
});

// Debug logging for environment variables
console.log('STORE_URL:', process.env.STORE_URL);
console.log('CONSUMER_KEY:', process.env.CONSUMER_KEY);
console.log('CONSUMER_SECRET:', process.env.CONSUMER_SECRET);

// Fetch products
console.log('Fetching products from:', process.env.STORE_URL);

WooCommerce.get("products")
  .then((response) => {
     console.log('Response:', response.data);
  })
  .catch((error) => {
     console.log('Error fetching products:', error.response.data);
  });
