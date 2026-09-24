/* ===========================================================
   The First Academy — Student Gateway · APP LOGIC
   Filters, cards, passport (XP + certificate), EN/AR switch.
   Activity data lives in data.js.
   =========================================================== */

/* ---------- Safe localStorage ---------- */
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};

/* ---------- Vocabulary ---------- */
const INTERESTS = [
  { k:"ai",     e:"🤖", c:"#8B3FE0", en:"AI",               ar:"الذكاء الاصطناعي" },
  { k:"code",   e:"💻", c:"#2F6FEB", en:"Coding",           ar:"البرمجة" },
  { k:"math",   e:"➗", c:"#E0671B", en:"Maths & logic",    ar:"الرياضيات والمنطق" },
  { k:"sci",    e:"🧪", c:"#0E9F6E", en:"Science & space",  ar:"العلوم والفضاء" },
  { k:"art",    e:"🎨", c:"#E0457B", en:"Art, design & music", ar:"الفن والتصميم والموسيقى" },
  { k:"lang",   e:"📖", c:"#C28A00", en:"Languages & learning", ar:"اللغات والتعلّم" },
  { k:"safe",   e:"🛡️", c:"#0F8B8D", en:"Online safety",    ar:"الأمان الرقمي" },
  { k:"build",  e:"🔧", c:"#5B6B8C", en:"Robots & electronics", ar:"الروبوتات والإلكترونيات" },
  { k:"career", e:"🚀", c:"#0D2C6B", en:"Future & careers", ar:"المستقبل والمهن" }
];
const TYPES = [
  { k:"all",    en:"All",        ar:"الكل" },
  { k:"game",   en:"🎮 Games",   ar:"🎮 ألعاب" },
  { k:"create", en:"🛠️ Create",  ar:"🛠️ اصنع" },
  { k:"puzzle", en:"🧩 Puzzles", ar:"🧩 ألغاز" },
  { k:"course", en:"🎓 Courses", ar:"🎓 دورات" }
];
const TIMES = [
  { k:"all",   en:"Any time",  ar:"أي مدة" },
  { k:"quick", en:"⏱️ ≤ 20 min", ar:"⏱️ ≤ ٢٠ دقيقة" },
  { k:"hour",  en:"🕐 ~1 hour", ar:"🕐 ساعة تقريباً" },
  { k:"long",  en:"📆 Longer",  ar:"📆 أطول" }
];
const LEVELS = [
  { xp:0,   e:"🌱", en:"Explorer",    ar:"مستكشف" },
  { xp:50,  e:"🛠️", en:"Builder",     ar:"باني" },
  { xp:120, e:"💡", en:"Innovator",   ar:"مبتكر" },
  { xp:220, e:"🚀", en:"Trailblazer", ar:"رائد" },
  { xp:350, e:"🏆", en:"Legend",      ar:"أسطورة" }
];

