import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_DATA } from '../data/BlogData';
import SEOHead from '../components/common/SEOHead';
import ContactSection from '../components/common/ContactSection';
import { Search, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export default function Blog() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_DATA.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.titleHy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summaryHy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Shift Marketing Agency Blog',
    'description': 'Marketing insights, social media growth guides, Meta advertising strategies, and branding tips.',
    'blogPost': BLOG_DATA.map((p) => ({
      '@type': 'BlogPosting',
      'headline': lang === 'hy' ? p.titleHy : p.titleEn,
      'description': lang === 'hy' ? p.summaryHy : p.summaryEn,
      'datePublished': p.date,
      'author': {
        '@type': 'Person',
        'name': p.author
      },
      'url': `https://shiftagency.am/blog/${p.id}`
    }))
  };

  return (
    <div className="pt-28 pb-16">
      <SEOHead
        title={lang === 'hy' ? 'Բլոգ և Մարքեթինգային Ինսայթներ' : 'Digital Marketing Blog & Insights'}
        description={
          lang === 'hy'
            ? 'Օգտակար հոդվածներ Instagram ալգորիթմների, TikTok վիրուսային տեսանյութերի, Meta Ads Manager-ի և վաճառքների ավելացման մասին։'
            : 'Actionable marketing guides on Instagram growth, viral TikTok hooks, Meta ad optimization, and business scaling by Shift Agency.'
        }
        keywords="SMM blog Armenia, Instagram algorithms 2026, TikTok marketing Abovyan, Meta ads guide Armenia"
        schema={blogSchema}
      />
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>SHIFT MARKETING BLOG</span>
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white max-w-4xl mx-auto leading-tight">
          Մարքեթինգային <span className="text-[#b4f846]">Գիտելիքներ & Ինսայթներ</span>
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Թարմ հոդվածներ սոցիալական մեդիայի ալգորիթմների, թիրախային գովազդի ROAS-ի բարձրացման և բրենդինգի գաղտնիքների մասին։
        </p>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Բոլորը' },
              { id: 'smm', label: 'SMM & Ալգորիթմներ' },
              { id: 'ads', label: 'Թիրախային Գովազդ' },
              { id: 'branding', label: 'Բրենդինգ' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#b4f846] text-black border-[#b4f846]'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Որոնել հոդվածներ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#b4f846]"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel text-neutral-400 text-sm">
            Հոդվածներ չեն գտնվել Ձեր որոնմամբ։
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl glass-panel overflow-hidden border border-white/10 hover:border-[#b4f846]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.titleHy}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-black/70 backdrop-blur-md text-[#b4f846] border border-[#b4f846]/30">
                      {lang === 'hy' ? post.categoryLabelHy : post.categoryLabelEn}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#b4f846]" />
                        <span>{lang === 'hy' ? post.readTimeHy : post.readTimeEn}</span>
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-[#b4f846] transition-colors line-clamp-2">
                      {lang === 'hy' ? post.titleHy : post.titleEn}
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {lang === 'hy' ? post.summaryHy : post.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#b4f846] group-hover:underline"
                  >
                    <span>ԿԱՐԴԱԼ ԱՄԲՈՂՋԱԿԱՆ ՀՈԴՎԱԾԸ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <ContactSection />
    </div>
  );
}
