import React from "react";
import Metadata from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BlogPost } from "@/lib/blogs";
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2, 
  Share2, 
  BookOpen,
  Sparkles,
  ChevronRight
} from "lucide-react";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | SalePXL Blog"
    };
  }

  return {
    title: `${post.metaTitle} | SalePXL`,
    description: post.metaDescription,
    keywords: [post.focusKeyword, ...post.secondaryKeywords],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://salepxl.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: [{ url: post.coverImage }]
    }
  };
}

export default async function BlogDetailPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 text-left min-h-screen bg-gradient-to-b from-[#fafcfc] via-[#f5faf7] to-[#eaf7f2] overflow-hidden -mt-24 font-grotesk">
      {/* Background glow highlights */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fafcfc] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10">
        
        {/* BREADCRUMBS & BACK BUTTON */}
        <div className="flex items-center justify-between text-xs font-sans">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-emerald-700 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-neutral-400">
            <Link href="/" className="hover:text-neutral-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-neutral-700">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-neutral-800 font-semibold truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>

        {/* ARTICLE HEADER */}
        <header className="flex flex-col gap-6 text-left max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono uppercase tracking-wider border border-emerald-200">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-neutral-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {post.readTime}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="flex items-center gap-1 text-neutral-500 font-mono">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {post.publishDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-grotesk tracking-tight leading-tight text-neutral-900">
            {post.title}
          </h1>

          {/* Focus Keyword & Author Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-y border-neutral-200/80 py-4 font-sans text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                PS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-neutral-900 text-sm">{post.author.name}</span>
                <span className="text-neutral-500 text-[11px]">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 font-mono text-[11px]">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Focus Keyword: <strong>{post.focusKeyword}</strong></span>
            </div>
          </div>
        </header>

        {/* COVER IMAGE */}
        <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MAIN BODY CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          
          {/* STICKY TABLE OF CONTENTS SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono">Table of Contents</h3>
            </div>

            <nav className="flex flex-col gap-2.5 text-xs text-neutral-600">
              {post.tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="hover:text-emerald-700 hover:font-bold transition-all line-clamp-1 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item.text}</span>
                </a>
              ))}
            </nav>

            <div className="border-t border-neutral-100 pt-4 mt-2 flex flex-col gap-3">
              <span className="text-[11px] text-neutral-400 uppercase font-mono tracking-wider font-bold">Quick Services Link</span>
              <Link
                href="/services"
                className="w-full py-2 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center hover:bg-emerald-100 transition-colors"
              >
                View Shopify Dev Services
              </Link>
            </div>
          </aside>

          {/* MAIN ARTICLE BODY TEXT */}
          <article className="lg:col-span-8 flex flex-col gap-6 text-neutral-800 text-sm sm:text-base leading-relaxed text-left prose max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:font-grotesk [&_h2]:text-neutral-900 [&_h2]:mt-8 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-neutral-200/60 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_h3]:mt-6 [&_p]:text-neutral-700 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-neutral-700 [&_strong]:text-neutral-900 [&_a]:text-emerald-700 [&_a]:font-bold [&_a]:underline [&_table]:w-full [&_table]:my-6 [&_table]:text-xs [&_table]:border-collapse [&_th]:bg-neutral-100 [&_th]:p-3 [&_th]:text-neutral-900 [&_th]:font-bold [&_td]:p-3 [&_td]:border-b [&_td]:border-neutral-200"
            />

            {/* AUTHOR BIO BOX */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-neutral-200/80 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-sm">
                PS
              </div>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">Written by Author</span>
                <h4 className="text-base font-bold text-neutral-900">{post.author.name}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pankaj Singh is the Lead E-Commerce Architect at SalePXL. He specializes in bespoke Shopify Liquid development, high-speed headless stores, and conversion rate optimization (CRO) for D2C brands.
                </p>
              </div>
            </div>
          </article>

        </div>

        {/* RELATED ARTICLES SECTION */}
        <section className="border-t border-neutral-200/80 pt-12 mt-8 flex flex-col gap-8 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-grotesk text-neutral-900">Recommended Growth Articles</h3>
            <Link href="/blog" className="text-xs font-bold text-emerald-700 hover:underline">View All Articles →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-500/30 transition-all flex flex-col justify-between gap-3 shadow-sm"
              >
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-100 relative">
                  <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">{rel.category}</span>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2">{rel.title}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* BOTTOM STRATEGY CALL BANNER */}
        <section className="p-8 sm:p-12 rounded-3xl bg-black text-white text-center flex flex-col gap-6 items-center relative overflow-hidden font-sans shadow-xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-light font-grotesk text-white max-w-2xl">
            Ready to build your <span className="text-emerald-400 font-normal">High-Converting Shopify Store?</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
            Let Pankaj and the SalePXL team custom design, build, and optimize your storefront for maximum sales conversion.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-neutral-100 transition-all duration-300 hover:scale-[1.02] shadow-md"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </section>

      </div>
    </div>
  );
}