const I18N = {
  en: {
    skip:"Skip to content", taglineBadge:"Building Brave Tomorrow",
    navExplore:"Explore", navCerts:"Grade 12 certificates", navPassport:"My passport", navRules:"Free-time rules",
    heroEyebrow:"✅ Class tasks done?",
    heroTitle:'Turn your free time into <span class="accent">real skills</span>.',
    heroDesc:"Hand-picked games, AI adventures and certificate courses — matched to your grade, your interests and the time you have.",
    heroCta1:"Find my activity 🚀", heroCta2:"🎲 Surprise me",
    statAll:"activities", statAI:"Hour of AI picks", statCert:"with certificates",
    exploreTitle:"Find something worth your time", exploreDesc:"Pick your grade, tap what you're into, and we'll do the rest.",
    stepGrade:"My grade", stepInterest:"I'm into…", pickMany:"(pick any)", stepMore:"Fine-tune",
    fCert:"🏅 Certificate only", fHoai:"✨ Hour of AI only", fEasy:"⚡ No login / webcam needed",
    searchPh:"Search: Python, Minecraft, space…", reset:"↺ Reset", surprise:"🎲 Surprise me",
    empty:"Nothing matches all of that. Try removing a filter.",
    allGrades:"All", grade:"Grade",
    results:(n)=>`<b>${n}</b> ${n===1?"activity":"activities"} for you`,
    open:"Play ↗", done:"Done", markDone:"Mark as done", save:"Save",
    tagHoai:"Hour of AI", tagCert:"Certificate",
    need:{ webcam:"📷 Webcam", account:"🔑 Free account", download:"⬇️ Download" },
    time:{ quick:"≤ 20 min", hour:"~1 hour", long:"Several sessions" },
    type:{ game:"Game", create:"Create", puzzle:"Puzzle", course:"Course" },
    gr:(a,b)=> a===b ? `Grade ${a}` : `Grades ${a}–${b}`,
    certPill:"Grade 11 – 12", certTitle:"Earn certificates that open doors",
    certDesc:"Free courses from Harvard, Cisco, Kaggle, IBM and the University of Helsinki. Follow a pathway, finish the steps, and add real certificates to your university applications and CV.",
    certNote:"Tip: create accounts with your school email, and ask your teacher before signing up for anything that asks for payment.",
    step:"Step", stepsDone:(a,b)=>`${a} of ${b} done`, allCertCourses:"All certificate courses",
    passTitle:"My learning passport",
    passDesc:"Tap “Done” on any activity you finish. Collect XP, level up, and print your Gateway certificate to show your teacher.",
    doneLbl:"done", savedLbl:"saved", certLbl:"certificates",
    makeCert:"🎓 My Gateway certificate", yourName:"Your full name", yourGrade:"Grade & section",
    printCert:"🖨️ Preview & print",
    certLocked:(n)=>`Finish ${n} more ${n===1?"activity":"activities"} to unlock your certificate.`,
    certReady:"Unlocked! Type your name and print it for your teacher to sign.",
    needName:"Please type your name first ✍️",
    doneList:"✅ Completed", savedList:"❤️ Saved for later",
    noneDone:"Nothing yet — pick an activity above!", noneSaved:"Tap ♡ on a card to save it here.",
    xpTo:(x,n)=>`${x} XP · ${n} XP to next level`, xpMax:(x)=>`${x} XP · max level!`,
    toastDone:(xp)=>`Nice work! +${xp} XP 🎉`, toastLevel:(l)=>`Level up! You're now a ${l} 🏆`,
    toastSaved:"Saved to your passport ❤️", toastSurprise:"Try this one! 🎲",
    certBody:"has completed the following learning activities on The First Academy Student Gateway during free time:",
    certGrade:(g)=> g ? `Grade ${g}` : "",
    print:"🖨️ Print / Save as PDF", close:"Close",
    rulesTitle:"Free-time rules", rulesDesc:"Every link here was checked by the ICT team. Keep it that way.",
    r1t:"Class work first", r1b:"The Gateway is for when your class tasks are finished — not instead of them.",
    r2t:"Ask your teacher", r2b:"Check with the teacher in the room before you start, especially for webcam activities.",
    r3t:"Use your school login", r3b:"Sign up only with your school email. Never share passwords or personal details.",
    r4t:"Report anything odd", r4b:"If a page shows ads, chat with strangers or anything unsafe, close it and tell a teacher.",
    credit:'Many AI activities come from the <a href="https://csforall.org/en-US/activities/hour-of-ai" target="_blank" rel="noopener">CSforAll Hour of AI</a> library. All activities are free to start; a few certificates need a fee.',
    footerAboutTitle:"The First Academy",
    footerAboutBody:"A student gateway pointing learners toward safe, meaningful, grade-appropriate activities for their free time.",
    footerLinksTitle:"Quick links", footerMainSite:"Main school website", footerContactTitle:"Contact",
    footerContactDept:"ICT Department", footerContactLoc:"Ajman, United Arab Emirates",
    motto1:"RESPECT", motto2:"BELONG", motto3:"ACHIEVE",
    footerCopy:'© <span class="year"></span> The First Academy · ICT Department'
  },
  ar: {
    skip:"الانتقال إلى المحتوى", taglineBadge:"نبني غداً شجاعاً",
    navExplore:"استكشف", navCerts:"شهادات الصف الثاني عشر", navPassport:"جوازي", navRules:"قواعد وقت الفراغ",
    heroEyebrow:"✅ أنهيت مهام الحصة؟",
    heroTitle:'حوّل وقت فراغك إلى <span class="accent">مهارات حقيقية</span>.',
    heroDesc:"ألعاب مختارة بعناية، ومغامرات في الذكاء الاصطناعي، ودورات بشهادات — تناسب صفك واهتماماتك والوقت المتاح لك.",
    heroCta1:"اعثر على نشاطي 🚀", heroCta2:"🎲 فاجئني",
    statAll:"نشاطاً", statAI:"من ساعة الذكاء الاصطناعي", statCert:"بشهادات",
    exploreTitle:"اعثر على ما يستحق وقتك", exploreDesc:"اختر صفك، واضغط على ما يهمّك، ونحن نتكفّل بالباقي.",
    stepGrade:"صفّي", stepInterest:"أحب…", pickMany:"(اختر ما تشاء)", stepMore:"تخصيص",
    fCert:"🏅 بشهادة فقط", fHoai:"✨ ساعة الذكاء الاصطناعي فقط", fEasy:"⚡ بدون تسجيل أو كاميرا",
    searchPh:"ابحث: بايثون، ماينكرافت، الفضاء…", reset:"↺ إعادة ضبط", surprise:"🎲 فاجئني",
    empty:"لا يوجد ما يطابق كل ذلك. جرّب إزالة أحد الفلاتر.",
    allGrades:"الكل", grade:"الصف",
    results:(n)=>`<b>${n}</b> نشاطاً مناسباً لك`,
    open:"ابدأ ↗", done:"تم", markDone:"تم الإنجاز", save:"حفظ",
    tagHoai:"ساعة الذكاء الاصطناعي", tagCert:"شهادة",
    need:{ webcam:"📷 كاميرا", account:"🔑 حساب مجاني", download:"⬇️ تنزيل" },
    time:{ quick:"≤ ٢٠ دقيقة", hour:"ساعة تقريباً", long:"عدة جلسات" },
    type:{ game:"لعبة", create:"اصنع", puzzle:"لغز", course:"دورة" },
    gr:(a,b)=> a===b ? `الصف ${a}` : `الصفوف ${a}–${b}`,
    certPill:"الصف ١١ – ١٢", certTitle:"شهادات تفتح لك الأبواب",
    certDesc:"دورات مجانية من هارفارد وسيسكو وKaggle وIBM وجامعة هلسنكي. اتبع مساراً، وأكمل خطواته، وأضف شهادات حقيقية إلى طلبات الجامعة وسيرتك الذاتية.",
    certNote:"نصيحة: أنشئ حساباتك ببريدك المدرسي، واستشر معلمك قبل التسجيل في أي شيء يطلب دفعاً.",
    step:"الخطوة", stepsDone:(a,b)=>`أنجزت ${a} من ${b}`, allCertCourses:"جميع الدورات بشهادات",
    passTitle:"جواز التعلّم الخاص بي",
    passDesc:"اضغط «تم» على أي نشاط تنهيه. اجمع النقاط وارتقِ في المستويات واطبع شهادة البوابة لتعرضها على معلمك.",
    doneLbl:"منجز", savedLbl:"محفوظ", certLbl:"شهادات",
    makeCert:"🎓 شهادة البوابة الخاصة بي", yourName:"اسمك الكامل", yourGrade:"الصف والشعبة",
    printCert:"🖨️ معاينة وطباعة",
    certLocked:(n)=>`أنهِ ${n} نشاطاً إضافياً لفتح شهادتك.`,
    certReady:"تم فتح الشهادة! اكتب اسمك واطبعها ليوقّعها معلمك.",
    needName:"اكتب اسمك أولاً ✍️",
    doneList:"✅ المنجزة", savedList:"❤️ محفوظة لاحقاً",
    noneDone:"لا شيء بعد — اختر نشاطاً من الأعلى!", noneSaved:"اضغط ♡ على أي بطاقة لحفظها هنا.",
    xpTo:(x,n)=>`${x} نقطة · ${n} نقطة للمستوى التالي`, xpMax:(x)=>`${x} نقطة · أعلى مستوى!`,
    toastDone:(xp)=>`أحسنت! +${xp} نقطة 🎉`, toastLevel:(l)=>`ارتقيت! أنت الآن ${l} 🏆`,
    toastSaved:"حُفظ في جوازك ❤️", toastSurprise:"جرّب هذا! 🎲",
    certBody:"قد أتمّ أنشطة التعلّم التالية على بوابة طلاب الأكاديمية الأولى خلال وقت الفراغ:",
    certGrade:(g)=> g ? `الصف ${g}` : "",
    print:"🖨️ طباعة / حفظ PDF", close:"إغلاق",
    rulesTitle:"قواعد وقت الفراغ", rulesDesc:"كل رابط هنا راجعه فريق تقنية المعلومات. لنحافظ على ذلك.",
    r1t:"واجبات الحصة أولاً", r1b:"البوابة لما بعد إنهاء مهام الحصة — وليست بديلاً عنها.",
    r2t:"استأذن معلمك", r2b:"استشر المعلم الموجود قبل البدء، خاصة في الأنشطة التي تستخدم الكاميرا.",
    r3t:"استخدم حسابك المدرسي", r3b:"سجّل ببريدك المدرسي فقط. لا تشارك كلمات المرور أو بياناتك الشخصية.",
    r4t:"أبلغ عن أي شيء غريب", r4b:"إن ظهرت إعلانات أو دردشة مع غرباء أو أي شيء غير آمن، أغلق الصفحة وأخبر معلمك.",
    credit:'كثير من أنشطة الذكاء الاصطناعي من مكتبة <a href="https://csforall.org/en-US/activities/hour-of-ai" target="_blank" rel="noopener">ساعة الذكاء الاصطناعي من CSforAll</a>. جميع الأنشطة مجانية للبدء؛ وبعض الشهادات برسوم.',
    footerAboutTitle:"مدرسة الأكاديمية الأولى",
    footerAboutBody:"بوابة طلابية توجّه المتعلمين نحو أنشطة آمنة وهادفة ومناسبة لأعمارهم في أوقات فراغهم.",
    footerLinksTitle:"روابط سريعة", footerMainSite:"الموقع الرئيسي للمدرسة", footerContactTitle:"تواصل معنا",
    footerContactDept:"قسم تقنية المعلومات", footerContactLoc:"عجمان، الإمارات العربية المتحدة",
    motto1:"احترام", motto2:"انتماء", motto3:"إنجاز",
    footerCopy:'© <span class="year"></span> مدرسة الأكاديمية الأولى · قسم تقنية المعلومات'
  }
};

