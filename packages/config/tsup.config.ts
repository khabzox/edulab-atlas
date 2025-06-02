import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: false,
  external: ["zod"],
  sourcemap: true,
  bundle: true,
  platform: "node",
  noExternal: ["dotenv-safe", "@t3-oss/env-core"],
  onSuccess: "echo Build completed successfully!",
  outDir: "dist"
});