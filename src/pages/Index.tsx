import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/24c72f00-d8df-40bc-9641-b48067dd6582.jpg";
const LOGO_IMAGE = "https://cdn.poehali.dev/projects/d22552c6-9dd8-4aef-a6c6-1d2a7d84c9e8/files/deb89c32-44f6-4e0a-be4a-951bc1964dc0.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Примеры", href: "#examples" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

const FEATURES = [
  {
    icon: "Bell",
    title: "Напоминания об оплате",
    desc: "Бот сам напоминает арендатору об оплате за 7, 3 и 1 день до срока — посуточно или по месяцам. Вы не тратите время на звонки.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
  {
    icon: "AlertTriangle",
    title: "Контроль просрочек",
    desc: "При задержке оплаты бот мгновенно уведомляет вас и автоматически пишет арендатору. Долги не копятся.",
    color: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
  },
  {
    icon: "Car",
    title: "Учёт каждого авто",
    desc: "Бот ведёт список ваших автомобилей: кто арендует, до какого числа, по какой схеме — посуточно, помесячно или под выкуп.",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: "BarChart2",
    title: "Финансовая сводка",
    desc: "Одним сообщением получайте итог по всему автопарку: кто заплатил, кто должен, сколько поступило за период.",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    icon: "Calendar",
    title: "Важные даты по авто",
    desc: "ОСАГО, каско, ТО, окончание договора — бот предупредит заранее, чтобы ничего не пропустить.",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-500",
  },
  {
    icon: "FileText",
    title: "Договоры под выкуп",
    desc: "Отдельный учёт для авто под выкуп: сколько выплачено, сколько осталось, когда следующий платёж.",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
  },
];

const EXAMPLES = [
  {
    tag: "Напоминание об оплате",
    tagColor: "text-emerald-400",
    tagBg: "bg-emerald-400/10 border-emerald-400/20",
    title: "За 3 дня до срока",
    message: "💳 Привет, Артём! Напоминаю: 7 мая срок оплаты аренды Toyota Camry (А123БВ) — 15 000 ₽. Реквизиты: Сбер **** 5678. Спасибо!",
    time: "04 мая, 10:00",
    dot: "bg-emerald-500",
  },
  {
    tag: "Просрочка",
    tagColor: "text-red-400",
    tagBg: "bg-red-400/10 border-red-400/20",
    title: "Оплата не поступила",
    message: "⚠️ Дмитрий, оплата за Kia Rio (А456СД) просрочена на 2 дня. Сумма: 9 000 ₽. Пожалуйста, переведите сегодня, иначе договор будет приостановлен.",
    time: "03 мая, 09:00",
    dot: "bg-red-500",
  },
  {
    tag: "ОСАГО / договор",
    tagColor: "text-blue-400",
    tagBg: "bg-blue-400/10 border-blue-400/20",
    title: "Важная дата по авто",
    message: "📋 Через 10 дней истекает ОСАГО на Hyundai Solaris (В789ЕЖ), переданный Сергею К. под выкуп. Не забудьте продлить страховку вовремя.",
    time: "02 мая, 12:00",
    dot: "bg-blue-500",
  },
  {
    tag: "Штрафы ГИБДД",
    tagColor: "text-orange-400",
    tagBg: "bg-orange-400/10 border-orange-400/20",
    title: "Новый штраф на авто",
    message: "🚔 Максим, на Toyota Camry (А123БВ) зафиксирован штраф ГИБДД — 3 000 ₽. Оплатите до 02 июня со скидкой 50% (1 500 ₽). Ссылка для оплаты: gibdd.ru/",
    time: "03 мая, 14:22",
    dot: "bg-orange-500",
  },
];

const PLANS = [
  {
    name: "Старт",
    price: "990",
    period: "/ мес",
    desc: "Для владельца 1–5 автомобилей",
    features: [
      "До 5 автомобилей",
      "Напоминания об оплате",
      "Контроль просрочек",
      "Telegram + MAX боты",
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
      "Напоминания ОСАГО, ТО, каско",
      "Финансовая аналитика",
      "Экспорт отчётов",
    ],
    cta: "Выбрать тариф",
    accent: true,
  },
  {
    name: "Про",
    price: "5 990",
    period: "/ мес",
    desc: "Для крупных автопарков и агентств",
    features: [
      "Неограниченный автопарк",
      "Всё из тарифа Бизнес",
      "Посуточный и помесячный учёт",
      "Кастомные уведомления",
      "Личный менеджер",
      "White-label решение",
    ],
    cta: "Связаться",
    accent: false,
  },
];

const STATS = [
  { value: "3 500+", label: "Автомобилей под управлением" },
  { value: "97%", label: "Оплат поступает вовремя" },
  { value: "5 мин", label: "Настройка автопарка" },
  { value: "24/7", label: "Бот работает без выходных" },
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
        <a href="#contacts" className="brand-btn px-5 py-2.5 rounded-xl text-sm font-bold">
          Попробовать
        </a>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-green), transparent)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--neon-blue), transparent)" }} />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 animate-fade-up hero-badge">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">RentCarBot — бот для владельцев авто</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-none mb-6 animate-fade-up-delay-1 text-white">
              УМНОЕ<br />
              <span className="neon-text">УПРАВЛЕНИЕ</span><br />
              АВТОПАРКОМ
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 animate-fade-up-delay-2 max-w-lg">
              Для владельцев авто, которые сдают машины посуточно, помесячно или под выкуп.
              Бот сам контролирует оплаты, напоминает об ОСАГО и ведёт учёт по каждому авто — без вашего участия.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
              <a href="https://t.me/rentbot" target="_blank" rel="noopener noreferrer"
                className="brand-btn px-7 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2">
                <TgIcon />
                Telegram-бот
              </a>
              <a href="https://max.ru/rentbot" target="_blank" rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl text-base font-bold text-center flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #ff4f7b, #c026d3)", color: "#fff", boxShadow: "0 4px 20px rgba(192,38,211,0.25)" }}>
                <MaxIcon />
                MAX-бот
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 animate-fade-up-delay-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl font-bold stat-accent">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-float hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: "rgba(57,255,126,0.25)", boxShadow: "0 0 60px rgba(57,255,126,0.1)" }}>
              <img src={HERO_IMAGE} alt="RentCarBot интерфейс" className="w-full h-auto" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,13,26,0.4), transparent)" }} />
            </div>

            <div className="absolute -left-16 top-1/4 rounded-2xl p-3.5 notification-card" style={{ minWidth: 210, background: "var(--dark-card)", border: "1px solid rgba(57,255,126,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)" }}>
                  <Icon name="Bell" size={13} className="text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-emerald-400">Оплата получена</span>
              </div>
              <p className="text-xs text-gray-400">Toyota Camry А123БВ — 15 000 ₽</p>
            </div>

            <div className="absolute -right-12 bottom-1/3 rounded-2xl p-3.5 notification-card" style={{ minWidth: 195, background: "var(--dark-card)", border: "1px solid rgba(248,113,113,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(248,113,113,0.15)" }}>
                  <Icon name="AlertTriangle" size={13} className="text-red-400" />
                </div>
                <span className="text-xs font-semibold text-red-400">Просрочка 3 дня</span>
              </div>
              <p className="text-xs text-gray-400">Kia Rio А456СД — 9 000 ₽</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Возможности</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              ВСЁ ПОД <span className="neon-text">КОНТРОЛЕМ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Бот берёт на себя рутину, чтобы вы занимались главным</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="light-card rounded-2xl p-6 group cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(57,255,126,0.12), rgba(79,142,255,0.12))", border: "1px solid rgba(57,255,126,0.18)" }}>
                  <Icon name={f.icon} fallback="Circle" size={22} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Примеры</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              КАК ЭТО <span className="neon-text">ВЫГЛЯДИТ</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Реальные сообщения, которые получают ваши арендаторы</p>
          </div>

          <div className="flex gap-3 justify-center mb-10 flex-wrap">
            {EXAMPLES.map((ex, i) => (
              <button key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  i === activeTab
                    ? "text-emerald-400 border-emerald-400/60"
                    : "text-gray-400 border-white/10 hover:border-white/25 hover:text-gray-200"
                }`}
                style={i === activeTab ? { background: "rgba(57,255,126,0.1)", boxShadow: "0 0 12px rgba(57,255,126,0.15)" } : { background: "transparent" }}>
                {ex.tag}
              </button>
            ))}
          </div>

          <div className="max-w-lg mx-auto relative" style={{ minHeight: 280 }}>
            {EXAMPLES.map((ex, i) => (
              <div key={i}
                className={`light-card rounded-2xl p-8 transition-all duration-300 ${i === activeTab ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5 border ${ex.tagBg} ${ex.tagColor}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${ex.dot}`} />
                  {ex.tag}
                </div>
                <h3 className="font-display text-xl font-bold mb-4 text-white">{ex.title}</h3>
                <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
      <section id="pricing" className="py-24 px-6" style={{ backgroundColor: "var(--dark-card2)" }}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Тарифы</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              ПРОСТЫЕ <span className="neon-text">ЦЕНЫ</span>
            </h2>
            <p className="text-gray-400 mt-4">Выберите подходящий план. Первые 14 дней — бесплатно.</p>
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
                </div>
                <div className="mb-8">
                  <span className={`font-display text-5xl font-bold ${plan.accent ? "neon-text" : "text-white"}`}>{plan.price} ₽</span>
                  <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
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
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 grid-bg" style={{ backgroundColor: "var(--dark-bg)" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase block mb-3">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              НАЧНЁМ <span className="neon-text">ВМЕСТЕ</span>
            </h2>
            <p className="text-gray-400 mt-4">Оставьте заявку — ответим в течение 15 минут</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              {/* Telegram */}
              <a href="https://t.me/rentbot_support" target="_blank" rel="noopener noreferrer"
                className="light-card rounded-xl p-5 flex items-center gap-4 block">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-100">
                  <TgIcon />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Telegram-бот</div>
                  <div className="text-gray-900 font-semibold mt-0.5">@rentbot_support</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-gray-400 ml-auto" />
              </a>

              {/* MAX */}
              <a href="https://max.ru/rentbot" target="_blank" rel="noopener noreferrer"
                className="light-card rounded-xl p-5 flex items-center gap-4 block">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-fuchsia-50 border border-fuchsia-100">
                  <MaxIcon />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">
                    MAX-бот <span className="text-fuchsia-500">(российский мессенджер)</span>
                  </div>
                  <div className="text-gray-900 font-semibold mt-0.5">@rentbot_max</div>
                </div>
                <Icon name="ArrowRight" size={16} className="text-gray-400 ml-auto" />
              </a>

              {/* Phone */}
              <div className="light-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-green-50 border border-green-100">
                  <Icon name="Phone" fallback="Circle" size={20} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Телефон</div>
                  <div className="text-gray-900 font-semibold mt-0.5">+7 (800) 123-45-67</div>
                </div>
              </div>

              {/* Email */}
              <div className="light-card rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-50 border border-purple-100">
                  <Icon name="Mail" fallback="Circle" size={20} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Email</div>
                  <div className="text-gray-900 font-semibold mt-0.5">hello@rentbot.ru</div>
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
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
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
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Комментарий</label>
                    <textarea
                      placeholder="Сколько у вас авто? Как сдаёте — посуточно или помесячно?"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
                    />
                  </div>
                  <button type="submit" className="brand-btn w-full py-4 rounded-xl text-sm font-bold">
                    Отправить заявку →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(57,255,126,0.08)", backgroundColor: "var(--dark-card)" }}>
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
    </div>
  );
}