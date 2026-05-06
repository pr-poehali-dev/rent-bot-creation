import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/715f1726-02a6-4349-80e5-98478103e1a4.jpg";
const LOGO_IMAGE = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/deb89c32-44f6-4e0a-be4a-951bc1964dc0.jpg";
const VIDEO_PREVIEW = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/f656ebce-c9cf-4c41-af5a-a47683ad91c8.jpg";
const AVATAR_IVAN = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/8b95e1d1-5407-4597-b627-c3ebd2176c20.jpg";
const AVATAR_MARIA = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/4367ca78-7895-436d-9b24-a05eaa1089c5.jpg";
const AVATAR_TAXI = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/e3ab2945-2016-48e0-b900-adff146138e9.jpg";

const SEND_LEAD_URL = (func2url as Record<string, string>)["send-lead"];

const NAV_LINKS = [
  { label: "Возможности", href: "#features" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

const FEATURES = [
  { icon: "Bell", title: "Напоминания об оплате", desc: "За 7, 3 и 1 день до срока" },
  { icon: "AlertTriangle", title: "Контроль просрочек", desc: "Долги не копятся — бот пишет первым" },
  { icon: "Car", title: "Учёт каждого авто", desc: "Кто, до какого числа, по какой схеме" },
  { icon: "BarChart2", title: "Финансовая сводка", desc: "Кто заплатил, кто должен — одним сообщением" },
  { icon: "Calendar", title: "ОСАГО, ТО, договоры", desc: "Бот напомнит заранее" },
  { icon: "FileText", title: "Авто под выкуп", desc: "Учёт выплат и остатка по договору" },
];

const REVIEWS = [
  {
    avatar: AVATAR_IVAN,
    name: "Иван Соколов",
    role: "Автопарк, 8 машин · Москва",
    quote: "Тратил по 2 часа в день на обзвоны должников. Теперь — 15 минут в неделю. Бот напоминает сам, мне приходит только итог.",
  },
  {
    avatar: AVATAR_MARIA,
    name: "Мария Климова",
    role: "Аренда авто, 5 машин · СПб",
    quote: "Долги перестали копиться. Окупилось за 2 недели — раньше теряла по 30 тысяч в месяц на просрочках.",
  },
  {
    avatar: AVATAR_TAXI,
    name: "Артём Волков",
    role: "Таксопарк «Мегаполис» · 100+ машин",
    quote: "Внедрили на 100+ машин. Собираемость поднялась с 78% до 96%. Менеджер по платежам теперь занимается развитием.",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "990",
    period: "/ мес",
    desc: "Для 1–5 автомобилей",
    hint: "Окупается за счёт одной предотвращённой просрочки",
    features: [
      "До 5 автомобилей",
      "Напоминания об оплате (7/3/1 день)",
      "Контроль просрочек",
      "Telegram + МАКС боты",
      "Поддержка по email",
    ],
    cta: "Начать бесплатно",
    accent: false,
  },
  {
    name: "Бизнес",
    price: "2 490",
    period: "/ мес",
    desc: "Для автопарка 6–30 машин",
    features: [
      "До 30 автомобилей",
      "Всё из тарифа Старт",
      "Учёт договоров под выкуп",
      "ОСАГО, ТО, каско — напоминания",
      "Финансовая аналитика и экспорт",
    ],
    cta: "Выбрать тариф",
    accent: true,
  },
  {
    name: "Про",
    price: "5 990",
    period: "/ мес",
    desc: "Крупные автопарки от 30 машин",
    features: [
      "Неограниченный автопарк",
      "Всё из тарифа Бизнес",
      "Кастомные уведомления",
      "Личный менеджер",
      "White-label решение",
    ],
    cta: "Связаться",
    accent: false,
  },
];

const STATS = [
  { value: "3 500+", label: "Авто под управлением" },
  { value: "97%", label: "Оплат вовремя" },
  { value: "5 мин", label: "Настройка" },
  { value: "24/7", label: "Бот не спит" },
];

const TgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.316l-2.95-.924c-.641-.204-.654-.641.136-.953l11.52-4.44c.535-.194 1.003.13.376.249z" />
  </svg>
);

const MaxIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7h-2.25v5.25h-1.5V9H10.5V7.5h6V9zm-7.5 0H7.5v7.5H9V9z" />
  </svg>
);

