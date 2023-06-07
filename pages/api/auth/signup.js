import User from "../../../models/User";
import db from "../../../utils/db";
import { hashPassword } from "../../../utils/auth";

async function handler(req, res) {
  // method should be 'POST' -- secure
  // test using postman
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { name, email, password } = data;

  // validation on backend
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid Input",
    });
    return;
  }

  try {
    await db.connect();
    console.log("inside sign up connect");

    //   check if user exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(422).json({
        message: "This email address is already in use",
      });
      db.disconnect();
      return;
    }

    //   hash password
    //   go to utils auth.js
    const hashedPassword = await hashPassword(password);

    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "New user created successfuly" });

    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
}

export default handler;