/* ---------- State ---------- */
const CERT_UNLOCK = 3;
const state = {
  lang:   store.get("fa-lang", "en"),
  grade:  store.get("fa-grade", "all"),
  interests: new Set(),
  type: "all", time: "all",
  cert: false, hoai: false, easy: false, q: "",
  done:  new Set(store.get("fa-done", [])),
  saved: new Set(store.get("fa-saved", []))
};
const byId = Object.fromEntries(ACTIVITIES.map(a => [a.id, a]));
state.done.forEach(id => { if(!byId[id]) state.done.delete(id); });
state.saved.forEach(id => { if(!byId[id]) state.saved.delete(id); });

const $ = (s) => document.querySelector(s);
const T = () => I18N[state.lang];
const interestOf = (k) => INTERESTS.find(x => x.k === k);

/* ---------- XP ---------- */
const xpFor = (a) => 10 + (a.cert ? 20 : 0) + (a.time === "long" ? 10 : 0);
const totalXP = () => [...state.done].reduce((s, id) => s + xpFor(byId[id]), 0);
function levelFor(xp){ let l = LEVELS[0]; LEVELS.forEach(x => { if (xp >= x.xp) l = x; }); return l; }

/* ---------- Static text ---------- */
function applyStaticText(){
  const d = T();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = d[el.dataset.i18n]; if (typeof v === "string") el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = d[el.dataset.i18nHtml]; if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const v = d[el.dataset.i18nPh]; if (typeof v === "string") el.placeholder = v;
  });
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());
  // "pickMany" lives inside stepInterest heading — re-add it
  const h = document.querySelector('[data-i18n="stepInterest"]');
  if (h) h.innerHTML = `${d.stepInterest} <small>${d.pickMany}</small>`;
}

