const logging = {
  filepath: "./logs",
  file: "app.log",
  level: "info",
  console: true,
  maxFiles: 1,
};

if (process.env.log) {
  const src = process.env.log.split("/");
  const file = src[src.length - 1];
  const path = process.env.log.replace(file, "");

  logging.filepath = path;
  logging.file = file;
}

console.log("logging", logging);

module.exports = {
  serverPort: process.env.port || 8080,
  cryptoSecret: "ROlFV4R6PR",
  mysqlConnection: {
    host: process.env.dbhost || "mysql",
    user: process.env.dbuser || "bpuser",
    password: process.env.dbpass || "FknSC6GNAQ",
    database: process.env.dbname || "db",
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
  },
  logging: logging,
  uploadsDir: "uploads",
  tablePrefix: "1592311502747_",
  baseUrl: process.env.urlPrefix || "",
};
