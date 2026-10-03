import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const DICTIONARY = {
  hy: {
    nav: {
      home: 'Գլխավոր',
      about: 'Մեր մասին',
      services: 'Ծառայություններ',
      courses: 'Դասընթացներ',
      portfolio: 'Պորտֆոլիո',
      quiz: 'Քվիզ',
      cases: 'Քեյսեր',
      blog: 'Բլոգ',
      faq: 'Հարցեր',
      contact: 'Կապ',
      admin: 'Ադմին',
      bookCall: 'Ստանալ խորհրդատվություն',
      calculator: 'Գնացուցակի Հաշվիչ'
    },
    hero: {
      badge: 'SHIFT MARKETING AGENCY & ACADEMY',
      tagline: 'Մարքեթինգ, որը բիզնեսը վերածում է ճանաչելի բրենդի և իրական վաճառքի ⚡',
      subtext: 'Մենք ստեղծում ենք բարձր կոնվերսիայով SMM, թիրախային գովազդ, վիրուսային կոնտենտ և վեբ կայքեր, ինչպես նաև կրթում ենք շուկայի հաջորդ սերնդի առաջատար մասնագետներին։',
      ctaConsult: 'Ստանալ Անվճար Խորհրդատվություն',
      ctaServices: 'Դիտել Ծառայությունները',
      ctaCourses: 'SMM Դասընթաց',
      statsProjects: '50+ Իրականացված Նախագիծ',
      statsSpend: '$1.5M+ Կառավարված Բյուջե',
      statsSatisfaction: '99% Գոհունակություն'
    },
    approach: {
      eyebrow: 'ՄԵՐ ՄՈՏԵՑՈՒՄԸ',
      title: 'Քայլ առ քայլ՝ ռազմավարությունից մինչև շոշափելի արդյունք',
      step1: 'Անալիտիկա',
      step1Desc: 'Ձեր շուկայի, մրցակիցների և թիրախային լսարանի խորքային հետազոտություն։',
      step2: 'Ստրատեգիա',
      step2Desc: 'Քայլերի հստակ ճանապարհային քարտեզ և KPI նպատակադրում։',
      step3: 'Կրեատիվ',
      step3Desc: 'Վիրուսային կոնտենտ, վիզուալ ինքնություն և ուշադրություն գրավող Hook-եր։',
      step4: 'Իրականացում',
      step4Desc: 'Գովազդային արշավների մեկնարկ, A/B թեստավորում և կոնվերսիաների մշտադիտարկում։',
      step5: 'Արդյունք',
      step5Desc: 'Շարունակական մասշտաբավորում (Scaling) և վաճառքների կայուն աճ։'
    },
    whyUs: {
      eyebrow: 'ԻՆՉՈՒ՞ ՄԵԶ',
      title: 'Ինչո՞ւ են Հայաստանի առաջատար բիզնեսները ընտրում Shift-ը',
      card1Title: 'ROI և Թվերի վրա հիմնված ռազմավարություն',
      card1Desc: 'Մենք չենք սիրում աննպատակ «լայքեր»։ Մեր նպատակը իրական լիդերն են, զանգերը և վաճառքի աճը։',
      card2Title: 'Հեղինակային և վիրուսային կոնտենտ',
      card2Desc: 'Ոչ մի շաբլոնային լուսանկար ինտերնետից։ Յուրաքանչյուր Reels, TikTok և դիզայն ստեղծվում է բացառապես Ձեզ համար։',
      card3Title: '100% Թափանցիկ հաշվետվություններ',
      card3Desc: 'Դուք միշտ տեսնում եք, թե ինչպես է ծախսվել յուրաքանչյուր դրամը և ինչ եկամուտ է այն բերել։',
      card4Title: 'Փորձառու և նվիրված մասնագետներ',
      card4Desc: 'SMM մենթորներ, Certified Media Buyer-ներ, դիզայներներ և ծրագրավորողներ՝ մեկ հարթակում։'
    },
    calc: {
      title: 'Մարքեթինգային Բյուջեի և Ծառայությունների Հաշվիչ',
      subtitle: 'Ընտրեք Ձեր նպատակները և ծառայությունները՝ ստանալու անհատական մոդելավորում և արժեքի նախնական հաշվարկ։',
      budgetLabel: 'Նախատեսվող Ամսական Մեդիա Բյուջե',
      servicesLabel: 'Ընտրեք Անհրաժեշտ Ծառայությունները',
      estimatedInvestment: 'Գնահատված Ներդրում',
      perMonth: '/ ամիս',
      recommendedPack: 'Առաջարկվող Փաթեթ',
      getProposal: 'Ստանալ Մոդելավորում և Առաջարկ'
    },
    footer: {
      aboutText: 'Shift Marketing Agency & Academy — մարքեթինգային գործակալություն և թվային կրթական ակադեմիա։',
      rights: 'Բոլոր իրավունքները պաշտպանված են։'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      courses: 'Academy',
      portfolio: 'Portfolio',
      quiz: 'Marketing Quiz',
      cases: 'Case Studies',
      blog: 'Blog',
      faq: 'FAQ',
      contact: 'Contact',
      admin: 'Admin Panel',
      bookCall: 'Book Consultation',
      calculator: 'Price Calculator'
    },
    hero: {
      badge: 'SHIFT MARKETING AGENCY & ACADEMY',
      tagline: 'Marketing that transforms businesses into iconic brands and record revenue ⚡',
      subtext: 'We engineer high-converting social media ecosystems, hyper-targeted paid ads, viral content, and high-performance web platforms — while training the next generation of digital marketing leaders.',
      ctaConsult: 'Claim Free Strategy Call',
      ctaServices: 'Explore Services',
      ctaCourses: 'SMM Academy',
      statsProjects: '50+ Deployed Projects',
      statsSpend: '$1.5M+ Media Managed',
      statsSatisfaction: '99% Client Retention'
    },
    approach: {
      eyebrow: 'OUR METHODOLOGY',
      title: 'A continuous loop from deep discovery to exponential revenue',
      step1: 'Analytics',
      step1Desc: 'Comprehensive discovery of market dynamics, competitive blind spots, and customer psychology.',
      step2: 'Strategy',
      step2Desc: 'Defining measurable milestones, messaging pillars, and omni-channel acquisition funnels.',
      step3: 'Creative',
      step3Desc: 'Viral short-form cinematography, scroll-stopping hooks, and iconic aesthetic branding.',
      step4: 'Execution',
      step4Desc: 'Launching multi-stage campaigns, rigorous A/B splits, and real-time bid adjustments.',
      step5: 'Revenue & Scale',
      step5Desc: 'Aggressive scaling of winning ad units to capture compounded market share.'
    },
    whyUs: {
      eyebrow: 'WHY SHIFT',
      title: 'Why industry-leading brands choose Shift Marketing Agency',
      card1Title: 'ROI & Data-First Framework',
      card1Desc: 'We do not pursue vanity likes. Our North Star is measurable client acquisition, appointments, and cold hard pipeline.',
      card2Title: '100% Bespoke Viral Production',
      card2Desc: 'Zero generic stock assets. Every Reel, TikTok, and visual layout is shot and custom-crafted for your brand.',
      card3Title: 'Total Billing & Data Transparency',
      card3Desc: 'Direct client-owned ad accounts with real-time analytics access. Every dollar is tracked to the penny.',
      card4Title: 'Seasoned Multi-Disciplinary Squad',
      card4Desc: 'Certified media buyers, art directors, copywriters, and full-stack software engineers under one roof.'
    },
    calc: {
      title: 'Interactive Marketing Budget & ROI Estimator',
      subtitle: 'Select your operational scale and target channels to forecast recommended media allocation.',
      budgetLabel: 'Planned Monthly Ad Spend (AMD)',
      servicesLabel: 'Select Required Service Pillars',
      estimatedInvestment: 'Estimated Retainer',
      perMonth: '/ month',
      recommendedPack: 'Recommended Tier',
      getProposal: 'Request Tailored Blueprint'
    },
    footer: {
      aboutText: 'Shift Marketing Agency & Academy — Performance agency and digital marketing education.',
      rights: 'All rights reserved.'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('shift_lang') || 'hy';
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === 'hy' ? 'en' : 'hy';
      localStorage.setItem('shift_lang', next);
      return next;
    });
  };

  const t = DICTIONARY[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'hy',
      setLang: () => {},
      toggleLanguage: () => {},
      t: DICTIONARY['hy']
    };
  }
  return context;
};
