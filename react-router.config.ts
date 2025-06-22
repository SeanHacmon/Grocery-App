import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  buildDirectory: "build",
  future: {
    unstable_singleFetch: false,
    unstable_lazyRouteDiscovery: false,
  },
} satisfies Config;