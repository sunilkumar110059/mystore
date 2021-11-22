
import productSchema from '../../../admin/schema/productschema';

const getProduct = async (req, res) => {
    try {
        const { prodApi_Id } = req.query
        const getProductId = await productSchema.findOne({ _id: prodApi_Id })
        res.status(201).json(getProductId);
    }
    catch (err) { res.status(400).send(err) }
}


const deleteProduct = async (req, res) => {
    try {
        const { prodApi_Id } = req.query
        await productSchema.findByIdAndDelete({ _id: prodApi_Id })
        res.status(201).json({});
    }
    catch (err) { res.status(400).send(err) }
}


export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;

        case "DELETE":
            await deleteProduct(req, res);
            break;
    }


}

