const $ = (q, ctx=document) => ctx.querySelector(q);
const $$ = (q, ctx=document) => [...ctx.querySelectorAll(q)];

const services = {
  growth:{
    title:"Growth Partner Program™",
    price:"Starting at $6,000/mo",
    body:"Our primary offer and most complete partnership: strategy, content planning, production support, social management, reporting, optimization, funnels, automation support, and creative problem-solving across the business.",
    bullets:["Content plan + ideation","Production direction","Editing + creative assets","Posting + management","Community management","Reporting + optimization","Creative growth strategy"]
  },
  ai:{
    title:"AI Automation + Agents",
    price:"Starting at $1,500",
    body:"Custom AI systems for customer service, lead qualification, DM/comment automation, sales conversations when applicable, workflows, routing, and follow-up.",
    bullets:["Customer service AI agent","AI sales agent","DM automation","Comment response automation","Lead qualification","Call booking workflows","CRM/email/SMS integrations"]
  },
  content:{
    title:"Content + Ad Creation",
    price:"Starting at $1,500",
    body:"Done-for-you content for social, paid ads, websites, email, and sales assets. Once delivered, the client owns the content and can use it across their marketing.",
    bullets:["Human + AI content","Copywriting, video, photo","Content plan + ideation","Editing and final delivery","Remote filming guidance up to 3 sessions","Videographers/talent quoted separately"]
  },
  strategy:{
    title:"Strategy + Planning",
    price:"Starting at $500",
    body:"For brands that need sharper ideas, hooks, concepts, and a plan — while their internal team handles filming, editing, and posting.",
    bullets:["30-day content plans","3–6 month campaigns","Hooks and scripts","Creative direction","Offer/content alignment","Posting recommendations"]
  },
  social:{
    title:"Social Management",
    price:"Starting at $1,000/mo",
    body:"Consistent publishing, community management, and optimization so your brand stops disappearing between campaigns. AI DM/comment automation can be added as a one-time build starting at $500, with monthly maintenance included inside the social media management package.",
    bullets:["Posting and scheduling","DM/comment management","Engagement support","Monthly reporting","Social calendar maintenance","AI DM/comment automation add-on from $500","Automation maintenance included"]
  },
  visibility:{
    title:"Digital Visibility",
    price:"Starting at $500",
    body:"Show up where customers already search and make your business easier to find, trust, and contact.",
    bullets:["SEO","Google Maps","Google Business Profile","Local listings","Review strategy","Search-friendly content"]
  },
  funnels:{
    title:"Email, SMS + Sales Funnels",
    price:"Starting at $1,000",
    body:"Turn attention into relationships, repeat traffic, and revenue with emails, SMS, automations, and conversion-first sequences.",
    bullets:["Email campaigns","SMS campaigns","Sales funnels","Launch sequences","Abandoned cart flows","Lead magnets","Customer reactivation"]
  },
  web:{
    title:"Websites, Apps + CRM",
    price:"Book a call for quote",
    body:"Digital infrastructure for brands that need more than pretty pages — they need systems that move people to action.",
    bullets:["Website development","Landing pages","Mobile/web apps","Custom CRM builds","UX/UI direction","Conversion journeys"]
  },
  ads:{
    title:"Paid Ads Management",
    price:"Starting at $1,500/mo",
    body:"Paid ads management for brands ready to test, optimize, and scale. This is the management retainer only and does not include the ad budget.",
    bullets:["Meta ads","Google ads","TikTok ads","YouTube ads","Testing and optimization","Creative recommendations","Ad budget billed separately"]
  },
  audit:{
    title:"Full Brand Audit",
    price:"Starting at $997",
    body:"A full-business diagnostic that looks at the brand, website, content, offer, email, SEO, reviews, and customer journey together.",
    bullets:["Website audit","Social/content audit","Offer review","Email/funnel review","Google/reviews audit","Growth roadmap"]
  }
};

const display = $("#serviceDisplay");

function renderService(key){
  if(!display || !services[key]) return;
  const item = services[key];
  display.innerHTML = `
    <button class="service-close" type="button" aria-label="Close service details">×</button>
    <span class="service-price">${item.price}</span>
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <ul>${item.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>
    <a class="button black service-cta" href="#questionnaire">Get Started With This</a>
  `;

  const close = $(".service-close", display);
  if(close){
    close.addEventListener("click", () => {
      display.classList.remove("open");
      document.body.classList.remove("service-open");
    });
  }
}

function openService(key){
  const tab = $(`.service-tabs button[data-tab="${key}"]`);
  if(tab){
    $$(".service-tabs button").forEach(b=>b.classList.remove("active"));
    tab.classList.add("active");
  }
  renderService(key);

  if(display){
    display.classList.add("open");
  }

  if(window.innerWidth <= 980){
    document.body.classList.add("service-open");
  } else {
    document.body.classList.remove("service-open");
    display?.scrollIntoView({behavior:"smooth", block:"center"});
  }
}

if(display){
  renderService("growth");
}

$$(".service-tabs button").forEach(btn=>{
  btn.addEventListener("click",()=> openService(btn.dataset.tab));
});

$$(".offer-link").forEach(card=>{
  card.addEventListener("click",()=>{
    const key = card.dataset.serviceJump;
    const tab = $(`.service-tabs button[data-tab="${key}"]`);
    if(tab){
      openService(key);
      $("#services")?.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
  card.addEventListener("keydown",(e)=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      card.click();
    }
  });
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active");
      if(entry.target.classList.contains("num")) runCounters();
    }
  });
},{threshold:.16});

$$(".reveal,.num").forEach(el=>observer.observe(el));

let countersRan = false;
function runCounters(){
  if(countersRan) return;
  countersRan = true;
  $$(".counter").forEach(counter=>{
    const target = Number(counter.dataset.target || 0);
    let val = 0;
    const inc = Math.max(1, Math.floor(target/95));
    const timer = setInterval(()=>{
      val += inc;
      if(val >= target){ val = target; clearInterval(timer); }
      counter.textContent = val.toLocaleString();
    },16);
  });
}

$$(".check").forEach(ch=>{
  ch.addEventListener("change",()=>{
    const score = $("#score");
    if(score) score.textContent = $$(".check:checked").length * 20;
  });
});

const menu = $(".menu");
const links = $(".links");
if(menu && links){
  menu.addEventListener("click",()=> links.classList.toggle("open"));
  $$(".links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
}

window.addEventListener("scroll",()=>{
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  const progress = $(".progress");
  if(progress) progress.style.width = pct + "%";
});