/* ---------- Filter controls ---------- */
function renderGrades(){
  const d = T();
  const row = $("#gradeRow"); row.innerHTML = "";
  ["all",4,5,6,7,8,9,10,11,12].forEach(g => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip grade-chip" + (g === 12 ? " g12" : "");
    b.setAttribute("aria-pressed", String(state.grade === g));
    b.innerHTML = g === "all" ? d.allGrades : `<small>${d.grade}</small>${g}`;
    b.onclick = () => { state.grade = g; store.set("fa-grade", g); renderGrades(); renderCards(); };
    row.appendChild(b);
  });
}
function renderInterests(){
  const row = $("#interestRow"); row.innerHTML = "";
  INTERESTS.forEach(it => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "interest";
    b.style.setProperty("--c", it.c);
    b.setAttribute("aria-pressed", String(state.interests.has(it.k)));
    b.innerHTML = `<span class="i-emoji">${it.e}</span><span>${it[state.lang]}</span>`;
    b.onclick = () => {
      state.interests.has(it.k) ? state.interests.delete(it.k) : state.interests.add(it.k);
      renderInterests(); renderCards();
    };
    row.appendChild(b);
  });
}
function renderSeg(el, list, key){
  el.innerHTML = "";
  list.forEach(o => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-pressed", String(state[key] === o.k));
    b.textContent = o[state.lang];
    b.onclick = () => { state[key] = o.k; renderSeg(el, list, key); renderCards(); };
    el.appendChild(b);
  });
}

