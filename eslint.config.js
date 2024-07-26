import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      "require-await": "error", // Añade esta regla para requerir await dentro de funciones async
      "no-async-promise-executor": "error", // Ejemplo de otra regla útil
      "no-await-in-loop": "error", // Ejemplo de otra regla útil
    }
  }

];