export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  contactToEmail: process.env.CONTACT_TO_EMAIL ?? "markusmj2256@gmail.com",
  smtpHost: process.env.SMTP_HOST ?? "smtp.gmail.com",
  smtpPort: Number(process.env.SMTP_PORT ?? "465"),
  smtpSecure: process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : true,
  smtpUser: process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD ?? "",
};
