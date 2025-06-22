import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  basename: "/Grocery-App",  // Add this line!
  buildDirectory: "build/client",
} satisfies Config;