/* ---------- Filtering ---------- */
function matches(a){
  if (state.grade !== "all" && (state.grade < a.g[0] || state.grade > a.g[1])) return false;
  if (state.interests.size && !a.i.some(k => state.interests.has(k))) return false;
  if (state.type !== "all" && a.t !== state.type) return false;
  if (state.time !== "all" && a.time !== state.time) return false;
  if (state.cert && !a.cert) return false;
  if (state.hoai && !a.hoai) return false;
  if (state.easy && a.need) return false;
  if (state.q){
    const hay = (a.n + " " + a.p + " " + a.en + " " + a.ar + " " + a.i.map(k => interestOf(k).en + " " + interestOf(k).ar).join(" ")).toLowerCase();
    if (!state.q.split(/\s+/).every(w => hay.includes(w))) return false;
  }
  return true;
}
function score(a){
  let s = 0;
  if (state.interests.size) s += a.i.filter(k => state.interests.has(k)).length * 10;
  if (state.grade !== "all") s -= (a.g[1] - a.g[0]) * 0.3;    // tighter grade fit first
  if (state.done.has(a.id)) s -= 5;                           // new things first
  return s;
}
const filtered = () => ACTIVITIES.filter(matches)
  .map((a, idx) => ({ a, s: score(a), idx }))
  .sort((x, y) => y.s - x.s || x.idx - y.idx)
  .map(x => x.a);

