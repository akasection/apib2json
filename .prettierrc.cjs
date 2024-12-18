module.exports = {
  printWidth: 120,
  proseWrap: "never",
  semi: false,
  singleQuote: true,
  trailingComma: "es5",
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "avoid",
  bracketSameLine: false,
  endOfLine: "auto",
  overrides: [
    {
      files: "**/*.md",
      options: {
        proseWrap: "always"
      }
    }
  ]
}
