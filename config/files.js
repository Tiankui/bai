module.exports = {
    js: {
        app: "app/js/**/*.js",
        vendor: "vendor/css/**/*.css",
        concatenated: "generated/js/app.js",
        minified: "dist/js/app.min.js"
    },
    coffee:{
        app: "app/js/**/*.coffee",
        generated: "generated/js/app.coffee.js"
    },
    less: {
        app: "app/css/**/*.less",
        generated: "generated/css/app.less.css"
    },
    css: {
        app: "app/css/**/*.css",
        vendor: "vendor/css/**/*.css",
        concatenated: "generated/css/app.css",
        minified: "dist/css/app.min.css"
    },
    img: {
        app: "app/img/**/*.*",
        vendor: "vendor/img/**/*.*",
        root: "img"
    }
};
