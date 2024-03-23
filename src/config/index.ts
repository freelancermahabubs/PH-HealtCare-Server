import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.join(process.cwd(), ".env")});
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret_key: process.env.REFRESH_TOKEN_SECRET_KEY,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};
