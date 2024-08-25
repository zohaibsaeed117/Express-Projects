const Products = require('../model/product')
const asyncWrapper = require('../middleware/async')


const showProducts = asyncWrapper(async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    let queryObject = {};

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    console.log(req.query);

    let result = Products.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    else {
        result = result.sort("createdAt")
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '<=': '$lte',
            '>=': '$gte',
            '=': '$eq'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filters = numericFilters.replace(regEx
            , (match) => `-${operatorMap[match]}-`
        )
        console.log(filters)
        const options = ['price', 'rating'];

        filters = filters.split(',').forEach((item) => {
            console.log(item)
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }




    const page = (req.query.page) || 1;
    const limit = (req.query.limit) || 10;
    const skip = (page - 1) * limit

    result = result.limit(limit).skip(skip);
    const products = await result;
    return res.status(200).json({ products, nbhits: products.length })
})


const showProductsStatic = async (req, res) => {
    const search = 'ab'
    const products = await Products.find({
        name: { $regex: search, $options: "i" },
    })
    return res.status(200).json({ products, nbhits: products.length });
}

module.exports = {
    showProducts,
    showProductsStatic
}