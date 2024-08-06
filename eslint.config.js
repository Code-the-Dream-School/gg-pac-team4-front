// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import pluginReact from 'eslint-plugin-react';

// export default [
//   { files: ['**/*.{js,mjs,cjs,jsx}'] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
    },
    extends: ['plugin:prettier/recommended', 'prettier'],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
    },
  },
];