async function postLead(payload: Record<string, string>) {
  const res = await fetch(SEND_LEAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("send failed");
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const [consultData, setConsultData] = useState({ name: "", contact: "", cars: "10–30" });
  const [consultSent, setConsultSent] = useState(false);
  const [consultSending, setConsultSending] = useState(false);

  const [carsCount, setCarsCount] = useState(5);
  const [avgLoss, setAvgLoss] = useState(5000);

  const calc = useMemo(() => {
    const PERCENT_DEBT_DEFAULT = 0.30;
    const BOT_EFFICIENCY = 0.80;
    const lossWithoutBot = Math.round(carsCount * avgLoss * PERCENT_DEBT_DEFAULT);
    const lossPrevented = Math.round(lossWithoutBot * BOT_EFFICIENCY);

    let planName = "Старт";
    let planPrice = 990;
    if (carsCount > 30) { planName = "Про"; planPrice = 5990; }
    else if (carsCount > 5) { planName = "Бизнес"; planPrice = 2490; }

    const savingsMonth = lossPrevented - planPrice;
    const savingsYear = savingsMonth * 12;
    const isLargeFleet = carsCount >= 30;
    const isNegative = savingsMonth < 0;

    let payback = "менее 1 дня";
    if (savingsMonth > 0) {
      const days = Math.max(1, Math.ceil((planPrice / lossPrevented) * 30));
      payback = days <= 1 ? "менее 1 дня" : `${days} ${days < 5 ? "дня" : "дней"}`;
    }

    return {
      lossWithoutBot,
      lossPrevented,
      planName,
      planPrice,
      savingsMonth,
      savingsYear,
      isLargeFleet,
      isNegative,
      payback,
    };
  }, [carsCount, avgLoss]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSending(true);
    try {
      await postLead({
        type: "lead",
        name: formData.name,
        contact: formData.phone,
        message: formData.message,
      });
      setSent(true);
    } catch {
      alert("Не удалось отправить. Напишите нам в Telegram @rentbot_support");
    } finally {
      setSending(false);
    }
  };

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultData.name || !consultData.contact) return;
    setConsultSending(true);
    try {
      await postLead({
        type: "consultation",
        name: consultData.name,
        contact: consultData.contact,
        cars: consultData.cars,
      });
      setConsultSent(true);
    } catch {
      alert("Не удалось отправить. Напишите нам в Telegram @rentbot_support");
    } finally {
      setConsultSending(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "var(--dark-bg)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between"
        style={{ background: "rgba(5,13,26,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(57,255,126,0.08)" }}>
        <div className="flex items-center gap-2.5">
          <img src={LOGO_IMAGE} alt="RentCarBot logo" className="w-9 h-9 rounded-xl object-cover" style={{ border: "1px solid rgba(57,255,126,0.3)" }} />
          <span className="font-display text-xl font-bold tracking-wide text-white">
            RentCar<span className="brand-text">Bot</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#video" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            <Icon name="Play" size={14} />
            Видео 1 мин
          </a>
          <a href="#contacts" className="brand-btn px-5 py-2.5 rounded-xl text-sm font-bold">
            Запустить бота
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-green), transparent)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-blue), transparent)" }} />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-up hero-badge">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">RentCarBot · бот для автопарков</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-5 animate-fade-up-delay-1 text-white">
              Бот, который <span className="neon-text">сам следит</span> за оплатой и долгами вашего автопарка
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-7 animate-fade-up-delay-2 max-w-lg">
              Экономит <span className="text-white font-semibold">15 часов в неделю</span>. Повышает собираемость до <span className="text-emerald-400 font-semibold">97%</span>.
            </p>

            <div className="animate-fade-up-delay-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contacts"
                  className="relative px-6 py-3.5 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)", color: "#050d1a", boxShadow: "0 4px 24px rgba(57,255,126,0.35)" }}>
                  <span className="absolute inset-0 rounded-xl animate-ping-slow" style={{ background: "rgba(57,255,126,0.2)" }} />
                  <span className="relative flex items-center gap-2">
                    <TgIcon />
                    Запустить бота
                  </span>
                </a>
                <a href="#video"
                  className="px-5 py-3.5 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                  <Icon name="Play" size={16} className="text-emerald-400" />
                  Смотреть демо
                </a>
              </div>
            </div>

            <ul className="space-y-2 animate-fade-up-delay-4">
              {[
                "Не нужно скачивать приложение",
                "Работает в Telegram и МАКС",
                "Первые 14 дней — бесплатно",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(57,255,126,0.15)", border: "1px solid rgba(57,255,126,0.35)" }}>
                    <Icon name="Check" size={12} className="text-emerald-400" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* TELEGRAM CHAT MOCKUP */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "#17212B", border: "1px solid rgba(57,255,126,0.2)", boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(57,255,126,0.12)" }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#17212B", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)" }}>
                  <Icon name="Car" size={20} className="text-slate-900" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">RentCarBot</div>
                  <div className="text-xs" style={{ color: "#7d8e98" }}>бот · в сети</div>
                </div>
                <Icon name="MoreVertical" size={18} style={{ color: "#7d8e98" }} />
              </div>

              {/* Chat area */}
              <div className="px-4 py-5 space-y-3" style={{ background: "linear-gradient(180deg, #0e1621 0%, #17212B 100%)", minHeight: 460 }}>
                {/* Date pill */}
                <div className="flex justify-center">
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#a8b8c4" }}>сегодня</span>
                </div>

                {/* Bot message — payment received */}
                <div className="flex">
                  <div className="rounded-2xl rounded-bl-md p-3 max-w-[85%]" style={{ background: "#182533" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span style={{ fontSize: 16 }}>✅</span>
                      <span className="text-xs font-semibold" style={{ color: "#39ff7e" }}>Оплата получена</span>
                    </div>
                    <div className="text-sm text-white leading-snug">
                      Toyota Camry <span style={{ color: "#7d8e98" }}>А123БВ</span><br />
                      Артём перевёл <b>15 000 ₽</b>
                    </div>
                    <div className="text-[10px] mt-1.5 text-right" style={{ color: "#7d8e98" }}>10:24</div>
                  </div>
                </div>

                {/* Bot message — overdue */}
                <div className="flex">
                  <div className="rounded-2xl rounded-bl-md p-3 max-w-[85%]" style={{ background: "#182533" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span style={{ fontSize: 16 }}>⚠️</span>
                      <span className="text-xs font-semibold" style={{ color: "#ff7b7b" }}>Просрочка 2 дня</span>
                    </div>
                    <div className="text-sm text-white leading-snug">
                      Kia Rio <span style={{ color: "#7d8e98" }}>А456СД</span><br />
                      Дмитрий — <b>9 000 ₽</b><br />
                      <span style={{ color: "#a8b8c4" }}>Я отправил ему напоминание</span>
                    </div>
                    <div className="text-[10px] mt-1.5 text-right" style={{ color: "#7d8e98" }}>10:31</div>
                  </div>
                </div>

                {/* Bot message — daily summary */}
                <div className="flex">
                  <div className="rounded-2xl rounded-bl-md p-3 max-w-[88%]" style={{ background: "#182533" }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span style={{ fontSize: 16 }}>📊</span>
                      <span className="text-xs font-semibold" style={{ color: "#5ab8ff" }}>Сводка за день</span>
                    </div>
                    <div className="text-sm text-white leading-snug space-y-0.5">
                      <div>Получено: <b style={{ color: "#39ff7e" }}>87 000 ₽</b></div>
                      <div>Должно прийти: <b>23 000 ₽</b></div>
                      <div>ОСАГО завтра: <b>1 авто</b></div>
                    </div>
                    <div className="text-[10px] mt-1.5 text-right" style={{ color: "#7d8e98" }}>21:00</div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#17212B", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <Icon name="Smile" size={20} style={{ color: "#7d8e98" }} />
                <div className="flex-1 px-3 py-1.5 rounded-full text-xs" style={{ background: "#242F3D", color: "#7d8e98" }}>Сообщение</div>
                <Icon name="Mic" size={20} style={{ color: "#7d8e98" }} />
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)", color: "#050d1a", boxShadow: "0 4px 16px rgba(57,255,126,0.4)" }}>
              реальный бот
            </div>
          </div>
        </div>

      </section>

      {/* STATS — отдельная секция-разделитель */}
      <section className="py-16 px-6 relative" style={{ backgroundColor: "var(--dark-card)", borderTop: "1px solid rgba(57,255,126,0.08)", borderBottom: "1px solid rgba(57,255,126,0.08)" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center ${i > 0 ? "md:border-l" : ""}`} style={i > 0 ? { borderColor: "rgba(255,255,255,0.06)" } : {}}>
                <div className="font-display text-3xl md:text-4xl font-bold stat-accent">{s.value}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS / SOCIAL PROOF */}
      <section id="reviews" className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              РЕАЛЬНЫЕ <span className="neon-text">ВЛАДЕЛЬЦЫ АВТОПАРКОВ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Без фейков — клиенты, которые согласились показать лицо</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {REVIEWS.map((r) => (
              <div key={r.name} className="light-card rounded-2xl p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover" style={{ border: "2px solid rgba(57,255,126,0.3)" }} />
                  <div>
                    <div className="font-semibold text-white">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icon key={i} name="Star" size={14} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">«{r.quote}»</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="https://t.me/rentbot_reviews" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              <TgIcon />
              Ещё 12 отзывов в Telegram-канале
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO DEMO */}
      <section id="video" className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Видео-демо</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              КАК ЭТО <span className="neon-text">РАБОТАЕТ</span>
            </h2>
            <p className="text-gray-400 mt-4">2 минуты — от хаоса в Excel до автоматического бота</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: "2px solid rgba(57,255,126,0.25)", boxShadow: "0 0 60px rgba(57,255,126,0.15)" }}>
            <img src={VIDEO_PREVIEW} alt="Видео-демо RentCarBot" className="w-full h-auto" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(180deg, rgba(5,13,26,0.3), rgba(5,13,26,0.6))" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)", boxShadow: "0 8px 32px rgba(57,255,126,0.5)" }}>
                <Icon name="Play" size={32} className="text-slate-900 ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
                Скоро
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
                2:00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Возможности</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              ВСЁ ПОД <span className="neon-text">КОНТРОЛЕМ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {FEATURES.map((f) => (
              <div key={f.title} className="light-card rounded-2xl p-5 flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(57,255,126,0.12), rgba(79,142,255,0.12))", border: "1px solid rgba(57,255,126,0.18)" }}>
                  <Icon name={f.icon} fallback="Circle" size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Калькулятор</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              ПОСЧИТАЙТЕ <span className="neon-text">ВЫГОДУ</span>
            </h2>
            <p className="text-gray-400 mt-4">Сколько денег вы теряете без бота — прямо сейчас</p>
          </div>

          <div className="light-card rounded-3xl p-8 md:p-10">
            <div className="space-y-6">
              <div>
                <label className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-300">Количество машин в парке</span>
                  <span className="font-display text-2xl font-bold neon-text">{carsCount}{carsCount >= 100 ? "+" : ""}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={carsCount}
                  onChange={(e) => setCarsCount(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span><span>10</span><span>30</span><span>100+</span>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-300">Средняя просрочка на одной машине в месяц</span>
                  <span className="font-display text-2xl font-bold neon-text">{avgLoss.toLocaleString("ru")} ₽</span>
                </label>
                <input
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={avgLoss}
                  onChange={(e) => setAvgLoss(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>500 ₽</span><span>5 000 ₽</span><span>10 000 ₽</span>
                </div>
              </div>

              <div className="rounded-2xl p-6 space-y-3" style={{ background: "rgba(57,255,126,0.05)", border: "1px solid rgba(57,255,126,0.2)" }}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">📉 Ваши потери без бота</span>
                  <span className="text-red-400 font-semibold">{calc.lossWithoutBot.toLocaleString("ru")} ₽/мес</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">🛡️ Бот предотвращает (80%)</span>
                  <span className="text-emerald-400 font-semibold">{calc.lossPrevented.toLocaleString("ru")} ₽/мес</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">💰 Стоимость тарифа «{calc.planName}»</span>
                  <span className="text-gray-300">{calc.planPrice.toLocaleString("ru")} ₽/мес</span>
                </div>

                <div className="border-t pt-4 space-y-2" style={{ borderColor: "rgba(57,255,126,0.2)" }}>
                  {calc.isNegative ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-semibold">😌 Экономия в месяц</span>
                        <span className="font-display text-2xl font-bold text-yellow-400">{calc.savingsMonth.toLocaleString("ru")} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Окупаемость</span>
                        <span className="text-yellow-400">Не окупается</span>
                      </div>
                      <div className="rounded-xl p-3 mt-3" style={{ background: "rgba(255,200,80,0.07)", border: "1px solid rgba(255,200,80,0.2)" }}>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          <b className="text-yellow-400">💡 Наша рекомендация:</b> при таком парке и низких просрочках бот может не окупаться. Но вы можете протестировать его <b className="text-emerald-400">14 дней бесплатно</b> — часто скрытых просрочек больше, чем кажется.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 font-semibold">✅ Экономия в месяц</span>
                        <span className="font-display text-2xl font-bold neon-text">+{calc.savingsMonth.toLocaleString("ru")} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">В год</span>
                        <span className="text-emerald-400 font-semibold">+{calc.savingsYear.toLocaleString("ru")} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Окупаемость</span>
                        <span className="text-gray-300">{calc.payback}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-3 flex items-center justify-between text-sm" style={{ borderColor: "rgba(57,255,126,0.2)" }}>
                  <span className="text-gray-400">➕ Рекомендуем тариф</span>
                  <span className="font-semibold text-white">{calc.planName}</span>
                </div>
              </div>

              {calc.isLargeFleet ? (
                <div className="space-y-3">
                  <div className="rounded-xl p-4 text-sm text-gray-300 leading-relaxed" style={{ background: "rgba(79,142,255,0.08)", border: "1px solid rgba(79,142,255,0.25)" }}>
                    Для парков от 30 машин у нас <b className="text-white">специальные условия</b>. Оставьте заявку — подготовим предложение за 1 час.
                  </div>
                  <a href="#consultation" className="brand-btn block w-full py-4 rounded-xl text-center text-base font-bold">
                    Получить персональное предложение →
                  </a>
                </div>
              ) : (
                <a href="#contacts" className="brand-btn block w-full py-4 rounded-xl text-center text-base font-bold">
                  {calc.isNegative ? "Всё равно попробовать 14 дней" : "Запустить бота на 14 дней бесплатно"}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Тарифы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              ПРОСТЫЕ <span className="neon-text">ЦЕНЫ</span>
            </h2>
            <p className="text-gray-400 mt-4">Первые 14 дней — бесплатно. Без карты.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.accent ? "" : "light-card"}`}
                style={plan.accent ? {
                  background: "var(--dark-card)",
                  border: "2px solid rgba(57,255,126,0.4)",
                  boxShadow: "0 0 60px rgba(57,255,126,0.12)"
                } : {}}>
                {plan.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="brand-btn px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      Популярный
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-1 text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                  {plan.hint && (
                    <p className="text-xs text-emerald-400 mt-2 leading-snug">💡 {plan.hint}</p>
                  )}
                </div>
                <div className="mb-8">
                  <span className={`font-display text-5xl font-bold ${plan.accent ? "neon-text" : "text-white"}`}>{plan.price} ₽</span>
                  <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(57,255,126,0.15)", border: "1px solid rgba(57,255,126,0.3)" }}>
                        <Icon name="Check" size={11} className="text-emerald-400" />
                      </div>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts"
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 block ${plan.accent ? "brand-btn" : ""}`}
                  style={!plan.accent ? { border: "1px solid rgba(255,255,255,0.15)", color: "white" } : {}}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="inline-flex items-center gap-2 text-sm text-gray-300 px-5 py-3 rounded-full"
              style={{ background: "rgba(57,255,126,0.07)", border: "1px solid rgba(57,255,126,0.2)" }}>
              <Icon name="ShieldCheck" fallback="Check" size={16} className="text-emerald-400" />
              Все тарифы включают <b className="text-white">14 дней бесплатно</b>. Карту не требуем.
            </p>
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section id="consultation" className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="light-card rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Для крупных автопарков</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                ОТ 10 МАШИН — <span className="neon-text">ПОМОЖЕМ С ВНЕДРЕНИЕМ</span>
              </h2>
              <p className="text-gray-400 mt-4">Ответим на вопросы за 15 минут. Бесплатно, без обязательств.</p>
            </div>

            {consultSent ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(57,255,126,0.15)", border: "2px solid rgba(57,255,126,0.5)" }}>
                  <Icon name="Check" size={30} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 text-white">Спасибо!</h3>
                <p className="text-gray-400">Свяжемся с вами в течение 15 минут</p>
              </div>
            ) : (
              <form onSubmit={handleConsult} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={consultData.name}
                    onChange={(e) => setConsultData({ ...consultData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  />
                  <input
                    type="text"
                    placeholder="Телефон или Telegram"
                    required
                    value={consultData.contact}
                    onChange={(e) => setConsultData({ ...consultData, contact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                  />
                </div>
                <select
                  value={consultData.cars}
                  onChange={(e) => setConsultData({ ...consultData, cars: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
                  <option value="10–30" style={{ background: "#0e1621" }}>10–30 машин</option>
                  <option value="30–100" style={{ background: "#0e1621" }}>30–100 машин</option>
                  <option value="100+" style={{ background: "#0e1621" }}>Более 100 машин</option>
                </select>
                <button type="submit" disabled={consultSending} className="brand-btn w-full py-4 rounded-xl text-sm font-bold disabled:opacity-60">
                  {consultSending ? "Отправляем…" : "Записаться на консультацию"}
                </button>
                <p className="text-center text-xs text-gray-500">
                  Или напишите в Telegram: <a href="https://t.me/rentbot_support" className="text-emerald-400 hover:underline">@rentbot_support</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              НАЧНЁМ <span className="neon-text">ВМЕСТЕ</span>
            </h2>
            <p className="text-gray-400 mt-4">Оставьте заявку — ответим в течение 15 минут</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              <a href="https://t.me/rentbot_support" target="_blank" rel="noopener noreferrer"
                className="light-card rounded-2xl p-5 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #229ED9, #1a7cbf)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Telegram-бот</div>
                  <div className="text-white font-semibold">@rentbot_support</div>
                </div>
                <Icon name="ArrowUpRight" size={18} className="text-gray-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              <a href="https://max.ru/rentbot" target="_blank" rel="noopener noreferrer"
                className="light-card rounded-2xl p-5 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #e8445a, #a21caf)" }}>
                  <svg width="22" height="22" viewBox="0 0 36 36" fill="white">
                    <path d="M18 2C9.163 2 2 9.163 2 18s7.163 16 16 16 16-7.163 16-16S26.837 2 18 2zm6 22h-3.5v-7.5H15.5V24H12V10h3.5v7h5V10H24v14z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">МАКС-бот <span className="text-fuchsia-400">· RU мессенджер</span></div>
                  <div className="text-white font-semibold">@rentbot_max</div>
                </div>
                <Icon name="ArrowUpRight" size={18} className="text-gray-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              </a>

              <div className="light-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
                  <Icon name="Phone" fallback="Circle" size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Телефон</div>
                  <div className="text-white font-semibold">+7 (800) 123-45-67</div>
                </div>
              </div>

              <div className="light-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}>
                  <Icon name="Mail" fallback="Circle" size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 font-medium mb-0.5">Email</div>
                  <div className="text-white font-semibold">realty22@mail.ru</div>
                </div>
              </div>
            </div>

            <div className="light-card rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(57,255,126,0.15)", border: "2px solid rgba(57,255,126,0.5)" }}>
                    <Icon name="Check" size={30} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">Заявка отправлена!</h3>
                  <p className="text-gray-400">Свяжемся с вами в ближайшие 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Ваше имя</label>
                    <input type="text" placeholder="Иван Петров" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Телефон или Telegram</label>
                    <input type="text" placeholder="+7 (___) ___-__-__ или @username" required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Комментарий</label>
                    <textarea placeholder="Сколько у вас авто? Как сдаёте — посуточно или помесячно?" rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }} />
                  </div>
                  <button type="submit" disabled={sending} className="brand-btn w-full py-4 rounded-xl text-sm font-bold disabled:opacity-60">
                    {sending ? "Отправляем…" : "Отправить заявку →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 pb-24 md:pb-8" style={{ borderTop: "1px solid rgba(57,255,126,0.08)", backgroundColor: "var(--dark-card)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_IMAGE} alt="RentCarBot logo" className="w-7 h-7 rounded-lg object-cover" style={{ border: "1px solid rgba(57,255,126,0.3)" }} />
            <span className="font-display font-bold tracking-wide text-white">
              RentCar<span className="neon-text">Bot</span>
            </span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 RentCarBot. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* MOBILE FLOATING CTA */}
      <a href="#contacts"
        className="fixed-cta md:hidden fixed bottom-4 left-4 right-4 z-40 py-4 rounded-full text-center font-bold text-base flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)", color: "#050d1a", boxShadow: "0 8px 32px rgba(57,255,126,0.45)" }}>
        <Icon name="Rocket" size={18} />
        Запустить бота · 14 дней бесплатно
      </a>
    </div>
  );
}