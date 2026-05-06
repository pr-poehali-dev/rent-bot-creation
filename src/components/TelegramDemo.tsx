import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

type Msg = {
  id: number;
  from: "bot" | "user" | "owner";
  text: string;
  button?: string;
  delay: number;
};

const SCRIPT: Msg[] = [
  {
    id: 1,
    from: "bot",
    text: "Привет, Иван! Напоминаем: завтра последний день оплаты аренды Kia Rio (А123ВС). Сумма — 2 500 ₽.",
    delay: 600,
  },
  {
    id: 2,
    from: "bot",
    text: "Оплатить можно по кнопке ниже 👇",
    button: "💳 Оплатить 2 500 ₽",
    delay: 1400,
  },
  {
    id: 3,
    from: "user",
    text: "Оплатил, спасибо!",
    delay: 2400,
  },
  {
    id: 4,
    from: "bot",
    text: "Платёж получен ✅ Чек отправлен. Хорошей дороги!",
    delay: 3200,
  },
  {
    id: 5,
    from: "owner",
    text: "📊 Отчёт владельцу: Иван оплатил 2 500 ₽ — Kia Rio (А123ВС). Долгов нет.",
    delay: 4200,
  },
];

const LOOP_DURATION = 6500;

export default function TelegramDemo() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loopTimer: ReturnType<typeof setTimeout>;

    const run = () => {
      setVisible([]);
      setTyping(true);
      timers = SCRIPT.map((m) =>
        setTimeout(() => {
          setVisible((prev) => [...prev, m.id]);
          if (m.id === SCRIPT[SCRIPT.length - 1].id) setTyping(false);
        }, m.delay),
      );
      loopTimer = setTimeout(run, LOOP_DURATION);
    };

    run();
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loopTimer);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visible]);

  return (
    <div
      className="mx-auto rounded-[2.2rem] overflow-hidden"
      style={{
        maxWidth: 380,
        background: "#0e1621",
        border: "8px solid #1a1a1a",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 60px rgba(57,255,126,0.15)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ background: "#17212b", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-900"
          style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)" }}
        >
          R
        </div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">RentCarBot</div>
          <div className="text-xs flex items-center gap-1" style={{ color: "#39ff7e" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            online
          </div>
        </div>
        <Icon name="MoreVertical" size={18} className="text-gray-400" />
      </div>

      {/* Chat */}
      <div
        ref={containerRef}
        className="px-3 py-4 space-y-2 overflow-hidden"
        style={{
          height: 440,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(57,255,126,0.04), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,212,255,0.04), transparent 40%)",
          backgroundColor: "#0e1621",
        }}
      >
        {SCRIPT.map((m) => {
          const isVisible = visible.includes(m.id);
          const isUser = m.from === "user";
          const isOwner = m.from === "owner";
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} transition-all duration-500`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <div
                className="max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug"
                style={{
                  background: isUser
                    ? "#2b5278"
                    : isOwner
                      ? "rgba(57,255,126,0.15)"
                      : "#182533",
                  color: "#fff",
                  border: isOwner ? "1px solid rgba(57,255,126,0.35)" : "none",
                  borderTopLeftRadius: isUser ? 16 : 4,
                  borderTopRightRadius: isUser ? 4 : 16,
                }}
              >
                {isOwner && (
                  <div className="text-[10px] font-bold mb-1" style={{ color: "#39ff7e" }}>
                    📩 ВЛАДЕЛЬЦУ
                  </div>
                )}
                <div>{m.text}</div>
                {m.button && (
                  <button
                    className="mt-2 w-full rounded-lg py-2 text-xs font-bold text-slate-900"
                    style={{ background: "linear-gradient(135deg, #39ff7e, #00d4ff)" }}
                  >
                    {m.button}
                  </button>
                )}
                <div className="text-[10px] text-gray-400 text-right mt-1">
                  {new Date().getHours().toString().padStart(2, "0")}:
                  {new Date().getMinutes().toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          );
        })}

        {typing && visible.length < SCRIPT.length && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl px-3 py-2 flex items-center gap-1"
              style={{ background: "#182533", borderTopLeftRadius: 4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: "#17212b", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Icon name="Smile" size={20} className="text-gray-400" />
        <div className="flex-1 text-xs text-gray-500">Сообщение</div>
        <Icon name="Mic" size={20} className="text-gray-400" />
      </div>
    </div>
  );
}
