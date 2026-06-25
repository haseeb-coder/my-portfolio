import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://haseeb-ur-rehman-portfolio.netlify.app/sitemap.xml",
  };
}
