import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../context/LanguageContext';

export default function SEOHead({
  title,
  description,
  keywords,
  robots = 'index, follow',
  canonicalUrl,
  ogImage = '/assets/shift-logo.png',
  ogType = 'website',
  schema
}) {
  const { lang } = useLanguage();

  const siteName = 'Shift Marketing Agency & Academy';
  const defaultDesc =
    lang === 'hy'
      ? 'Shift Marketing Agency & Academy. SMM դասընթաց, ռազմավարություն, վիրուսային կոնտենտ, վեբ կայքեր և Meta/Google Ads։'
      : 'Shift Marketing Agency & Academy. Full-cycle digital marketing, SMM course, viral content creation, and Meta/Google Ads.';
  const finalDesc = description || defaultDesc;

  const defaultTitle =
    lang === 'hy'
      ? 'Shift Marketing Agency — Մարքեթինգ և SMM Դասընթացներ'
      : 'Shift Marketing Agency — Digital Marketing & SMM Academy';
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;

  const resolvedCanonical =
    canonicalUrl || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://shiftagency.am');
  const resolvedOgImage =
    ogImage.startsWith('http') || typeof window === 'undefined'
      ? ogImage
      : `${window.location.origin}${ogImage}`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <html lang={lang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:locale" content={lang === 'hy' ? 'hy_AM' : 'en_US'} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={resolvedOgImage} />

      {/* JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
