const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(proxy("/api/todos/**", { target: "http://192.168.1.11:5000/" }));
  app.use(proxy("/api/**", { target: "http://192.168.1.11:5000/" }));
};
