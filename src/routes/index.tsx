import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import irinaAsset from "@/assets/irina.jpg.asset.json";
import { PdfDocument } from "@/components/landing/PdfDocument";
import { generateLandingPdf } from "@/lib/generate-pdf";
import { contacts, heroCopy, quote, sections } from "@/lib/landing-content";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Reusable section header — red kicker + big italic accent. */
function SectionHead({
  kicker,
  title,
  align = "left",
  invert = false,
}: {
  kicker: string;
  title: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  const accent = invert ? "text-paper" : "text-red";
  const rule = invert ? "bg-paper" : "bg-red";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] ${accent} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className={`h-px w-8 ${rule}`} />
        <span>{kicker}</span>
      </div>
      <h2 className="font-editorial text-[34px] sm:text-5xl md:text-6xl leading-[1.02] mt-5 md:mt-6">
        {title}
      </h2>
    </div>
  );
}

/** Horizontal marquee ticker with red diamond separators. */
function Ticker({ items }: { items: string[] }) {
  const line = items.join("   ◆   ");
  return (
    <div className="relative overflow-hidden border-y border-paper/15 bg-ink/60 py-3">
      <div className="whitespace-nowrap font-editorial italic text-red/90 text-lg md:text-2xl animate-[ticker_38s_linear_infinite]">
        <span className="px-6">{line}</span>
        <span className="px-6">{line}</span>
        <span className="px-6">{line}</span>
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0)} to { transform: translateX(-50%)} }`}</style>
    </div>
  );
}

function Index() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!pdfRef.current || loading) return;
    setLoading(true);
    try {
      await generateLandingPdf(pdfRef.current, "Irina-Kim.pdf");
    } catch (e) {
      console.error(e);
      alert("Не удалось сгенерировать PDF. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  const [s01, s02, s03, s04] = sections;

  return (
    <main className="min-h-screen bg-ink text-paper font-sans overflow-x-hidden selection:bg-red selection:text-paper">
      {/* Top bar */}
      <header className="border-b border-paper/15 bg-ink/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-3.5 md:py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="h-2 w-2 rounded-full bg-red shrink-0" />
            <span className="font-editorial text-[15px] md:text-lg truncate">Ирина Ким</span>
          </div>
          <span className="shrink-0 text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-paper/60">
            СПб · <span className="text-red">Новостройки</span>
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative border-b border-paper/15 bg-grain">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 pt-10 md:pt-20 pb-14 md:pb-24 grid grid-cols-12 gap-8 md:gap-12 md:items-center">
          {/* Photo — centered on mobile, framed with red corner marks */}
          <div className="col-span-12 md:col-span-5 md:order-2">
            <div className="relative mx-auto w-full max-w-[360px] md:max-w-none">
              {/* corner marks */}
              <span aria-hidden className="absolute -top-2 -left-2 h-5 w-5 border-t-2 border-l-2 border-red" />
              <span aria-hidden className="absolute -top-2 -right-2 h-5 w-5 border-t-2 border-r-2 border-red" />
              <span aria-hidden className="absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-red" />
              <span aria-hidden className="absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-red" />
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={irinaAsset.url}
                  alt="Ирина Ким"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.35em] text-paper/55">
                <span>Санкт-Петербург</span>
                <span className="text-red">Portrait / 2026</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:order-1">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-5 md:mb-7">
              <span className="h-px w-8 bg-red" />
              <span>{heroCopy.kicker}</span>
            </div>
            <h1 className="font-editorial text-[64px] sm:text-[92px] md:text-[148px] leading-[0.9] tracking-[-0.03em]">
              Ирина
              <br />
              <span className="italic text-red">Ким</span>
              <span className="text-red">.</span>
            </h1>
            <div className="mt-7 md:mt-10 flex items-start gap-4 max-w-xl">
              <span className="mt-2 h-px w-10 bg-red shrink-0" />
              <div>
                <p className="text-[11px] md:text-sm uppercase tracking-[0.3em] text-paper/70">
                  {heroCopy.role}
                </p>
                <p className="mt-4 text-[17px] md:text-xl leading-[1.55] text-paper/85">
                  {heroCopy.lead}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker strip */}
      <Ticker items={["Экспертиза", "Комфорт", "Ипотека", "Стратегия", "Сопровождение", "Постсервис"]} />

      {/* INTRO manifesto */}
      <section className="border-b border-paper/15 relative overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute -top-20 -right-20 text-red/[0.06] font-editorial text-[380px] leading-none select-none">К</span>
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-28 relative">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-6">
            <span className="h-px w-8 bg-red" />
            <span>Философия</span>
          </div>
          <h2 className="font-editorial text-[36px] sm:text-5xl md:text-7xl leading-[1.02] max-w-4xl">
            Квартира — не про <span className="italic">метры</span>.
            <br />
            Это про <span className="italic text-red">образ жизни</span>.
          </h2>
          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              { k: "01", t: "Разбор жизни, не только объекта", d: "Семья, работа, дети, маршруты, привычки и окружение — всё это входит в подбор." },
              { k: "02", t: "Стратегия под задачу", d: "Сценарии покупки, расчёты и сравнение объектов — чтобы выбор был обоснованным." },
              { k: "03", t: "Комфорт как результат", d: "Квартира, где действительно хочется жить, а не просто удачная сделка на бумаге." },
            ].map((c) => (
              <div key={c.k} className="border-t border-paper/20 pt-5">
                <span className="font-editorial italic text-red text-2xl">{c.k}</span>
                <h3 className="font-editorial text-2xl md:text-3xl mt-3 leading-[1.15]">{c.t}</h3>
                <p className="mt-3 text-[15px] md:text-base leading-[1.6] text-paper/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 — CARDS GRID: "Кому полезна" */}
      <section className="border-b border-paper/15 py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <SectionHead
            n={s01.number}
            kicker="Аудитория"
            title={<>Кому особенно <span className="italic text-red">полезна</span></>}
          />
          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {s01.items.map((it, i) => (
              <article
                key={i}
                className="group relative bg-paper/[0.03] border border-paper/10 p-6 md:p-7 hover:border-red/60 hover:bg-red/[0.06] transition-colors"
              >
                <span className="absolute top-0 left-0 h-[3px] w-10 bg-red" />
                <span className="font-editorial italic text-red text-3xl md:text-4xl block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[17px] md:text-lg leading-[1.5] text-paper/90 font-editorial">
                  {it}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — CHECKLIST on subtle red-tinted panel: "Что получает клиент" */}
      <section className="relative border-b border-paper/15">
        <div className="absolute inset-0 bg-gradient-to-b from-red/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-28 grid grid-cols-12 gap-8 md:gap-14 relative">
          <div className="col-span-12 md:col-span-5">
            <SectionHead
              n={s02.number}
              kicker="Результат"
              title={<>Что <span className="italic text-red">получает</span> клиент</>}
            />
            <p className="mt-6 md:mt-8 text-[15px] md:text-base leading-[1.65] text-paper/70 max-w-sm">
              Уже на первой встрече формируется ясная картина: районы, ЖК, расчёты и понятный порядок действий.
            </p>
          </div>
          <ul className="col-span-12 md:col-span-7 space-y-4 md:space-y-5">
            {s02.items.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-4 md:gap-5 bg-ink/60 border border-paper/10 p-5 md:p-6"
              >
                <span
                  aria-hidden
                  className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-red text-red font-editorial italic"
                >
                  ✓
                </span>
                <p className="text-[16px] md:text-lg leading-[1.5] text-paper/90">{it}</p>
                <span className="ml-auto pl-2 text-[10px] uppercase tracking-[0.3em] text-paper/30 hidden md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — TIMELINE: "Подход" */}
      <section className="border-b border-paper/15 py-16 md:py-28">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <SectionHead
            n={s03.number}
            kicker="Метод"
            title={<><span className="italic text-red">Подход</span> Ирины</>}
            align="center"
          />
          <div className="mt-14 md:mt-20 relative max-w-3xl mx-auto">
            {/* Vertical dashed line */}
            <div
              aria-hidden
              className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-[repeating-linear-gradient(to_bottom,rgba(180,18,28,0.6)_0_6px,transparent_6px_14px)]"
            />
            <ol className="space-y-10 md:space-y-14">
              {s03.items.map((it, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={i} className="relative pl-14 md:pl-0">
                    <span
                      aria-hidden
                      className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 h-4 w-4 rotate-45 bg-red border-2 border-ink shadow-[0_0_0_2px_var(--red)]"
                    />
                    <div
                      className={`md:w-1/2 ${right ? "md:ml-auto md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}
                    >
                      <span className="font-editorial italic text-red text-lg tracking-wide">
                        Шаг {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 font-editorial text-xl md:text-2xl leading-[1.25] text-paper/95">
                        {it}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 04 — RED PANEL: "Сильные стороны" */}
      <section className="relative bg-red text-paper overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-28 relative">
          <SectionHead
            n={s04.number}
            kicker="Преимущества"
            title={<>Сильные <span className="italic">стороны</span></>}
            invert
          />
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-10">
            {s04.items.map((it, i) => (
              <div key={i} className="flex gap-5 border-t border-paper/30 pt-5">
                <span className="font-editorial italic text-[44px] md:text-[56px] leading-none text-paper/95">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] md:text-lg leading-[1.5] text-paper pt-1">{it}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — QUOTE on milk */}
      <section className="bg-milk text-ink relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-20 md:py-36 relative">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-8">
            <span className="h-px w-8 bg-red" />
            <span>Раздел {quote.number} · Рекомендация</span>
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-2 md:col-span-2">
              <div
                aria-hidden
                className="font-editorial italic text-[110px] sm:text-[160px] md:text-[240px] leading-[0.7] text-red select-none"
              >
                “
              </div>
            </div>
            <div className="col-span-10 md:col-span-10">
              <p className="font-editorial italic text-[24px] sm:text-[32px] md:text-5xl leading-[1.22] text-ink">
                {quote.body}
              </p>
              <div className="mt-8 md:mt-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-ink/60">
                <span className="h-px w-10 bg-red" />
                <span>{quote.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-paper/15 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-5 justify-center">
              <span className="h-px w-8 bg-red" />
              <span>Контакты</span>
              <span className="h-px w-8 bg-red" />
            </div>
            <h2 className="font-editorial text-[44px] sm:text-6xl md:text-7xl leading-[1.02]">
              Давайте <span className="italic text-red">познакомимся</span>
            </h2>
            <p className="mt-6 text-[15px] md:text-base leading-[1.6] text-paper/70">
              Напишите удобным способом — Ирина ответит быстро и на первой же консультации даст ясную картину.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="col-span-12 md:col-span-5">
              <div className="relative mx-auto w-full max-w-[340px]">
                <span aria-hidden className="absolute -top-2 -left-2 h-5 w-5 border-t-2 border-l-2 border-red" />
                <span aria-hidden className="absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-red" />
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={irinaAsset.url} alt="Ирина Ким" className="w-full h-full object-cover object-center" />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-editorial text-2xl md:text-3xl">{contacts.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.35em] text-paper/60 mt-2">
                    {contacts.role}
                  </div>
                </div>
              </div>
            </div>

            <ul className="col-span-12 md:col-span-7 divide-y divide-paper/15 border-y border-paper/15">
              {[
                { label: "Телефон", value: contacts.phone, href: contacts.phoneHref, ext: false },
                { label: "Instagram", value: contacts.instagram, href: contacts.instagramHref, ext: true },
                { label: "Telegram", value: contacts.telegram, href: contacts.telegramHref, ext: true },
              ].map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.ext ? "_blank" : undefined}
                    rel={c.ext ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 md:py-7 hover:text-red transition-colors"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.35em] text-paper/50 group-hover:text-red/80 block">
                        {c.label}
                      </span>
                      <span className="font-editorial text-xl md:text-3xl break-all mt-1 block">
                        {c.value}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="shrink-0 flex items-center justify-center h-10 w-10 border border-paper/25 group-hover:border-red group-hover:text-red text-paper/60 font-editorial italic transition-colors"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer — subtle download link at the very end */}
      <footer className="border-t border-paper/10 bg-ink">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-10 md:py-12 flex flex-col items-center gap-5 text-center">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-paper/45 hover:text-red transition-colors disabled:opacity-50"
          >
            <span className="h-px w-6 bg-current" />
            <span>
              {loading ? "готовим pdf…" : "скачать презентацию · pdf"}
            </span>
            <span className="h-px w-6 bg-current" />
          </button>
          <div className="text-[9px] uppercase tracking-[0.35em] text-paper/30">
            © Ирина Ким · Санкт-Петербург
          </div>
        </div>
      </footer>

      {/* Offscreen PDF document */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          width: "794px",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <PdfDocument ref={pdfRef} />
      </div>
    </main>
  );
}
