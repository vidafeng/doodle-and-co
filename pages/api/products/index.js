import { createRouter } from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connect();

    // passing empty object - find all product
    const products = await Product.find({});

    // await db.disconnect();
    // console.log("inside api prod", products);

    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    throw new Error(err);
  }
});

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error("inside api prod", err.stack);
    res.status(500).send("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).send("Page is not found");
  },
});
