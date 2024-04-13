import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
    },
    discountPrice: {
        type: Number,
        min: 0,
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    images: [{
       data: Buffer,
       contentType: String,
    }],
    stock: {
        type: Number,
        min: 0
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: [String]
    },
    published: {
        type: Boolean,
        default: false,
    },
    shipping: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 