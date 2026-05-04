import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/24c72f00-d8df-40bc-9641-b48067dd6582.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Примеры", href: "#examples" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

const FEATURES = [
  {
    icon: "Bell",
    title: "Уведомления об оплате",
    desc: "Бот напоминает арендаторам о предстоящих платежах за 7, 3 и 1 день до срока. Никаких звонков — всё автоматически.",
  },
  {
    icon: "AlertTriangle",
    title: "Контроль задолженностей",
    desc: "Мгновенные уведомления при просрочке. Бот сам отправляет напоминания и ведёт историю переписки.",
  },
  {
    icon: "Calendar",
    title: "Важные даты",
    desc: "Окончание договора, плановый ремонт, страховка — бот помнит всё и предупреждает вовремя.",
  },
  {
    icon: "BarChart2",
    title: "Аналитика в реальном времени",
    desc: "Сводка по всем объектам одним сообщением. Кто заплатил, кто должен, сколько поступило за месяц.",
  },
  {
    icon: "MessageSquare",
    title: "Общение с арендаторами",
    desc: "Единый чат для всех договорённостей. Все сообщения сохраняются и доступны в любой момент.",
  },
  {
    icon: "Shield",
    title: "Безопасность данных",
    desc: "Ваши данные шифруются и хранятся надёжно. Доступ только у вас и авторизованных лиц.",
  },
];

const EXAMPLES = [
  {
    tag: "Уведомление об оплате",
    tagColor: "text-emerald-400",
    tagBg: "bg-emerald-400/10 border-emerald-400/20",
    title: "За 3 дня до срока",
    message: "💳 Привет, Александр! Напоминаю, что 7 мая нужно оплатить аренду квартиры на ул. Ленина, 42 — 35 000 ₽. Реквизиты: Сбер **** 1234.",
    time: "04 мая, 10:00",
  },
  {
    tag: "Просрочка",
    tagColor: "text-red-400",
    tagBg: "bg-red-400/10 border-red-400/20",
    title: "День просрочки",
    message: "⚠️ Оплата по договору №А-2024-15 просрочена на 1 день. Сумма задолженности: 28 000 ₽. Пожалуйста, погасите долг сегодня.",
    time: "01 мая, 09:00",
  },
  {
    tag: "Важная дата",
    tagColor: "text-blue-400",
    tagBg: "bg-blue-400/10 border-blue-400/20",
    title: "Договор истекает",
    message: "📋 Через 30 дней истекает договор аренды с Мариной К. (ул. Садовая, 8). Пора обсудить продление или поиск нового арендатора.",
    time: "03 мая, 12:00",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "990",
    period: "/ мес",
    desc: "Для владельца 1–3 объектов",
    features: [
      "До 3 объектов",
      "Уведомления об оплате",
      "Контроль задолженностей",
      "Telegram-бот",
      "Поддержка по email",
    ],
    cta: "Начать бесплатно",
    accent: false,
  },
  {
    name: "Бизнес",
    price: "2 490",
    period: "/ мес",
    desc: "Для портфеля 4–20 объектов",
    features: [
      "До 20 объектов",
      "Всё из тарифа Старт",
      "Аналитика и отчёты",
      "Напоминания важных дат",
      "Приоритетная поддержка",
      "Экспорт в Excel",
    ],
    cta: "Выбрать тариф",
    accent: true,
  },
  {
    name: "Про",
    price: "5 990",
    period: "/ мес",
    desc: "Для агентств и крупных портфелей",
    features: [
      "Неограниченные объекты",
      "Всё из тарифа Бизнес",
      "API интеграции",
      "Кастомные уведомления",
      "Личный менеджер",
      "White-label решение",
    ],
    cta: "Связаться",
    accent: false,
  },
];

