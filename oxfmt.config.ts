import { defineConfig } from "oxfmt";

export default defineConfig({
  jsdoc: {
    commentLineStrategy: "multiline",
    descriptionTag: true,
    preferCodeFences: true,
    separateReturnsFromParam: true,
    separateTagGroups: true,
  },
  singleAttributePerLine: true,
  sortImports: true,
  sortPackageJson: {
    sortScripts: true,
  },
});
