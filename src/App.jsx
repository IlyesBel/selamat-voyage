import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const WA = '60123456789';

const EXCURSIONS = [
  { id:1, name:'Via Ferrata', lieu:'Tioman', tags:['Aventure','Adrénaline'], image:'/images/via-ferrata-3.jpg', tested:true, slug:'via-ferrata' },
  { id:2, name:'Jetski', lieu:'Langkawi', tags:['Aventure','Plage'], image:'/images/jetski.jpg', tested:true, slug:'jetski' },
  { id:3, name:'Plongée Semporna', lieu:'Bornéo', tags:['Plongée','Vie sauvage'], image:'/images/semporna-1.jpg', tested:true, slug:'semporna' },
  { id:4, name:'Rivière Kinabatangan', lieu:'Bornéo', tags:['Nature','Vie sauvage'], image:'/images/kinabatangan-1.webp', tested:false, slug:'kinabatangan' },
  { id:5, name:'Croisière BBQ', lieu:'Langkawi', tags:['Détente','Gastronomie'], image:'/images/bbq-cruise-1.webp', tested:true, slug:'bbq-cruise' },
  { id:6, name:'Plantation de thé', lieu:'Cameron Highlands', tags:['Culture','Nature'], image:'/images/cameron-1.webp', tested:true, slug:'cameron-highlands' },
  { id:7, name:'Tour en Mangrove', lieu:'Langkawi', tags:['Nature','Vie sauvage'], image:'/images/mangrove-2.jpg', tested:true, slug:'mangrove-tour' },
  { id:8, name:'SkyCab + Sky Bridge', lieu:'Langkawi', tags:['Culture','Vue panoramique'], image:'/images/skycab-1.jpg', tested:true, slug:'skycab' },
  { id:9, name:"Sanctuaire d'éléphants", lieu:'Kuala Gandah', tags:['Vie sauvage','Famille'], image:'/images/elephant-1.jpg', tested:false, slug:'elephant-sanctuary' },
  { id:10, name:'Snorkeling', lieu:'Tioman', tags:['Plongée','Plage'], image:'/images/snorkeling-tioman-2.jpg', tested:true, slug:'snorkeling-tioman' },
  { id:11, name:'Flyboard', lieu:'Putrajaya', tags:['Aventure','Adrénaline'], image:'https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=600&q=80', tested:false },
];

const QUIZ = [
  { id:'duration', title:'Combien de temps durera votre aventure en Malaisie ?', icon:'lucide:calendar-days', multi:false, options:[
    { value:'3-5', label:'Un petit aperçu', desc:'3 à 5 jours', icon:'lucide:zap' },
    { value:'6-9', label:'Une bonne semaine', desc:'6 à 9 jours', icon:'lucide:tree-palm' },
    { value:'10-14', label:'Le grand voyage', desc:'10 à 14 jours', icon:'lucide:luggage' },
    { value:'15+', label:"L'expédition complète", desc:'15 jours et plus', icon:'lucide:globe' },
  ]},
  { id:'traveler', title:'Avec qui partez-vous ?', icon:'lucide:users', multi:false, options:[
    { value:'solo', label:'Solo', desc:'Juste moi et mon sac à dos', icon:'lucide:user' },
    { value:'couple', label:'En couple', desc:'Une aventure à deux', icon:'lucide:heart' },
    { value:'friends', label:'Entre amis', desc:'On part en crew', icon:'lucide:party-popper' },
    { value:'family', label:'En famille', desc:'Avec les kids', icon:'lucide:baby' },
  ]},
  { id:'mood', title:'Si votre voyage avait une vibe, ce serait…', icon:'lucide:sparkles', multi:false, options:[
    { value:'adventure', label:'Aventure & adrénaline', desc:'Jungle, trek, sensations', icon:'lucide:mountain' },
    { value:'culture', label:'Culture & découverte', desc:'Temples, histoire, rencontres', icon:'lucide:landmark' },
    { value:'relax', label:'Détente & plage', desc:'Farniente, eaux turquoises', icon:'lucide:umbrella' },
    { value:'mix', label:'Un mix de tout', desc:'Je veux tout goûter', icon:'lucide:shuffle' },
  ]},
  { id:'interests', title:"Qu'est-ce qui vous fait le plus rêver ?", subtitle:"Choisissez jusqu'à 3 centres d'intérêt", icon:'lucide:heart', multi:true, maxSelect:3, options:[
    { value:'beaches', label:'Plages paradisiaques', icon:'lucide:waves' },
    { value:'jungle', label:'Jungle & randonnée', icon:'lucide:trees' },
    { value:'temples', label:'Temples & histoire', icon:'lucide:landmark' },
    { value:'food', label:'Street food & gastronomie', icon:'lucide:utensils' },
    { value:'diving', label:'Plongée & snorkeling', icon:'lucide:fish' },
    { value:'wildlife', label:'Vie sauvage', icon:'lucide:bird' },
  ]},
  { id:'vibe', title:'Vous êtes plutôt…', icon:'lucide:map-pin', multi:false, options:[
    { value:'city', label:'Grande ville animée', desc:'Gratte-ciels, marchés de nuit', icon:'lucide:building-2' },
    { value:'village', label:'Petits villages authentiques', desc:"Slow life, chez l'habitant", icon:'lucide:home' },
    { value:'nature', label:'Nature sauvage', desc:'Le moins de béton possible', icon:'lucide:tree-pine' },
    { value:'mix', label:'Un peu des trois', desc:'Variez les plaisirs', icon:'lucide:shuffle' },
  ]},
];

