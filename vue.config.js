module.exports = {
    css: {
      loaderOptions: {
        scss: {
            prependData: `
                @import "@/styles/_vars.scss";
                @import "@/styles/_functions.scss";
            `
        }
      }
    }
  }