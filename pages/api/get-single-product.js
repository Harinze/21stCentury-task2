const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: process.env.STORE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

export default async function handler(req, res) {

    try {
        const { productId } = req.query;

        const { data } = await api.get(
            `products/${productId}`
        );

        const responseData = {
            success: true,
            product: {
                id: data.id,
                name: data.name
            }
        };

        res.json(responseData);

    } catch (error) {
        const responseData = {
            success: false,
            error: error.message
        };
        res.status(500).json(responseData);
    }
}
