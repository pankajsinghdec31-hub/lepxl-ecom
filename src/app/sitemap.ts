import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://salepxl.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/pricing",
    "/portfolio",
    "/case-studies",
    "/contact",
    "/how-it-works",
    "/shopify-landing",
    "/shopify-audit",
    "/shopify-launch-calculator",
    "/blog",
    "/privacy",
    "/terms"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/pricing" || route === "/services" ? 0.9 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate).toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
