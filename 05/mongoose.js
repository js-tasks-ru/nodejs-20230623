const mongoose = require('mongoose');

async function main() {
    const schema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            index: true,
        }
    });

    const Product = mongoose.model('Product', schema);

    await mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: 'nodejs-20230330'
    });

    const products = await Product.find();
    console.log(products);

    await Product.create({ title: "apple" });
    await Product.create({ title: "peach" });

    const allProducts = await Product.find();
    console.log(allProducts);

    const apple = await Product.findOne({ title: "apple" });
    console.log(apple.id);
}

main();