/* ---------- Card ---------- */
function cover(a){
  const c = interestOf(a.i[0]).c;
  const src = a.img ? (a.img.startsWith("http") ? a.img : IMG + a.img) : "";
  return `<div class="cover" style="--c:${c}">
      <span class="cover-emoji" aria-hidden="true">${a.e}</span>
      ${src ? `<img src="${src}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    </div>`;
}
function card(a){
  const d = T();
  const done = state.done.has(a.id), saved = state.saved.has(a.id);
  const tags = [
    a.hoai ? `<span class="tag hoai">✨ ${d.tagHoai}</span>` : "",
    a.cert ? `<span class="tag cert">🏅 ${d.tagCert}</span>` : ""
  ].join("");
  const meta = [
    `🎓 ${d.gr(a.g[0], a.g[1])}`,
    `⏱️ ${d.time[a.time]}`,
    d.type[a.t],
    a.need ? d.need[a.need] : ""
  ].filter(Boolean).map(m => `<span>${m}</span>`).join("");
  const ints = a.i.map(k => { const it = interestOf(k); return `<span class="dot" style="--c:${it.c}" title="${it[state.lang]}">${it.e}</span>`; }).join("");
  return `<article class="card${done ? " is-done" : ""}" id="card-${a.id}" style="--c:${interestOf(a.i[0]).c}">
    ${cover(a)}
    <div class="card-tags">${tags}</div>
    <button type="button" class="heart${saved ? " on" : ""}" data-save="${a.id}" aria-pressed="${saved}" aria-label="${d.save}">${saved ? "♥" : "♡"}</button>
    <div class="card-body">
      <div class="card-ints">${ints}</div>
      <h3>${a.n}</h3>
      <p class="provider">${a.p}</p>
      <p class="desc">${a[state.lang]}</p>
      <div class="meta">${meta}</div>
    </div>
    <div class="card-actions">
      <a class="play" href="${a.u}" target="_blank" rel="noopener">${d.open}</a>
      <button type="button" class="done-btn" data-done="${a.id}" aria-pressed="${done}">${done ? "✔ " + d.done : "☐ " + d.markDone}</button>
    </div>
  </article>`;
}

function renderCards(){
  const list = filtered();
  $("#cardGrid").innerHTML = list.map(card).join("");
  $("#resultCount").innerHTML = T().results(list.length);
  $("#emptyState").hidden = list.length > 0;
}

/* ---------- Pathways ---------- */
function renderPaths(){
  const d = T();
  $("#pathGrid").innerHTML = PATHWAYS.map(p => {
    const doneN = p.steps.filter(id => state.done.has(id)).length;
    const pct = Math.round(doneN / p.steps.length * 100);
    const steps = p.steps.map((id, i) => {
      const a = byId[id]; const ok = state.done.has(id);
      return `<li class="${ok ? "ok" : ""}">
        <span class="s-num">${ok ? "✔" : i + 1}</span>
        <a href="${a.u}" target="_blank" rel="noopener"><b>${a.n}</b><small>${a.p}${a.cert ? " · 🏅" : ""}</small></a>
      </li>`;
    }).join("");
    return `<div class="path" style="--c:${p.color}">
      <div class="path-head"><span class="path-emoji">${p.e}</span><div><h3>${p.title[state.lang]}</h3><p>${p.desc[state.lang]}</p></div></div>
      <ol class="path-steps">${steps}</ol>
      <div class="path-progress"><div style="width:${pct}%"></div></div>
      <p class="path-count">${d.stepsDone(doneN, p.steps.length)}</p>
    </div>`;
  }).join("") + `<button type="button" class="path path-all" id="showCerts"><span class="path-emoji">🏅</span><h3>${d.allCertCourses} →</h3></button>`;
  $("#showCerts").onclick = () => {
    resetFilters(); state.cert = true; $("#fCert").checked = true;
    renderAllControls(); renderCards();
    $("#explore").scrollIntoView({ behavior:"smooth" });
  };
}

