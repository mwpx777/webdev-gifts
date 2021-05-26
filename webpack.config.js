const WebpackPwaManifest = require('webpack-pwa-manifest');
new WebpackPwaManifest({
name: "WebDev Gifts",
description: "An e-commerce app to purchase WebDev 2020-2021 items",
start_url: "../index.html",
background_color: "#017F9B",
theme_color: "#FFFFFF",
fingerprints: false,
inject: false,
icons: [{
    src: path.resolve("assets/img/icons/WebDevIcon.png"),
    sizes: [96, 128, 192, 256, 384, 512],
    destination: path.join("assets", "icons")
}]
})
// test