const FAQ = [
  { q:'Est-ce que les excursions sont en français ?', a:"Oui ! Nous travaillons avec des guides francophones sur la plupart de nos excursions. Pour certaines activités, nous assurons un accompagnement bilingue français-anglais." },
  { q:"Comment ça marche si j'annule ?", a:"Nous offrons une flexibilité maximale. Les conditions varient selon l'excursion, mais nous faisons toujours au mieux pour un report ou remboursement. Contactez-nous sur WhatsApp." },
  { q:'Vous êtes basés où ?', a:"Nous sommes basés en Malaisie, entre Kuala Lumpur et Langkawi. Anciens étudiants ingénieurs ayant vécu 4 ans sur place, nous connaissons le terrain." },
  { q:"L'itinéraire est vraiment gratuit ?", a:"Absolument ! Le quiz et l'itinéraire personnalisé sont 100% gratuits et sans engagement." },
  { q:'Comment réserver une excursion ?', a:"Cliquez sur le bouton WhatsApp de l'excursion, envoyez-nous un message, et on s'occupe de tout. Pas de formulaire compliqué." },
];

const TOASTS_N = ['Sophie','Thomas','Léa','Antoine','Camille','Hugo','Emma','Lucas'];
const TOASTS_D = ['Langkawi','Semporna','Cameron Highlands','Tioman','Bornéo','Kuala Lumpur'];

