
const WooCommerce = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerceAPI = new WooCommerce({
    url: process.env.STORE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3",
});

console.log("WooCommerce API:", WooCommerceAPI);

export default async function handler(req, res) {
    try {
        const { perPage } = req.query;
        const responseData = {
            success: false,
            products: []
        };

        const response = await WooCommerceAPI.get("products", {
            per_page: perPage || 10
        });

        responseData.success = true;
        responseData.products = response.data;

        res.json(responseData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
