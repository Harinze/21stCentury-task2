const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require('dotenv').config()

const api = new WooCommerceRestApi({
    url: process.env.STORE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

export default async function handler(req, res) {

    const responseData = {
        success: false,
        product: {}
    }

    const { productId } = req.query;

    try {
        const { data } = await api.get(
            `products/${productId}`
        );

        responseData.success = true;
        responseData.product.id = data.id;
        responseData.product.name = data.name;

        res.json(responseData);

    } catch (error) {
        responseData.error = error.message;
        res.status(500).json(responseData);
    }
}
