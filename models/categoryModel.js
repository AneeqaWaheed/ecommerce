import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        lowerCase:true,
    },
    // parent: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    // children: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // }],
    // products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // }]
}
// , {timestamps: true}
);


export default mongoose.model('Category', categorySchema);
