import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const generateTokenAdmin = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "30d",
  });
};

export default generateTokenAdmin;