/* ---------- Passport ---------- */
function renderPassport(){
  const d = T();
  const xp = totalXP(), lvl = levelFor(xp);
  const next = LEVELS.find(l => l.xp > xp);
  $("#levelBadge").textContent = lvl.e;
  $("#levelName").textContent = lvl[state.lang];
  const base = lvl.xp, top = next ? next.xp : base || 1;
  $("#xpFill").style.width = next ? ((xp - base) / (top - base) * 100) + "%" : "100%";
  $("#xpText").textContent = next ? d.xpTo(xp, next.xp - xp) : d.xpMax(xp);
  $("#doneCount").textContent = state.done.size;
  $("#savedCount").textContent = state.saved.size;
  $("#certDoneCount").textContent = [...state.done].filter(id => byId[id].cert).length;
  $("#navCount").textContent = state.done.size;

  const li = (id) => { const a = byId[id]; return `<li><span>${a.e}</span><a href="${a.u}" target="_blank" rel="noopener">${a.n}</a><button type="button" data-remove="${id}" aria-label="remove">✕</button></li>`; };
  $("#doneList").innerHTML  = state.done.size  ? [...state.done].map(li).join("")  : `<li class="none">${d.noneDone}</li>`;
  $("#savedList").innerHTML = state.saved.size ? [...state.saved].map(id => li(id).replace("data-remove", "data-unsave")).join("") : `<li class="none">${d.noneSaved}</li>`;

  const left = CERT_UNLOCK - state.done.size;
  $("#btnCert").disabled = left > 0;
  $("#certHint").textContent = left > 0 ? d.certLocked(left) : d.certReady;
}

/* ---------- Actions ---------- */
function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2400);
}
function burst(x, y){
  const colors = ["#FFC845","#8B3FE0","#2F6FEB","#0E9F6E","#E0457B"];
  for (let i = 0; i < 18; i++){
    const s = document.createElement("span"); s.className = "confetti";
    s.style.left = x + "px"; s.style.top = y + "px";
    s.style.background = colors[i % colors.length];
    s.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
    s.style.setProperty("--dy", (Math.random() * -160 - 40) + "px");
    document.body.appendChild(s); setTimeout(() => s.remove(), 900);
  }
}
function toggleDone(id, ev){
  const before = levelFor(totalXP());
  if (state.done.has(id)) state.done.delete(id);
  else {
    state.done.add(id);
    if (ev) burst(ev.clientX, ev.clientY);
    const after = levelFor(totalXP());
    toast(after !== before ? T().toastLevel(after[state.lang]) : T().toastDone(xpFor(byId[id])));
  }
  store.set("fa-done", [...state.done]);
  renderCards(); renderPaths(); renderPassport();
}
function toggleSave(id){
  if (state.saved.has(id)) state.saved.delete(id); else { state.saved.add(id); toast(T().toastSaved); }
  store.set("fa-saved", [...state.saved]);
  renderCards(); renderPassport();
}
function surprise(){
  let pool = filtered().filter(a => !state.done.has(a.id));
  if (!pool.length) pool = filtered();
  if (!pool.length) { resetFilters(); renderAllControls(); renderCards(); pool = ACTIVITIES; }
  const a = pool[Math.floor(Math.random() * pool.length)];
  const el = document.getElementById("card-" + a.id);
  if (!el) return;
  el.scrollIntoView({ behavior:"smooth", block:"center" });
  el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse");
  toast(T().toastSurprise);
}
function resetFilters(){
  state.interests.clear(); state.type = "all"; state.time = "all";
  state.cert = state.hoai = state.easy = false; state.q = "";
  $("#fCert").checked = $("#fHoai").checked = $("#fEasy").checked = false;
  $("#fSearch").value = "";
}

