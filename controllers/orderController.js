import orderModel from "../models/orderModel.js";

export const getOrdersController = async(req,res)=>{
    try {
        const orders = await orderModel.find({buyer:req.user._id})
        .populate("products", "-images")
        .populate("buyer","name");
        res.status(200).send({
            success: true,
            
            orders
          });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            error,
            message: "Error while getting Orders",
        });
    }
}

export const orderStatusController = async(req,res)=>{
    try{
        const {orderId} = req.params;
        const {status} =req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, 
            {status}, 
            {new:true});
            res.json(oreders);
    }
    catch(error){
        console.log(error);
        res.send({
            success: false,
            error,
            message: "Error while getting Orders",
        });
    }
}

//get all orders
export const getAllOrdersController =async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        .populate("products", "-images")
        .populate("buyer","name")
        .sort({createdAt:"-1"});
        res.status(200).send({
            success: true,
            
            orders
          });
    }
    catch(error){
        console.log(error);
        res.send({
            success: false,
            error,
            message: "Error while getting Orders",
        });
    }
}