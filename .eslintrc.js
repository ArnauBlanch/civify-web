module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
    ],
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    "rules": {
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    },
};
