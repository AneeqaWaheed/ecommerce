import Product from "../models/productModel.js";
import fs from 'fs';
export const createProductController = async(req,res) =>{
    try{
        const {title,description,price,discountPrice,categories,stock,colors,sizes,published,shipping} = req.fields;
        const  {images} = req.files;
        switch(true){
            case !title:
                return res.status(500).send({error: "title is required"});
            case !categories:
                return res.status(500).send({error: "categories is required"});
            case !price:
                return res.status(500).send({error: "price is required"});
            case !images && images.size >1000000:
                return res.status(500).send({error: "images is required"});
        }
        const products = new Product({...req.fields})
        if (images){
            products.images.data= fs.readFileSync(images.path);
            products.images.contentType = images.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product created Successfullly",
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Error in creating products ",
            success: false,
            error,
        })
    }
}

export const getProductController = async(req,res) =>{
    try{
        const products = await Product
        .find({})
        .populate('categories')
        .select("-images")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
        })
    }
    catch(error){
        console.log(error),
        res.status(500).send({
            success: false,
            message:"Error getting all products",
            error,
    })
    }
}
export const singleProductController = async(req,res) =>{
    try{
        const product = await Product.findOne({id:req.body.id}).select("-images").populate("categories");
        res.status(200).send({
            success:true,
            message:"Single Category Successfully",
            product
        })
    }
    catch(error){
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error while getting Single Category",
            error
        })
    }
}


export const productImageController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid).select("images");
        // console.log(product)
        if (!product) {
            return res.status(404).send({ success: false, message: "Product not found" });
        }
        console.log("Image")
        const image = product.images.data
        //res.set('Content-type', product.images.contentType);
        return res.status(200).send({
            image,
            message: "Image"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting image",
            error
        });
    }
};

export const deleteProductController = async(req,res)=>{
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully",
            
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting Product",
            error
        })
    }
}

//update Product
export const updateProductController = async(req,res) =>{
    try{
        const {title,description,price,discountPrice,categories,stock,colors,sizes,published,shipping} = req.fields;
        const  {images} = req.files;
        switch(true){
            case !title:
                return res.status(500).send({error: "title is required"});
            case !categories:
                return res.status(500).send({error: "categories is required"});
            case !price:
                return res.status(500).send({error: "price is required"});
            case !images && images.size >1000000:
                return res.status(500).send({error: "images is required"});
        }
        const products = await Product.findByIdAndUpdate(req.params.pid,
        {
            ...req.fields
        },
        {new:true}
    )
        if (images){
            products.images.data= fs.readFileSync(images.path);
            products.images.contentType = images.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product updated Successfullly",
            products,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            message:"Error in updating products ",
            success: false,
            error,
        })
    }
}