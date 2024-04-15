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
    reset_pass_token_secret_key: process.env.RESET_PASS_TOKEN,
    reset_pass_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    smtp_host: process.env.SMTP_HOST,
    smtp_service: process.env.SMTP_SERVICE,
    smtp_port: process.env.SMTP_PORT,
    smtp_email: process.env.SMTP_MAIL,
    smtp_password: process.env.SMTP_PASSWORD,
  },
  ssl: {
    storeId: process.env.STORE_ID,
    storePass: process.env.STORE_PASS,
    successUrl: process.env.SUCCESS_URL,
    cancelUrl: process.env.CANCEL_URL,
    failUrl: process.env.FAIL_URL,
    sslPaymentApi: process.env.SSL_PAYMENT_API,
    sslValidationApi: process.env.SSL_VALIDATIOIN_API,
  },
};
