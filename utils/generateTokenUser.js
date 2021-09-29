import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const generateTokenUser = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, {
    expiresIn: "30d",
  });
};

export default generateTokenUser;
