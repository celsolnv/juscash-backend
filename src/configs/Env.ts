import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

class EnvSettings {
  static readonly NODE_ENV = process.env.NODE_ENV || 'development';
  static readonly PORT = process.env.PORT || 3001;
  static readonly HASH_SALT = process.env.HASH_SALT || 10;
  static readonly JWT_HASH = process.env.JWT_HASH || 'secret';
  static readonly API_URL = process.env.API_URL || 'http://localhost:3001';
  static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 86400;
  static readonly FRONTEND_URL =
    process.env.FRONTEND_URL || 'http://localhost:3000';

  // EMAIL
  static readonly SMTP_SERVICE = process.env.SMTP_SERVICE as string;
  static readonly SMTP_HOST = process.env.SMTP_HOST as string;
  static readonly SMTP_PORT = process.env.SMTP_PORT as string;
  static readonly SMTP_USER = process.env.SMTP_USER as string;
  static readonly SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
  static readonly SMTP_SECURE = process.env.SMTP_SECURE as string;
}

export { EnvSettings };
