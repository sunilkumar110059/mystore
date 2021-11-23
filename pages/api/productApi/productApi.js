

import ConnctionDB from '../../../admin/db/connection';
import productSchema from '../../../admin/schema/productschema';

ConnctionDB();

const getProductData = async (req, res) => {
  try {
    const getdata = await productSchema.find()
    res.status(201).json(getdata);
  }
  catch (err) {
    console.log("errProd", err)
    res.status(400).send(err)
  }

}


const postProductData = async (req, res) => {
  try {
    const postdata = new productSchema(req.body)
    const insertPost = await postdata.save();
    res.status(201).json(insertPost)
  }
  catch (err) {
    res.status(400).send(err)
  }
}


// Swith function start
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProductData(req, res);
      break;

    case "POST":
      await postProductData(req, res);
      break;
  }
}