export default function App() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [contact, setContact] = useState({ wa:'', email:'', ok:false });
  const [done, setDone] = useState(false);
  const [faq, setFaq] = useState(null);
  const [toast, setToast] = useState(null);
  const [menu, setMenu] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const qRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const n = TOASTS_N[Math.floor(Math.random()*TOASTS_N.length)];
      const d = TOASTS_D[Math.floor(Math.random()*TOASTS_D.length)];
      setToast(`${n} vient de recevoir son itinéraire pour ${d}`);
      setTimeout(() => setToast(null), 4000);
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  const goQuiz = () => qRef.current?.scrollIntoView({ behavior:'smooth', block:'start' });

  const pick = (qid, val, multi, max) => {
    if (multi) {
      const c = ans[qid] || [];
      if (c.includes(val)) setAns({...ans, [qid]: c.filter(v=>v!==val)});
      else if (c.length < max) setAns({...ans, [qid]: [...c, val]});
    } else {
      setAns({...ans, [qid]: val});
      setTimeout(() => setStep(s => s+1), 300);
    }
  };

  const submit = (e) => { e.preventDefault(); if(contact.wa && contact.ok) setDone(true); };
  const isSel = (qid,val) => { const a=ans[qid]; return Array.isArray(a)?a.includes(val):a===val; };

  const T = '#0D9488'; // teal-600
  const cream = '#FDF8F0';
  const creamDark = '#F5EDDF';

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] bg-white shadow-xl rounded-2xl px-5 py-3 flex items-center gap-3 border border-gray-100 max-w-sm" style={{animation:'slideIn .3s ease'}}>
          <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <iconify-icon icon="lucide:tree-palm" width="18" height="18" style={{color:'#0d9488'}}></iconify-icon>
          </div>
          <p className="text-sm text-gray-700 font-medium">{toast}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="Selamat Voyage" className="h-16 sm:h-24 lg:h-36" />
          </div>
          <div className={`hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5 border transition-all duration-500 ${navSolid ? 'bg-gray-100/80 border-gray-200' : 'bg-white/10 backdrop-blur-md border-white/20'}`}>
            <a href="#about" className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${navSolid ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>À propos</a>
            <a href="#excursions" className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${navSolid ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>Excursions</a>
            <a href="#story" className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${navSolid ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>Notre histoire</a>
            <a href="#faq" className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${navSolid ? 'text-gray-600 hover:text-teal-600 hover:bg-gray-100' : 'text-white/90 hover:text-white hover:bg-white/10'}`}>FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={goQuiz} className="hidden lg:flex bg-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors">Créer mon itinéraire</button>
            <button className="lg:hidden" onClick={()=>setMenu(!menu)}>
              <iconify-icon icon={menu?'lucide:x':'lucide:menu'} width="24" height="24" style={{color: navSolid ? '#374151' : '#fff'}}></iconify-icon>
            </button>
          </div>
        </div>
        {menu && (
          <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-6 space-y-4">
            <a href="#about" className="block text-sm font-medium text-gray-700" onClick={()=>setMenu(false)}>À propos</a>
            <a href="#excursions" className="block text-sm font-medium text-gray-700" onClick={()=>setMenu(false)}>Excursions</a>
            <a href="#story" className="block text-sm font-medium text-gray-700" onClick={()=>setMenu(false)}>Notre histoire</a>
            <a href="#faq" className="block text-sm font-medium text-gray-700" onClick={()=>setMenu(false)}>FAQ</a>
            <button onClick={()=>{setMenu(false);goQuiz();}} className="w-full bg-teal-500 text-white px-6 py-3 rounded-full text-sm font-semibold">Créer mon itinéraire</button>
          </div>
        )}
      </nav>

      {/* Hero — Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src="/images/hero.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Langkawi, Malaisie" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl tracking-tight font-bold text-white leading-tight mb-6">
            Explorons la<br />Malaisie ensemble
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Répondez à quelques questions, recevez votre itinéraire sur-mesure gratuitement. Nos experts sur place s'occupent du reste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={goQuiz} className="bg-teal-500 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-teal-400 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
              <iconify-icon icon="lucide:message-circle" width="18" height="18" style={{color:'#fff'}}></iconify-icon> Créer mon itinéraire
            </button>
            <a href="#excursions" className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/30 transition-colors w-full sm:w-auto text-center">Découvrir nos excursions</a>
          </div>
        </div>
      </section>

      {/* Photo Marquee — premium vertical scroll */}
      <section className="relative overflow-hidden h-[360px] sm:h-[440px] md:h-[540px]" style={{background:cream}}>
        {/* Fade edges */}
        <div className="absolute top-0 left-0 right-0 h-20 z-10" style={{background:`linear-gradient(to bottom, ${cream}, transparent)`}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 z-10" style={{background:`linear-gradient(to top, ${cream}, transparent)`}}></div>

        <div className="flex gap-4 px-4 h-full">
          {/* Column 1 — scrolls up */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex flex-col gap-4" style={{animation:'scrollUp 25s linear infinite'}}>
              {['/images/snorkeling-tioman.jpg','/images/bbq-cruise.webp','/images/mangrove-tour.jpg','/images/cameron-highlands.jpg','/images/jetski.jpg','/images/snorkeling-tioman.jpg','/images/bbq-cruise.webp','/images/mangrove-tour.jpg','/images/cameron-highlands.jpg','/images/jetski.jpg'].map((src,i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-64 shrink-0 relative group">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 — scrolls down */}
          <div className="flex-1 overflow-hidden relative hidden sm:block">
            <div className="flex flex-col gap-4" style={{animation:'scrollDown 30s linear infinite'}}>
              {['/images/semporna.jpg','/images/skycab.jpg','/images/via-ferrata.jpg','/images/elephant-sanctuary.jpg','/images/kinabatangan.webp','/images/semporna.jpg','/images/skycab.jpg','/images/via-ferrata.jpg','/images/elephant-sanctuary.jpg','/images/kinabatangan.webp'].map((src,i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-72 shrink-0 relative group">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 — scrolls up (slower) */}
          <div className="flex-1 overflow-hidden relative hidden md:block">
            <div className="flex flex-col gap-4" style={{animation:'scrollUp 35s linear infinite'}}>
              {['/images/hero.jpg','/images/mangrove-tour.jpg','/images/jetski.jpg','/images/bbq-cruise.webp','/images/skycab.jpg','/images/hero.jpg','/images/mangrove-tour.jpg','/images/jetski.jpg','/images/bbq-cruise.webp','/images/skycab.jpg'].map((src,i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-60 shrink-0 relative group">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4 — scrolls down (desktop only) */}
          <div className="flex-1 overflow-hidden relative hidden lg:block">
            <div className="flex flex-col gap-4" style={{animation:'scrollDown 28s linear infinite'}}>
              {['/images/cameron-highlands.jpg','/images/via-ferrata.jpg','/images/snorkeling-tioman.jpg','/images/semporna.jpg','/images/elephant-sanctuary.jpg','/images/cameron-highlands.jpg','/images/via-ferrata.jpg','/images/snorkeling-tioman.jpg','/images/semporna.jpg','/images/elephant-sanctuary.jpg'].map((src,i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-68 shrink-0 relative group" style={{height:'270px'}}>
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services / How it works — timeline */}
      <section className="py-28 px-6" style={{background:creamDark}}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">Comment ça marche</p>
            <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900">Trois étapes vers<br />votre voyage idéal.</h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-teal-200"></div>
            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {[
                { n:'01', title:'Répondez au quiz', desc:'5 questions sur vos envies — durée, style, intérêts. Ça prend 2 minutes.', icon:'lucide:message-circle' },
                { n:'02', title:'Recevez votre itinéraire', desc:'Un parcours sur-mesure, personnalisé selon vos réponses, envoyé sur WhatsApp.', icon:'lucide:map' },
                { n:'03', title:'On s\'occupe de tout', desc:'Réservations, guides, transport — vous n\'avez plus qu\'à profiter.', icon:'lucide:check-circle' },
              ].map((s,i) => (
                <div key={i} className="text-center relative">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative" style={{background:cream}}>
                    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                      <iconify-icon icon={s.icon} width="26" height="26" style={{color:'#fff'}}></iconify-icon>
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-teal-100 mb-2">{s.n}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz — Typeform-style full-screen split */}
      <section ref={qRef} id="quiz" className="relative min-h-screen">
        {!done ? (
          <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left — full-bleed photo */}
            <div className="hidden lg:block relative">
              <img
                key={step}
                src={['/images/hero.jpg','/images/snorkeling-tioman.jpg','/images/mangrove-tour.jpg','/images/semporna.jpg','/images/cameron-highlands.jpg','/images/bbq-cruise.webp'][step] || '/images/hero.jpg'}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-black/20"></div>
              {/* Floating summary of past answers */}
              {Object.keys(ans).length > 0 && step < QUIZ.length && (
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-5 space-y-2">
                    {QUIZ.map((q,qi) => {
                      const a = ans[q.id];
                      if (!a || (Array.isArray(a) && !a.length)) return null;
                      const labels = Array.isArray(a)
                        ? a.map(v => q.options.find(o=>o.value===v)?.label).filter(Boolean).join(', ')
                        : q.options.find(o=>o.value===a)?.label;
                      return (
                        <div key={qi} className="flex items-center gap-2">
                          <iconify-icon icon={q.icon} width="14" height="14" style={{color:'#5eead4'}}></iconify-icon>
                          <span className="text-white/80 text-xs font-medium truncate">{labels}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right — questions */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-12" style={{background:cream}}>
              {step < QUIZ.length ? (
                <div className="max-w-xl w-full">
                  {/* Top bar — back + step circles */}
                  <div className="flex items-center justify-between mb-14">
                    <div className="flex items-center gap-3">
                      {step > 0 ? (
                        <button onClick={()=>setStep(s=>s-1)} className="text-gray-400 hover:text-gray-700 transition-colors">
                          <iconify-icon icon="lucide:arrow-left" width="20" height="20" style={{color:'#9ca3af'}}></iconify-icon>
                        </button>
                      ) : <div className="w-5"></div>}
                      <span className="text-sm font-medium text-gray-400">Étape {step+1} sur {QUIZ.length}</span>
                    </div>
                    <div className="flex gap-2">
                      {QUIZ.map((_,i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i < step ? 'bg-teal-500' : i === step ? 'bg-teal-500 ring-4 ring-teal-500/20' : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-3">{QUIZ[step].title}</h3>
                  {QUIZ[step].subtitle && <p className="text-sm text-gray-400 mb-8">{QUIZ[step].subtitle}</p>}
                  {!QUIZ[step].subtitle && <div className="mb-8"></div>}

                  {/* Options — visual tiles grid */}
                  <div className={`grid gap-4 ${QUIZ[step].options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                    {QUIZ[step].options.map(opt => (
                      <button key={opt.value} onClick={()=>pick(QUIZ[step].id, opt.value, QUIZ[step].multi, QUIZ[step].maxSelect||3)}
                        className={`relative text-left p-5 rounded-2xl transition-all group ${isSel(QUIZ[step].id,opt.value) ? 'bg-teal-500 shadow-lg shadow-teal-500/20 scale-[1.02]' : 'bg-white shadow-sm hover:shadow-md hover:scale-[1.01]'}`}>
                        {isSel(QUIZ[step].id,opt.value) && (
                          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                            <iconify-icon icon="lucide:check" width="12" height="12" style={{color:'#fff'}}></iconify-icon>
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isSel(QUIZ[step].id,opt.value)?'bg-white/20':'bg-teal-50'}`}>
                          <iconify-icon icon={opt.icon} width="24" height="24" style={{color:isSel(QUIZ[step].id,opt.value)?'#fff':'#0d9488'}}></iconify-icon>
                        </div>
                        <div className={`font-bold text-sm mb-1 ${isSel(QUIZ[step].id,opt.value)?'text-white':'text-gray-900'}`}>{opt.label}</div>
                        {opt.desc && <div className={`text-xs leading-relaxed ${isSel(QUIZ[step].id,opt.value)?'text-white/70':'text-gray-400'}`}>{opt.desc}</div>}
                      </button>
                    ))}
                  </div>

                  {QUIZ[step].multi && (
                    <div className="mt-8">
                      <button onClick={()=>setStep(s=>s+1)} disabled={!(ans[QUIZ[step].id]||[]).length}
                        className="bg-teal-500 text-white px-10 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2">
                        Continuer <iconify-icon icon="lucide:arrow-right" width="16" height="16" style={{color:'#fff'}}></iconify-icon>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Contact form */
                <div className="max-w-xl w-full">
                  <div className="flex items-center justify-between mb-14">
                    <div className="flex items-center gap-3">
                      <button onClick={()=>setStep(s=>s-1)} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <iconify-icon icon="lucide:arrow-left" width="20" height="20" style={{color:'#9ca3af'}}></iconify-icon>
                      </button>
                      <span className="text-sm font-medium text-gray-400">Dernière étape</span>
                    </div>
                    <div className="flex gap-2">
                      {QUIZ.map((_,i) => <div key={i} className="w-3 h-3 rounded-full bg-teal-500"></div>)}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-2">Votre itinéraire est prêt !</h3>
                    <p className="text-sm text-gray-400">Entrez vos coordonnées pour le recevoir sur WhatsApp.</p>
                  </div>

                  <form onSubmit={submit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro WhatsApp *</label>
                      <input type="tel" required placeholder="+33 6 12 34 56 78" value={contact.wa} onChange={e=>setContact({...contact,wa:e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-gray-400 font-normal">(optionnel)</span></label>
                      <input type="email" placeholder="vous@email.com" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-base focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 shadow-sm" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer pt-2">
                      <input type="checkbox" checked={contact.ok} onChange={e=>setContact({...contact,ok:e.target.checked})} className="mt-0.5 w-4 h-4 accent-teal-500 rounded" />
                      <span className="text-sm text-gray-400 leading-relaxed">J'accepte que mes données soient utilisées pour recevoir mon itinéraire.</span>
                    </label>
                    <button type="submit" disabled={!contact.wa||!contact.ok}
                      className="bg-teal-500 text-white py-3.5 px-10 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2 mt-2">
                      <iconify-icon icon="simple-icons:whatsapp" width="16" height="16" style={{color:'#fff'}}></iconify-icon> Recevoir mon itinéraire
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Success — full-screen celebration */
          <div className="min-h-screen relative flex items-center justify-center">
            <img src="/images/skycab.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-teal-700/60"></div>
            <div className="relative z-10 text-center px-6">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 text-teal-600 shadow-xl">
                <iconify-icon icon="lucide:check" width="36" height="36" style={{color:'#0d9488'}}></iconify-icon>
              </div>
              <h3 className="text-4xl md:text-5xl tracking-tight font-bold text-white mb-4">Merci !</h3>
              <p className="text-lg text-white/80 max-w-lg mx-auto mb-10">Nous vous envoyons votre itinéraire personnalisé sur WhatsApp dans les prochaines minutes.</p>
              <a href="#about" className="bg-white text-teal-700 px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                Découvrir Selamat Voyage <iconify-icon icon="lucide:arrow-down" width="16" height="16" style={{color:'#0f766e'}}></iconify-icon>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Excursions — tilted photo strip */}
      <section id="excursions" className="pt-28 pb-16 overflow-hidden" style={{background:cream}}>
        <div className="max-w-6xl mx-auto px-6 mb-14">
          <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4 text-center">Nos excursions</p>
          <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900 text-center">Nos destinations populaires</h2>
        </div>
        <div className="relative py-8" style={{background:cream}}>
          <div className="flex gap-5 px-6" style={{animation:'scrollStrip 40s linear infinite', width:'max-content'}}>
            {[...EXCURSIONS, ...EXCURSIONS].map((ex,i) => {
              const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, 3, -2, 2];
              const rot = rotations[i % rotations.length];
              const Card = ({children, ...props}) => ex.slug
                ? <Link to={`/excursion/${ex.slug}`} {...props}>{children}</Link>
                : <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par l'excursion ${ex.name} !`)}`} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
              return (
                <Card key={i}
                  className="shrink-0 w-48 h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 relative group cursor-pointer bg-white p-1.5"
                  style={{transform:`rotate(${rot}deg)`}}>
                  <img src={ex.image} className="w-full h-full object-cover rounded-xl" alt={ex.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 m-1.5">
                    <div className="text-white text-xs font-semibold">{ex.name}</div>
                    <div className="text-white/70 text-xs">{ex.lieu}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About — editorial with overlapping images */}
      <section id="about" className="py-28 px-6" style={{background:cream}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">Pourquoi nous</p>
              <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900 mb-6 leading-tight">Des excursions<br />inoubliables.</h2>
              <p className="text-base text-gray-500 leading-relaxed mb-10">
                Chez Selamat Voyage, chaque excursion est une plongée dans la culture, la nature et les saveurs de la Malaisie. De nos guides locaux à nos itinéraires personnalisés, chaque détail compte.
              </p>
              <div className="flex gap-12">
                {[{n:'200+',l:'Voyageurs'},{n:'11',l:'Excursions'},{n:'4.9',l:'Avis Google'}].map((s,i) => (
                  <div key={i}>
                    <div className="w-8 h-1 bg-teal-500 rounded-full mb-3"></div>
                    <div className="text-3xl font-bold text-gray-900">{s.n}</div>
                    <div className="text-xs text-gray-400 font-medium mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Overlapping images */}
            <div className="relative h-[280px] sm:h-[360px] lg:h-[440px]">
              <div className="absolute top-0 right-0 w-[65%] h-[75%] rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <img src="/images/bbq-cruise.webp" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute bottom-0 left-0 w-[55%] h-[65%] rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border-4" style={{borderColor:cream}}>
                <img src="/images/skycab.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute top-6 left-6 bg-teal-500 text-white rounded-xl px-4 py-3 shadow-lg z-10">
                <div className="text-lg font-bold">4 ans</div>
                <div className="text-xs text-white/70">en Malaisie</div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon:'lucide:tree-palm', title:'Îles paradisiaques', desc:'Langkawi, Tioman, Perhentian — le paradis existe.' },
              { icon:'lucide:users', title:'Guides francophones', desc:'Un réseau de guides locaux qui parlent votre langue.' },
              { icon:'lucide:compass', title:'Sur-mesure', desc:'Chaque itinéraire est personnalisé selon vos envies.' },
              { icon:'lucide:message-circle', title:'Via WhatsApp', desc:'Un message suffit. On répond en quelques minutes.' },
            ].map((f,i) => (
              <div key={i} className="rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default" style={{background:creamDark}}>
                <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-5 shadow-md shadow-teal-500/20">
                  <iconify-icon icon={f.icon} width="20" height="20" style={{color:'#fff'}}></iconify-icon>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner — glassmorphism */}
      <section className="relative py-20 px-6">
        <img src="/images/cameron-highlands.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n:'200+', label:'Voyageurs heureux' },
                { n:'50+', label:'Excursions testées' },
                { n:'4.9', label:'Avis Google' },
                { n:'4 ans', label:'Basés en Malaisie' },
              ].map((s,i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-1">{s.n}</div>
                  <div className="text-sm text-white/60 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story — editorial split with staggered images */}
      <section id="story" className="py-28 px-6" style={{background:creamDark}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Staggered photos */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[480px]">
              <div className="absolute top-0 left-0 w-[60%] h-[70%] rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <img src="/images/snorkeling-tioman.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border-4" style={{borderColor:creamDark}}>
                <img src="/images/semporna.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-5 shadow-xl z-10 max-w-[200px]">
                <div className="text-2xl mb-1">🌴</div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium italic">"Le meilleur voyage commence par une bonne rencontre."</p>
              </div>
            </div>
            <div>
              <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">Notre histoire</p>
              <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 mb-6 leading-tight">On connaît le terrain,<br />pas juste les brochures.</h2>
              <div className="space-y-4 mb-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                  On est arrivés en Malaisie pour nos études d'ingénieur. 4 ans à explorer chaque recoin du pays, 50+ excursions testées, des dizaines de guides rencontrés.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  On a créé Selamat Voyage pour partager tout ça avec vous — sans les pièges à touristes.
                </p>
              </div>
              <div className="flex items-center gap-6 mb-8 p-5 rounded-2xl" style={{background:cream}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">50+</div>
                  <div className="text-[10px] text-gray-400 font-medium">Excursions testées</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">4 ans</div>
                  <div className="text-[10px] text-gray-400 font-medium">Sur le terrain</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">100%</div>
                  <div className="text-[10px] text-gray-400 font-medium">Francophone</div>
                </div>
              </div>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent('Bonjour, je souhaite en savoir plus sur Selamat Voyage !')}`} target="_blank" rel="noopener noreferrer"
                className="bg-teal-500 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors inline-flex items-center gap-2">
                <iconify-icon icon="simple-icons:whatsapp" width="16" height="16" style={{color:'#fff'}}></iconify-icon> Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — featured + grid */}
      <section className="py-28 px-6" style={{background:cream}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">Témoignages</p>
            <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900">Ce que disent<br />nos voyageurs.</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured large testimonial */}
            <div className="lg:col-span-3 bg-teal-500 rounded-3xl p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-4 right-6 text-[120px] font-bold text-white/10 leading-none select-none">"</div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_,j) => <iconify-icon key={j} icon="lucide:star" width="16" height="16" style={{color:'#fbbf24'}}></iconify-icon>)}
                </div>
                <p className="text-lg md:text-xl text-white leading-relaxed mb-8 font-medium">
                  "L'itinéraire était parfait pour notre couple. La croisière BBQ à Langkawi restera un de nos plus beaux souvenirs. Tout était fluide et magique."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=32" className="w-12 h-12 rounded-full object-cover border-2 border-white/30" alt="" />
                  <div>
                    <div className="font-bold text-white text-sm">Sophie M.</div>
                    <div className="text-xs text-white/60">Paris — Couple</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 2 smaller testimonials */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {[
                { name:'Antoine R.', from:'Lyon — Amis', text:"On est partis à 5 potes, 2 semaines. Chaque jour était une aventure. Et tout organisé en 3 messages WhatsApp !", img:'https://i.pravatar.cc/150?img=12' },
                { name:'Marie L.', from:'Bordeaux — Famille', text:"Voyage en famille avec 2 enfants. Le sanctuaire d'éléphants et le snorkeling à Tioman — les kids étaient fous de joie.", img:'https://i.pravatar.cc/150?img=26' },
              ].map((t,i) => (
                <div key={i} className="flex-1 rounded-2xl p-7 hover:shadow-md transition-all" style={{background:creamDark}}>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_,j) => <iconify-icon key={j} icon="lucide:star" width="12" height="12" style={{color:'#14b8a6'}}></iconify-icon>)}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} className="w-9 h-9 rounded-full object-cover" alt={t.name} />
                    <div>
                      <div className="font-semibold text-gray-900 text-xs">{t.name}</div>
                      <div className="text-[11px] text-gray-400">{t.from}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — numbered cards */}
      <section id="faq" className="py-28 px-6" style={{background:creamDark}}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-5xl tracking-tight font-bold text-gray-900">Questions fréquentes.</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item,i) => (
              <div key={i} className={`rounded-2xl transition-all duration-300 ${faq===i ? 'shadow-md' : ''}`} style={{background:cream}}>
                <button onClick={()=>setFaq(faq===i?null:i)} className="w-full flex items-center gap-4 p-5 text-left">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${faq===i?'bg-teal-500 text-white':'bg-teal-50 text-teal-600'}`}>
                    {String(i+1).padStart(2,'0')}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm flex-1">{item.q}</span>
                  <iconify-icon icon={faq===i?'lucide:minus':'lucide:plus'} width="18" height="18" style={{color:faq===i?'#0d9488':'#d1d5db'}}></iconify-icon>
                </button>
                {faq===i && <div className="px-5 pb-5 pl-[4.25rem] text-sm text-gray-500 leading-relaxed">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog section hidden for now */}

      {/* CTA Final — split photo + text */}
      <section className="overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[480px]">
          <div className="relative hidden lg:block">
            <img src="/images/hero.jpg" className="absolute inset-0 w-full h-full object-cover" alt="" />
          </div>
          <div className="flex flex-col justify-center px-10 md:px-20 py-20" style={{background:creamDark}}>
            <p className="text-teal-600 text-xs font-semibold tracking-widest uppercase mb-4">Commencer l'aventure</p>
            <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 mb-4 leading-snug">Prêt à découvrir<br />la Malaisie ?</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-sm leading-relaxed">Créez votre itinéraire personnalisé en 2 minutes. Gratuit, sans engagement.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={goQuiz} className="bg-teal-500 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-teal-400 transition-colors">Créer mon itinéraire</button>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                className="bg-white border border-gray-200 text-gray-700 px-7 py-3 rounded-full text-sm font-semibold hover:border-teal-300 transition-colors inline-flex items-center gap-2">
                <iconify-icon icon="simple-icons:whatsapp" width="16" height="16" style={{color:'#25d366'}}></iconify-icon> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — light & minimal */}
      <footer className="py-14 px-6 border-t border-gray-100" style={{background:cream}}>
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
            <div className="flex items-center">
              <img src="/images/logo.png" alt="Selamat Voyage" className="h-12" />
            </div>
            <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
              <a href="#about" className="hover:text-teal-600 transition-colors">À propos</a>
              <a href="#excursions" className="hover:text-teal-600 transition-colors">Excursions</a>
              <a href="#story" className="hover:text-teal-600 transition-colors">Notre histoire</a>
              <a href="#faq" className="hover:text-teal-600 transition-colors">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:instagram" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:tiktok" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-teal-50 transition-colors"><iconify-icon icon="simple-icons:whatsapp" width="14" height="14" style={{color:'#6b7280'}}></iconify-icon></a>
            </div>
          </div>
          {/* Bottom row */}
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; 2026 Selamat Voyage — Kuala Lumpur, Malaisie</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-gray-700 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-gray-700 transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
