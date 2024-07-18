import promise from "eslint-plugin-promise";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    plugins: {
        promise,
    },

    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        globals: {
            ...globals.browser,
            ...globals.node
        }
    },

    rules: {
        semi: 2,
        "prefer-const": 2,
        "no-console": 0,
        "no-regex-spaces": 2,
        "no-invalid-regex": 0,
        "no-debugger": 0,
        "no-unused-vars": 0,
        "no-mixed-spaces-and-tabs": 2,
        "no-undef": 2,
        "no-template-curly-in-string": 1,
        "consistent-return": 0,
        "array-callback-return": 1,
        eqeqeq: 2,
        "no-alert": 2,
        "no-caller": 2,
        "no-eq-null": 0,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-extra-label": 2,
        "no-implicit-coercion": 1,
        "no-loop-func": 1,
        "no-new-func": 2,
        "no-new-wrappers": 1,
        "no-throw-literal": 0,
        "prefer-promise-reject-errors": 2,
        "for-direction": 0,
        "getter-return": 2,
        "no-await-in-loop": 0,
        "no-compare-neg-zero": 0,
        "no-shadow-restricted-names": 2,
        "prefer-arrow-callback": 0,
        "promise/always-return": 0,
        "promise/catch-or-return": 0,
        "promise/no-nesting": 1,
    },
}];