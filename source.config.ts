import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import remarkDirective from "remark-directive";
import { remarkDirectiveDriverTable } from "./lib/remarkDirectiveDriverTable";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: (v) => [remarkDirective, remarkDirectiveDriverTable, ...v],
  },
  lastModifiedTime: "git",
});
