// config/config.js
// ❌ All secrets hardcoded — should use environment variables

module.exports = {
  database: {
    host:     'db.prod.internal',
    port:      5432,
    name:     'myapp_production',
    user:     'app_user',
    password: 'Pr0d_DB_P@ssw0rd!99',
  },

  jwt: {
    secret:    'jwt_signing_key_do_not_share_abc123xyz',
    expiresIn: '7d',
  },

  stripe: {
    secretKey:    'sk_live_51NxOCGKproductionkeyABCDEF123456',
    webhookSecret:'whsec_production_webhook_secret_key',
  },

  smtp: {
    host:     'smtp.sendgrid.net',
    user:     'apikey',
    password: 'SG.production_sendgrid_api_key_here',
  },

  redis: {
    host:     'redis.prod.internal',
    password: 'redis_prod_password_xyz',
  },

  // ❌ Hardcoded internal URLs
  services: {
    authService:    'https://auth.internal.mycompany.com',
    paymentService: 'https://payments.internal.mycompany.com/v3',
    notifyService:  'https://notify.internal.mycompany.com/webhook',
  },
};
