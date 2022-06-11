module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    devtool: "cheap-module-source-map",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Adote um Amanhã";
      return args;
    });
  },
};