/* ---------- Certificate ---------- */
function openCert(){
  const d = T();
  const name = $("#stName").value.trim();
  if (!name){ toast(d.needName); $("#stName").focus(); return; }
  const grade = $("#stGrade").value.trim();
  store.set("fa-name", name); store.set("fa-sgrade", grade);
  const xp = totalXP(), lvl = levelFor(xp);
  $("#certName").textContent = name;
  $("#certGradeLine").textContent = grade ? `${I18N.en.certGrade(grade)} · ${I18N.ar.certGrade(grade)}` : "";
  $("#certBody").innerHTML = `${I18N.en.certBody}<br><span dir="rtl">${I18N.ar.certBody}</span>`;
  $("#certList").innerHTML = [...state.done].map(id => {
    const a = byId[id]; return `<li>${a.e} ${a.n} <small>— ${a.p}${a.cert ? " 🏅" : ""}</small></li>`;
  }).join("");
  $("#certDate").textContent = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  $("#certLevel").innerHTML = `<span>${lvl.e}</span><b>${lvl.en} · ${lvl.ar}</b><small>${xp} XP</small>`;
  $("#certModal").hidden = false; document.body.classList.add("modal-open");
  $("#btnPrint").focus();
}
function closeCert(){ $("#certModal").hidden = true; document.body.classList.remove("modal-open"); }

/* ---------- Language ---------- */
function renderAllControls(){
  renderGrades(); renderInterests();
  renderSeg($("#typeRow"), TYPES, "type");
  renderSeg($("#timeRow"), TIMES, "time");
}
function setLang(lang){
  state.lang = lang; store.set("fa-lang", lang);
  const root = document.documentElement;
  root.lang = lang; root.classList.toggle("ar", lang === "ar");
  $("#btnEn").classList.toggle("active", lang === "en");
  $("#btnAr").classList.toggle("active", lang === "ar");
  applyStaticText(); renderAllControls(); renderCards(); renderPaths(); renderPassport();
}

/* ---------- Wire up ---------- */
document.addEventListener("click", (e) => {
  const d = e.target.closest("[data-done]");   if (d) return toggleDone(d.dataset.done, e);
  const s = e.target.closest("[data-save]");   if (s) return toggleSave(s.dataset.save);
  const r = e.target.closest("[data-remove]"); if (r) return toggleDone(r.dataset.remove);
  const u = e.target.closest("[data-unsave]"); if (u) return toggleSave(u.dataset.unsave);
});
$("#btnEn").onclick = () => setLang("en");
$("#btnAr").onclick = () => setLang("ar");
$("#fCert").onchange = (e) => { state.cert = e.target.checked; renderCards(); };
$("#fHoai").onchange = (e) => { state.hoai = e.target.checked; renderCards(); };
$("#fEasy").onchange = (e) => { state.easy = e.target.checked; renderCards(); };
let qTimer;
$("#fSearch").oninput = (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value.trim().toLowerCase(); renderCards(); }, 150); };
$("#btnReset").onclick = () => { resetFilters(); state.grade = "all"; store.set("fa-grade", "all"); renderAllControls(); renderCards(); };
$("#btnSurprise").onclick = surprise;
$("#heroSurprise").onclick = () => { $("#explore").scrollIntoView({ behavior:"smooth" }); setTimeout(surprise, 450); };
$("#btnCert").onclick = openCert;
$("#btnPrint").onclick = () => window.print();
$("#btnClose").onclick = closeCert;
$("#certModal").addEventListener("click", (e) => { if (e.target.id === "certModal") closeCert(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#certModal").hidden) closeCert(); });

/* ---------- Init ---------- */
$("#stName").value = store.get("fa-name", "");
$("#stGrade").value = store.get("fa-sgrade", "");
function countUp(el, n){
  const t0 = performance.now();
  const step = (t) => { const p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(n * p); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
countUp($("#statAll"), ACTIVITIES.length);
countUp($("#statAI"), ACTIVITIES.filter(a => a.hoai).length);
countUp($("#statCert"), ACTIVITIES.filter(a => a.cert).length);
setLang(state.lang);
