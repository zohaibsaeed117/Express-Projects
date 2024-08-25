const express = require('express');
const app = express();
const router = express.Router();
const {showProducts,showProductsStatic}=require('../controller/product');

router.route('/').get(showProducts);
router.route('/static').get(showProductsStatic);

module.exports = router;