(() => {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const CONFIG = {
    enrollmentDeadline: "",
    seatsRemaining: 4,
    formEndpoint: "",
    contactEmail: "",
    contactPhone: "",
    mapEmbedUrl: "",
    stats: {
      activeClients: null,
      mediaBudget: null,
      studentsGraduated: null,
    },
    socialLinks: [],
    caseStudies: [
      {
        category: "restaurant",
        title: "Ռեստորաններ և հյուրընկալություն",
        description: "Կոնտենտի ռազմավարության, առաջարկների և լսարանի հետ հաղորդակցության case-study ձևանմուշ։",
        results: { before: {}, after: {} },
      },
      {
        category: "real-estate",
        title: "Անշարժ գույք",
        description: "Գույքի ներկայացման, լսարանի սեգմենտավորման և հարցումների ուղու case-study ձևանմուշ։",
        results: { before: {}, after: {} },
      },
      {
        category: "ecommerce",
        title: "E-commerce",
        description: "Ապրանքի ներկայացման, առաջարկների և թվային գովազդի case-study ձևանմուշ։",
        results: { before: {}, after: {} },
      },
    ],
    testimonials: [],
  };

  const LESSONS = [
    ["Ծանոթություն. Ներածություն «Ինչ է SMM». Մարքեթինգի հիմունքներն ու ճյուղերը", "SMM մասնագետի դերը, մարքեթինգի հիմունքները և ոլորտի հիմնական ուղղությունները։"],
    ["Քոնթենթ-ռազմավարություն / Հաշվետվություն", "Բովանդակության նպատակը, ռազմավարության կառուցվածքը և աշխատանքի արդյունքների հաշվետվությունը։"],
    ["Բրիֆ + SMART նպատակ + Քոնթենթ պլան", "Հաճախորդի պահանջների հստակեցում, չափելի նպատակներ և բովանդակության պլանի կազմում։"],
    ["Canva ծրագիրը որպես SMM գործիք", "Canva-ի կիրառումը սոցիալական ցանցերի վիզուալ նյութերի պատրաստման համար։"],
    ["Instagram-ը բիզնեսի հիմքում", "Բիզնես էջի կառուցվածք, պրոֆիլի ներկայացում և Instagram-ի գործնական հնարավորություններ։"],
    ["Ալգորիթմը, փոփոխությունները / Influencer Marketing", "Հարթակների ալգորիթմների փոփոխություններ և influencer marketing-ի հիմունքներ։"],
    ["Վիզուալի կարևորությունը IG-ում (Մաս 1)", "Instagram էջի տեսողական ոճն ու հետևողական վիզուալ հաղորդակցությունը։"],
    ["Վիզուալի կարևորությունը IG-ում (Մաս 2)", "Վիզուալ ռազմավարության շարունակություն և կիրառական օրինակներ։"],
    ["# Կիրառումը + Storytelling IG-ում", "Հաշթեգների կիրառումը և պատմողական ձևաչափերը Instagram-ում։"],
    ["Պրակտիկ աշխատանք + Վաճառող տեքստեր", "Գործնական առաջադրանքներ և վաճառքին աջակցող տեքստերի կառուցում։"],
    ["Թիրախային լսարանը", "Հաճախորդի լսարանի նկարագրում և գովազդային թիրախավորման հիմունքներ։"],
    ["FB Business էջը", "Facebook Business էջի ստեղծում և կառավարման հիմնական հնարավորությունները։"],
    ["Meta Business Suite", "Meta-ի գործիքների միջավայրի և էջերի կառավարման հետ աշխատանք։"],
    ["Ads Manager գովազդի ուղեցույցը 0-ից", "Ads Manager-ի կառուցվածքը և գովազդային արշավի ստեղծման քայլերը։"],
    ["CV / Portfolio գրագետ կազմում", "Աշխատանքների ներկայացում, CV և SMM մասնագետի պորտֆոլիոյի ձևավորում։"],
  ];

  const FAQ = [
    ["Որքա՞ն է տևում դասընթացը։", "Ծրագիրը ներառում է 15 դաս և ավարտական քննություն։ Օրացուցային տևողությունը կհաստատվի խմբի մեկնարկի ամսաթվի հետ միասին։"],
    ["Ի՞նչ ժամերի են անցկացվելու դասերը։", "Ժամերը դեռ հաստատված չեն։ Հայտի ձևում կարող եք նշել նախընտրելի ժամերը, իսկ թիմը կհաստատի խմբի ժամանակացույցը։"],
    ["Հնարավո՞ր է վճարել մաս-մաս։", "Վճարման պայմանները կհրապարակվեն դասընթացի արժեքի հաստատման հետ միասին։"],
    ["Տրվո՞ւմ է ավարտական սերտիֆիկատ։", "Սերտիֆիկատի տրամադրման պայմանները կհաստատվեն կազմակերպիչների կողմից և կհաղորդվեն մինչև գրանցումը։"],
    ["Պե՞տք է նախնական փորձ ունենալ։", "Ծրագիրը սկսվում է SMM-ի և մարքեթինգի հիմունքներից։ Նախնական պահանջների վերջնական մանրամասները ճշտեք հայտով։"],
  ];

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

  const enhanceIcons = (root = document) => {
    if (window.lucide) window.lucide.createIcons({ root });
  };

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 })
    : null;

  const observeReveal = (root = document) => {
    root.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add("is-visible");
    });
  };

  const page = document.body.dataset.page || "home";
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) link.setAttribute("aria-current", "page");
  });

  const menuButton = document.querySelector("[data-menu-button]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const setMobileMenu = (open) => {
    if (!menuButton || !mobileMenu) return;
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.inert = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Փակել մենյուն" : "Բացել մենյուն");
  };
  menuButton?.addEventListener("click", () => setMobileMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMobileMenu(false);
      menuButton.focus();
    }
  });

  const lessonGrid = document.querySelector("[data-lessons]");
  if (lessonGrid) {
    LESSONS.forEach(([title, description], index) => {
      const card = document.createElement("article");
      card.className = `glass-card card-hover lesson-card tilt-card reveal${index === 14 ? " is-exam" : ""}`;
      card.innerHTML = `
        <span class="lesson-number">${String(index + 1).padStart(2, "0")}</span>
        <h3 class="lesson-title">${escapeHtml(title)}</h3>
        <button class="lesson-toggle" type="button" aria-expanded="false" aria-controls="lesson-description-${index + 1}">ԲԱՑԵԼ ԹԵՄԱՆ <span aria-hidden="true">+</span></button>
        <p class="lesson-detail" id="lesson-description-${index + 1}" hidden>${escapeHtml(description)}</p>
      `;
      const toggle = card.querySelector(".lesson-toggle");
      const detail = card.querySelector(".lesson-detail");
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.innerHTML = `${expanded ? "ՓԱԿԵԼ ԹԵՄԱՆ" : "ԲԱՑԵԼ ԹԵՄԱՆ"} <span aria-hidden="true">${expanded ? "−" : "+"}</span>`;
        detail.hidden = !expanded;
      });
      lessonGrid.appendChild(card);
    });

    const exam = document.createElement("article");
    exam.className = "glass-card card-hover lesson-card tilt-card is-exam reveal";
    exam.innerHTML = `
      <span class="lesson-number">★</span>
      <p class="eyebrow" style="margin:.9rem 0 .35rem">FINAL STEP</p>
      <h3 class="lesson-title">🏆 ՔՆՆՈՒԹՅՈՒՆ</h3>
      <p class="lesson-detail">Դասընթացի ընթացքում ստացած գիտելիքների ամփոփում և կիրառություն։</p>
    `;
    lessonGrid.appendChild(exam);
  }

  const teamGrid = document.querySelector("[data-team]");
  if (teamGrid) {
    const roles = [
      { tag: "MENTORSHIP", title: "SMM մենթորներ", description: "Ռազմավարություն, բրիֆ, SMART նպատակներ և բովանդակության պլան։", icon: "target" },
      { tag: "MEDIA BUYING", title: "Մեդիա բայերներ", description: "Meta Business Suite, Ads Manager և վճարովի արշավներ։", icon: "chart-no-axes-combined" },
      { tag: "CREATIVE", title: "Կոնտենտ ստեղծողներ", description: "Սցենարներ, վիզուալներ և սոցիալական հարթակների բովանդակություն։", icon: "camera" },
    ];
    roles.forEach((role) => {
      const card = document.createElement("article");
      card.className = "glass-card card-hover team-card tilt-card reveal";
      card.innerHTML = `
        <div class="team-icon"><i data-lucide="${escapeHtml(role.icon)}"></i></div>
        <p class="eyebrow" style="margin-top:1.5rem">${escapeHtml(role.tag)}</p>
        <h3 class="text-xl font-black">${escapeHtml(role.title)}</h3>
        <p class="muted text-sm leading-7">${escapeHtml(role.description)}</p>
        <p class="muted text-xs">Անունները և կենսագրությունները կհրապարակվեն հաստատումից հետո։</p>
      `;
      teamGrid.appendChild(card);
    });
  }

  const statsRoot = document.querySelector("[data-stats]");
  if (statsRoot) {
    const stats = [
      ["activeClients", "ԱԿՏԻՎ ՀԱՃԱԽՈՐԴՆԵՐ"],
      ["mediaBudget", "ԿԱՌԱՎԱՐՎԱԾ ԳՈՎԱԶԴԱՅԻՆ ԲՅՈՒՋԵ"],
      ["studentsGraduated", "ԱՎԱՐՏԱԾ ՈՒՍԱՆՈՂՆԵՐ"],
    ];
    stats.forEach(([key, label]) => {
      const card = document.createElement("article");
      card.className = "glass-card stat-card reveal";
      const value = CONFIG.stats[key];
      const display = typeof value === "number" && Number.isFinite(value) && value >= 0 ? value.toLocaleString() : "—";
      card.innerHTML = `<p class="muted text-xs font-extrabold tracking-widest">${escapeHtml(label)}</p><p class="stat-value" data-counter="${escapeHtml(key)}">${display}</p><p class="muted text-xs">Կհրապարակվի միայն հաստատված տվյալը։</p>`;
      statsRoot.appendChild(card);
    });
  }

  document.querySelectorAll("[data-counter]").forEach((node) => {
    const value = CONFIG.stats[node.dataset.counter];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value.toLocaleString();
      return;
    }
    const counterObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      const start = performance.now();
      const duration = 1100;
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        node.textContent = Math.round(value * (1 - (1 - progress) ** 3)).toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
        else observer.disconnect();
      };
      requestAnimationFrame(animate);
    }, { threshold: .5 });
    counterObserver.observe(node);
  });

  const caseGrid = document.querySelector("[data-cases]");
  if (caseGrid) {
    const renderCases = (filter = "all") => {
      caseGrid.replaceChildren();
      CONFIG.caseStudies.filter((item) => filter === "all" || item.category === filter).forEach((item) => {
        const card = document.createElement("article");
        card.className = "glass-card card-hover case-card tilt-card reveal";
        const metrics = ["Reach", "Engagement", "ROAS"];
        card.innerHTML = `
          <div class="case-cover"><span class="case-cover-label">${escapeHtml(item.category.toUpperCase())} · CASE STUDY TEMPLATE</span></div>
          <div class="case-body">
            <h2 class="text-xl font-black">${escapeHtml(item.title)}</h2>
            <p class="muted mt-2 text-sm leading-7">${escapeHtml(item.description)}</p>
            <p class="eyebrow mt-5 mb-2">BEFORE / AFTER</p>
            <div class="case-results">
              ${metrics.map((metric) => `
                <div class="result-cell">
                  <span class="muted text-[10px] font-bold">${escapeHtml(metric)}</span>
                  <strong>${escapeHtml(item.results?.before?.[metric.toLowerCase()] ?? "—")} <span class="muted">→</span> ${escapeHtml(item.results?.after?.[metric.toLowerCase()] ?? "—")}</strong>
                </div>
              `).join("")}
            </div>
            <p class="muted mt-3 text-[10px] leading-5">Հաճախորդի անունն ու արդյունքները ավելացրեք միայն հրապարակման թույլտվությունից և տվյալների ստուգումից հետո։</p>
          </div>
        `;
        caseGrid.appendChild(card);
      });
      observeReveal(caseGrid);
      attachTilt(caseGrid);
    };
    renderCases();
    document.querySelectorAll("[data-case-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-case-filter]").forEach((item) => item.classList.toggle("active", item === button));
        renderCases(button.dataset.caseFilter);
      });
    });
  }

  const faqRoot = document.querySelector("[data-faq]");
  if (faqRoot) {
    FAQ.forEach(([question, answer], index) => {
      const row = document.createElement("article");
      row.className = "faq-row reveal";
      row.innerHTML = `
        <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
          <span>${escapeHtml(question)}</span><i data-lucide="plus" aria-hidden="true"></i>
        </button>
        <p class="faq-answer" id="faq-answer-${index}" hidden>${escapeHtml(answer)}</p>
      `;
      const button = row.querySelector("button");
      const answerNode = row.querySelector(".faq-answer");
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") !== "true";
        button.setAttribute("aria-expanded", String(expanded));
        answerNode.hidden = !expanded;
        const icon = button.querySelector("[data-lucide]");
        icon.dataset.lucide = expanded ? "minus" : "plus";
        enhanceIcons(row);
      });
      faqRoot.appendChild(row);
    });
  }

  const reviewsRoot = document.querySelector("[data-reviews]");
  if (reviewsRoot) {
    if (CONFIG.testimonials.length) {
      CONFIG.testimonials.forEach((review) => {
        const card = document.createElement("article");
        card.className = "glass-card review-card reveal";
        const rating = Math.max(0, Math.min(5, Math.floor(Number(review.rating) || 0)));
        card.innerHTML = `<p class="review-stars" aria-label="${rating} աստղ">${"★".repeat(rating)}</p><blockquote class="mt-3 text-sm leading-7 text-white/75">“${escapeHtml(review.text)}”</blockquote><p class="accent mt-4 text-xs font-extrabold">${escapeHtml(review.name)}</p>${review.portfolioUrl && review.portfolioUrl.startsWith("https://") ? `<a class="muted mt-3 inline-block text-xs underline" href="${escapeHtml(review.portfolioUrl)}" target="_blank" rel="noopener noreferrer">ԴԻՏԵԼ ՊՈՐՏՖՈԼԻՈՆ</a>` : ""}`;
        reviewsRoot.appendChild(card);
      });
    } else {
      reviewsRoot.innerHTML = `<div class="glass-card review-card reveal"><p class="eyebrow">STUDENT VOICES</p><h2 class="text-xl font-black">Կարծիքները կհրապարակվեն համաձայնությամբ</h2><p class="muted mt-3 text-sm leading-7">Ուսանողների իրական գնահատականներն ու պորտֆոլիոյի հղումները կավելացվեն համապատասխան թույլտվությամբ։</p></div>`;
    }
  }

  const contactRoots = document.querySelectorAll("[data-contact-links]");
  if (contactRoot) {
    const contacts = [
      CONFIG.contactEmail ? { label: "EMAIL", value: CONFIG.contactEmail, href: `mailto:${CONFIG.contactEmail}`, icon: "mail" } : null,
      CONFIG.contactPhone ? { label: "PHONE", value: CONFIG.contactPhone, href: `tel:${CONFIG.contactPhone.replace(/[^\d+]/g, "")}`, icon: "phone" } : null,
      ...CONFIG.socialLinks.filter((item) => typeof item.url === "string" && item.url.startsWith("https://")).map((item) => ({ label: item.name, value: item.name, href: item.url, icon: item.icon || "external-link" })),
    ].filter(Boolean);
    contactRoots.forEach((contactRoot) => {
      if (!contacts.length) {
        const placeholder = document.createElement("p");
        placeholder.className = "muted text-sm leading-7";
        placeholder.textContent = "Պաշտոնական հեռախոսահամարը, էլ․ հասցեն և սոցիալական հղումները դեռ կարգավորված չեն։ Թողեք հայտ, և կապի տվյալները կարող են ավելացվել կայքի կարգավորումներում։";
        contactRoot.appendChild(placeholder);
        return;
      }
      contacts.forEach((item) => {
        const link = document.createElement("a");
        link.className = "social-link";
        link.href = item.href;
        link.setAttribute("aria-label", item.label);
        if (item.href.startsWith("https://")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.classList.add("w-auto", "rounded-xl", "px-3", "gap-2");
        }
        link.innerHTML = `<i data-lucide="${escapeHtml(item.icon)}"></i><span class="text-xs font-bold">${escapeHtml(item.value)}</span>`;
        contactRoot.appendChild(link);
      });
    });
  }

  const seatNode = document.querySelector("[data-seats]");
  if (seatNode) seatNode.textContent = Number.isInteger(CONFIG.seatsRemaining) && CONFIG.seatsRemaining >= 0
    ? `Մնացել է ընդամենը ${CONFIG.seatsRemaining} տեղ`
    : "Տեղերի հասանելի քանակը կհաստատվի թիմի հետ։";

  const mapFrame = document.querySelector("[data-map-frame]");
  if (mapFrame && CONFIG.mapEmbedUrl.startsWith("https://")) {
    mapFrame.src = CONFIG.mapEmbedUrl;
    mapFrame.hidden = false;
    document.querySelector("[data-map-placeholder]")?.setAttribute("hidden", "");
  }

  const countdown = document.querySelector("[data-countdown]");
  const renderCountdown = () => {
    if (!countdown) return false;
    const deadline = CONFIG.enrollmentDeadline ? new Date(CONFIG.enrollmentDeadline).getTime() : NaN;
    if (!Number.isFinite(deadline) || deadline <= Date.now()) {
      countdown.textContent = "Մեկնարկի ամսաթիվը կհայտարարվի շուտով";
      return false;
    }
    let seconds = Math.floor((deadline - Date.now()) / 1000);
    const values = [
      [Math.floor(seconds / 86400), "ՕՐ"],
      [Math.floor((seconds % 86400) / 3600), "ԺԱՄ"],
      [Math.floor((seconds % 3600) / 60), "ՐՈՊԵ"],
      [seconds % 60, "ՎԱՅՐԿ"],
    ];
    countdown.replaceChildren();
    values.forEach(([value, label]) => {
      const unit = document.createElement("div");
      unit.className = "time-unit";
      unit.innerHTML = `<strong>${String(value).padStart(2, "0")}</strong><span>${label}</span>`;
      countdown.appendChild(unit);
    });
    return true;
  };
  if (renderCountdown()) window.setInterval(renderCountdown, 1000);

  const form = document.querySelector("[data-registration-form]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    status.className = "status-message";
    status.textContent = "";
    if (!form.reportValidity()) return;

    const phone = form.elements.namedItem("phone");
    const digits = phone.value.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      phone.setCustomValidity("Մուտքագրեք 8-15 թվանշան պարունակող հեռախոսահամար։");
      phone.reportValidity();
      phone.addEventListener("input", () => phone.setCustomValidity(""), { once: true });
      return;
    }

    if (!CONFIG.formEndpoint) {
      status.classList.add("notice");
      status.textContent = "Ձևը ստուգված է, բայց ուղարկման հասցեն միացված չէ։ Կարգավորեք CONFIG.formEndpoint-ը site.js-ում։";
      return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "ՈՒՂԱՐԿՎՈՒՄ Է…";
    try {
      const response = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`Registration request failed: ${response.status}`);
      form.reset();
      status.classList.add("success");
      status.textContent = "Շնորհակալություն։ Հայտը հաջողությամբ ուղարկվեց։";
    } catch (error) {
      console.error(error);
      status.classList.add("error");
      status.textContent = "Հայտը չհաջողվեց ուղարկել։ Խնդրում ենք կրկին փորձել ավելի ուշ։";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "ՈՒՂԱՐԿԵԼ ՀԱՅՏ";
    }
  });

  const attachTilt = (root = document) => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.querySelectorAll(".tilt-card:not([data-tilt-ready])").forEach((card) => {
      card.dataset.tiltReady = "true";
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(850px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 7}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  };
  attachTilt();

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (finePointer && !reducedMotion) {
    let pendingFrame = 0;
    document.addEventListener("pointermove", (event) => {
      if (pendingFrame) cancelAnimationFrame(pendingFrame);
      pendingFrame = requestAnimationFrame(() => {
        document.body.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.body.style.setProperty("--pointer-y", `${event.clientY}px`);
        pendingFrame = 0;
      });
    }, { passive: true });
  }

  document.querySelectorAll("[data-parallax]").forEach((element) => {
    if (reducedMotion) return;
    const updateParallax = () => {
      const offset = (window.scrollY - element.offsetTop) * Number(element.dataset.parallax || 0.08);
      element.style.transform = `translate3d(0, ${Math.max(-32, Math.min(32, offset))}px, 0)`;
    };
    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();
  });

  const typewriter = document.querySelector("[data-typewriter]");
  if (typewriter) {
    const text = typewriter.dataset.typewriter;
    if (reducedMotion) typewriter.textContent = text;
    else {
      typewriter.textContent = "";
      let index = 0;
      const typeNext = () => {
        typewriter.textContent = Array.from(text).slice(0, index).join("");
        index += 1;
        if (index <= Array.from(text).length) window.setTimeout(typeNext, 38);
      };
      typeNext();
    }
  }

  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
  observeReveal();
  enhanceIcons();
})();
