import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://salepxl.com";

  const routes = [
    "",
    "/services",
    "/portfolio",
    "/case-studies",
    "/about",
    "/contact",
    "/shopify-audit",
    "/shopify-launch-calculator"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
