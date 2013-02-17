module.exports = {
    js: {
        vendor: "vendor/js/**/*.js",
        app: "app/js/**/*.js",
        concatenated: "generated/js/app.js",
        minified: "dist/js/app.min.js"
    },
    less: {
        app: "app/css/**/*.less",
        generated: "generated/css/app.less.css"
    },
    css: {
        app: "public/css/*.css",
        concatenated: "generated/css/app.css"
    }
};