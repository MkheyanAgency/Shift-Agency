import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_DATA } from '../data/BlogData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import { ArrowLeft, Clock, User, Calendar, Share2, Sparkles } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const post = BLOG_DATA.find((p) => p.id === id) || BLOG_DATA[0];

  const postTitle = lang === 'hy' ? post.titleHy : post.titleEn;
  const postSummary = lang === 'hy' ? post.summaryHy : post.summaryEn;

  const postSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': postTitle,
      'description': postSummary,
      'image': post.image,
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Shift Marketing Agency',
        'url': 'https://shiftagency.am'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://shiftagency.am/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': 'https://shiftagency.am/blog'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': postTitle,
          'item': `https://shiftagency.am/blog/${post.id}`
        }
      ]
    }
  ];

  return (
    <div className="pt-28 pb-16">
      <SEOHead
        title={postTitle}
        description={postSummary}
        ogImage={post.image}
        ogType="article"
        schema={postSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#b4f846] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Վերադառնալ Բոլոր Հոդվածներին</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20 inline-block">
            {lang === 'hy' ? post.categoryLabelHy : post.categoryLabelEn}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {lang === 'hy' ? post.titleHy : post.titleEn}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-semibold pt-2 border-y border-white/10 py-3">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#b4f846]" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#b4f846]" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#b4f846]" />
              <span>{lang === 'hy' ? post.readTimeHy : post.readTimeEn}</span>
            </span>
          </div>
        </header>

        {/* Featured Cover */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-[340px] sm:h-[420px] border border-white/10">
          <img
            src={post.coverImage}
            alt={post.titleHy}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div
          className="prose prose-invert max-w-none text-neutral-300 leading-relaxed space-y-6 text-sm sm:text-base border-b border-white/10 pb-16 mb-16"
          dangerouslySetInnerHTML={{
            __html: lang === 'hy' ? post.contentHy : post.contentEn
          }}
        />
      </div>

      <ContactSection
        title="Ցանկանո՞ւմ եք կիրառել այս ռազմավարությունները Ձեր բիզնեսում"
        subtitle="Մեր թիմը կկազմի Ձեր էջի կամ գովազդի անհատական ծրագիրը։"
      />
    </div>
  );
}
