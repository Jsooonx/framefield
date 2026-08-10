import createMDX from "@next/mdx";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const withMDX = createMDX({});

export default (phase) => withMDX({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  ...(phase === PHASE_DEVELOPMENT_SERVER
    ? { typescript: { tsconfigPath: "tsconfig.dev.json" } }
    : {}),
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
});
