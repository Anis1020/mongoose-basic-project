import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  bcrypt_salt_round: process.env.BCRYPT_PASSWORD_SALT,
  default_password: process.env.DEFAULT_PASSWORD,
};