const STATS = [
  { value: "1 200+", label: "Объектов под управлением" },
  { value: "98%", label: "Оплат вовремя" },
  { value: "3 мин", label: "Среднее время настройки" },
  { value: "24/7", label: "Работа бота" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "var(--dark-bg)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(5,13,26,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(57,255,126,0.08)" }}>
        <div className="flex items-center gap-2">
          <img src="https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/deb89c32-44f6-4e0a-be4a-951bc1964dc0.jpg" alt="RentCarBot logo" className="w-9 h-9 rounded-lg object-cover" style={{ border: "1px solid rgba(57,255,126,0.3)" }} />
          <span className="font-display text-lg font-bold tracking-wide">RentCar<span className="neon-text">Bot</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium tracking-wide">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contacts" className="neon-btn px-5 py-2 rounded-lg text-sm font-bold">
          Попробовать
        </a>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grid-bg pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-green), transparent)" }} />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-blue), transparent)" }} />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-up"
              style={{ background: "rgba(57,255,126,0.1)", border: "1px solid rgba(57,255,126,0.2)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "var(--neon-green)" }} />
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">RentCarBot — бот для управления арендой</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-none mb-6 animate-fade-up-delay-1">
              УМНОЕ<br />
              <span className="neon-text">УПРАВЛЕНИЕ</span><br />
              АРЕНДОЙ
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 animate-fade-up-delay-2 max-w-lg">
              Автоматические уведомления об оплатах, задолженностях и важных датах.
              Бот работает за вас — 24/7, без выходных.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
              <a href="https://t.me/rentbot" target="_blank" rel="noopener noreferrer"
                className="neon-btn px-7 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.316l-2.95-.924c-.641-.204-.654-.641.136-.953l11.52-4.44c.535-.194 1.003.13.376.249z"/></svg>
                Telegram-бот
              </a>
              <a href="https://max.ru/rentbot" target="_blank" rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #ff4f7b, #c026d3)", color: "#fff", boxShadow: "0 4px 24px rgba(255,79,123,0.35)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7h-2.25v5.25h-1.5V9H10.5V7.5h6V9zm-7.5 0H7.5v7.5H9V9z"/></svg>
                MAX-бот
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 animate-fade-up-delay-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl font-bold neon-text animate-counter-glow">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-float hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden neon-border border-2">
              <img src={HERO_IMAGE} alt="РентБот интерфейс" className="w-full h-auto" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,13,26,0.5), transparent)" }} />
            </div>

            <div className="absolute -left-16 top-1/4 glass-card rounded-xl p-3 notification-card"
              style={{ minWidth: 200 }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                  <Icon name="Bell" size={12} className="text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-400">Оплата получена</span>
              </div>
              <p className="text-xs text-gray-300">Квартира на Садовой — 35 000 ₽</p>
            </div>

            <div className="absolute -right-12 bottom-1/3 glass-card rounded-xl p-3 notification-card"
              style={{ minWidth: 190 }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-red-400/20 flex items-center justify-center">
                  <Icon name="AlertTriangle" size={12} className="text-red-400" />
                </div>
                <span className="text-xs font-semibold text-red-400">Просрочка 3 дня</span>
              </div>
              <p className="text-xs text-gray-300">Ленина 42 — 28 000 ₽</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Возможности</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              ВСЁ ПОД <span className="neon-text">КОНТРОЛЕМ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Бот берёт на себя рутину, чтобы вы занимались главным</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 cursor-default transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(57,255,126,0.15), rgba(79,142,255,0.15))", border: "1px solid rgba(57,255,126,0.2)" }}>
                  <Icon name={f.icon} fallback="Circle" size={22} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 tracking-wide">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="py-24 px-6 grid-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Примеры</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              КАК ЭТО <span className="neon-text">ВЫГЛЯДИТ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Реальные сообщения, которые получают ваши арендаторы</p>
          </div>

          <div className="flex gap-3 justify-center mb-10 flex-wrap">
            {EXAMPLES.map((ex, i) => (
              <button key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${i === activeTab ? "neon-border text-emerald-400" : "border-white/10 text-gray-400 hover:border-white/20"}`}>
                {ex.tag}
              </button>
            ))}
          </div>

          <div className="max-w-lg mx-auto relative" style={{ minHeight: 260 }}>
            {EXAMPLES.map((ex, i) => (
              <div key={i}
                className={`glass-card rounded-2xl p-8 transition-all duration-300 ${i === activeTab ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 border ${ex.tagBg} ${ex.tagColor}`}>
                  {ex.tag}
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{ex.title}</h3>
                <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-gray-300 text-sm leading-relaxed">{ex.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={13} className="text-gray-500" />
                  <span className="text-xs text-gray-500">Отправлено: {ex.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Тарифы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              ПРОСТЫЕ <span className="neon-text">ЦЕНЫ</span>
            </h2>
            <p className="text-gray-400 mt-4">Выберите подходящий план. Первые 14 дней — бесплатно.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i}
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.accent ? "neon-border border-2" : "glass-card"}`}
                style={plan.accent ? { background: "rgba(10,22,40,0.9)", boxShadow: "0 0 60px rgba(57,255,126,0.12)" } : {}}>
                {plan.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="neon-btn px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">Популярный</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-display text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className={`font-display text-5xl font-bold ${plan.accent ? "neon-text" : "text-white"}`}>{plan.price} ₽</span>
                  <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={16} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts"
                  className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 block ${plan.accent ? "neon-btn" : "border border-white/15 text-white hover:bg-white/5"}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 grid-bg">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              НАЧНЁМ <span className="neon-text">ВМЕСТЕ</span>
            </h2>
            <p className="text-gray-400 mt-4">Оставьте заявку — ответим в течение 15 минут</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              {/* Telegram */}
              <a href="https://t.me/rentbot_support" target="_blank" rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-blue-400/40 transition-all duration-200 block">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#60a5fa"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.316l-2.95-.924c-.641-.204-.654-.641.136-.953l11.52-4.44c.535-.194 1.003.13.376.249z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Telegram-бот</div>
                  <div className="text-white font-semibold mt-0.5">@rentbot_support</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-gray-600 ml-auto" />
              </a>

              {/* MAX */}
              <a href="https://max.ru/rentbot" target="_blank" rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 flex items-center gap-4 transition-all duration-200 block"
                style={{ borderColor: "rgba(192,38,211,0.2)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(192,38,211,0.12)", border: "1px solid rgba(192,38,211,0.25)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#d946ef"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7h-2.25v5.25h-1.5V9H10.5V7.5h6V9zm-7.5 0H7.5v7.5H9V9z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">MAX-бот <span className="text-fuchsia-500 text-xs">(российский мессенджер)</span></div>
                  <div className="text-white font-semibold mt-0.5">@rentbot_max</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-gray-600 ml-auto" />
              </a>

              {/* Phone */}
              <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(57,255,126,0.08)", border: "1px solid rgba(57,255,126,0.15)" }}>
                  <Icon name="Phone" fallback="Circle" size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Телефон</div>
                  <div className="text-white font-semibold mt-0.5">+7 (800) 123-45-67</div>
                </div>
              </div>

              {/* Email */}
              <div className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
                  <Icon name="Mail" fallback="Circle" size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Email</div>
                  <div className="text-white font-semibold mt-0.5">hello@rentbot.ru</div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(57,255,126,0.15)", border: "2px solid var(--neon-green)" }}>
                    <Icon name="Check" size={30} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400">Свяжемся с вами в ближайшие 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Комментарий</label>
                    <textarea
                      placeholder="Расскажите о ваших объектах..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <button type="submit" className="neon-btn w-full py-4 rounded-xl text-sm font-bold">
                    Отправить заявку →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(57,255,126,0.08)" }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/deb89c32-44f6-4e0a-be4a-951bc1964dc0.jpg" alt="RentCarBot logo" className="w-7 h-7 rounded-lg object-cover" style={{ border: "1px solid rgba(57,255,126,0.3)" }} />
            <span className="font-display font-bold tracking-wide">RentCar<span className="neon-text">Bot</span></span>
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
    </div>
  );
}