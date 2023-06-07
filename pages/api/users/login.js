import { createRouter } from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router.post(async (req, res) => {
  await db.connect();
  //   look for user
  const user = await User.findOne({ email: req.body.email });
  // await db.disconnect();

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // sign a token to securely handle user info from utils
    const token = signToken(user);
    res.send({
      token,
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res
      .status(401)
      .send({ message: "The email and/or password you entered is invalid" });
  }
});

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
