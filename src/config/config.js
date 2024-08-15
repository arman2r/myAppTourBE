module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/mydb',
    secret_key: process.env.SECRET_KEY || 'defaultsecret',
    // Add other configuration options here
    MAIL_USERNAME: process.env.MAIL_USERNAME, 
    GOOGLE_CLIENT_ID: process.env.OAUTH_CLIENTID,
    GOOGLE_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
    GOOGLE_ACCESS_TOKEN: process.env.OAUTH_ACCESS_TOKEN
};