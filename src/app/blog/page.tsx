import React from "react";
import Metadata from "next";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "@/lib/blogs";
import { Search, Clock, ArrowRight, Sparkles, BookOpen, Tag, Calendar, User } from "lucide-react";

export const metadata = {
  title: "E-Commerce & Shopify Growth Blog | SalePXL Agency",
  description:
    "Actionable guides on Shopify development, Indian payment gateways, shipping courier options, conversion rate optimization (CRO), dropshipping, and speed tuning.",
  keywords: [
    "Shopify Blog India",
    "E-commerce Guides India",
    "Top payment gateway in India",
    "Best shipping company in India",
    "How to start dropshipping in India",
    "Why choose Shopify over WooCommerce",
    "Shopify CRO Tips"
  ],
  openGraph: {
    title: "E-Commerce & Shopify Growth Blog | SalePXL Agency",
    description: "Actionable guides on Shopify store development, payment gateways, shipping, and CRO.",
    url: "https://salepxl.com/blog",
    type: "website"
  }
};

export default function BlogListingPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Glow backgrounds */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fafcfc] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-teal-400/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        
        {/* HERO HEADER */}
        <section className="text-center max-w-4xl mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider mx-auto">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>E-Commerce Knowledge Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight text-neutral-900 font-grotesk">
            Shopify, CRO & D2C <br />
            <span className="font-normal bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Growth Masterclasses
            </span>
          </h1>

          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Deep-dive guides on payment gateways in India, courier logistics, dropshipping setups, page speed optimization, and CRO strategies engineered to scale your online brand.
          </p>
        </section>

        {/* FEATURED POST BANNER */}
        <section className="w-full">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/40 transition-all duration-500"
          >
            <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto w-full rounded-2xl overflow-hidden bg-neutral-100 relative">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  Featured Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-4 font-sans text-left">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-emerald-700 font-bold font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">{featuredPost.category}</span>
                  <span className="flex items-center gap-1 text-neutral-400 font-normal">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-grotesk text-neutral-900 group-hover:text-emerald-700 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 text-xs">
                    PS
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-neutral-900">{featuredPost.author.name}</span>
                    <span className="text-[10px] text-neutral-500">{featuredPost.publishDate}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* ALL BLOG POSTS GRID */}
        <section className="flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-2 border-b border-neutral-200/60 pb-4">
            <span className="text-xs text-emerald-700 uppercase tracking-widest font-mono font-bold">Latest Articles & Guides</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-grotesk">
              All E-Commerce Knowledge Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/90 text-neutral-900 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-neutral-200 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-emerald-700 font-semibold">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <h3 className="text-lg font-bold font-grotesk text-neutral-900 group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-sans line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-4 text-xs font-sans">
                  <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[170px]">
                    Focus: <strong className="text-neutral-700">{post.focusKeyword}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200/80 text-center flex flex-col gap-6 items-center relative overflow-hidden font-sans shadow-sm">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-light font-grotesk text-neutral-900 max-w-2xl">
            Want us to build your Shopify store with <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-normal">sub-1.2s speed & peak CRO?</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl leading-relaxed">
            Pankaj and the SalePXL team custom design and engineer Shopify stores for Indian and international D2C brands.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-900 transition-all duration-300 hover:scale-[1.02] shadow-md"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
