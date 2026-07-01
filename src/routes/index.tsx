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

/** Section index strip — clean editorial list of all page blocks. */
function SectionIndex() {
  const items = [
    "Главная",
    "Философия",
    "Аудитория",
    "Результат",
    "Метод",
    "Преимущества",
    "Рекомендация",
    "Контакты",
  ];

  return (
    <nav className="border-y border-paper/10 bg-ink">
      <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-5 md:py-6">
        <div className="flex flex-wrap justify-center items-center gap-y-3">
          {items.map((item, i) => (
            <div key={item} className="flex items-center">
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-paper/70 px-3 md:px-4">
                {item}
              </span>
              {i < items.length - 1 && (
                <span aria-hidden className="h-3 w-px bg-red/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
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
          {/* Photo — perfect circle with red ring accent */}
          <div className="col-span-12 md:col-span-5 md:order-2">
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
              {/* outer red ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-red/70"
              />
              {/* soft red glow ring */}
              <span
                aria-hidden
                className="absolute inset-[-12px] rounded-full bg-red/10 blur-lg"
              />
              {/* thin secondary ring */}
              <span
                aria-hidden
                className="absolute inset-[-6px] rounded-full border border-paper/10"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-paper/20">
                <img
                  src={irinaAsset.url}
                  alt="Ирина Ким"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:order-1">
            <h1 className="font-editorial text-[64px] sm:text-[92px] md:text-[148px] leading-[0.9] tracking-[-0.03em]">
              Ирина
              <br />
              <span className="italic text-red">Ким</span>
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

      {/* Static keyword strip */}
      <SectionIndex />

      {/* INTRO manifesto */}
      <section className="border-b border-paper/15 relative overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute -top-20 -right-20 text-red/[0.06] font-editorial text-[380px] leading-none select-none">К</span>
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-28 relative">
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-6">
            <span className="h-px w-8 bg-red" />
            <span>Философия</span>
            <span className="h-px w-8 bg-red" />
          </div>
          <h2 className="font-editorial text-center text-[36px] sm:text-5xl md:text-7xl leading-[1.02] max-w-4xl mx-auto">
            Квартира — не про <span className="italic">метры</span>.
            <br />
            Это про <span className="italic text-red">образ жизни</span>
            <span className="text-red">.</span>
          </h2>
          <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-8 md:gap-10 text-center md:text-left">
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

      {/* 01 — CARDS GRID: "Кому полезна Ирина" */}
      <section className="border-b border-paper/15 py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-5 md:px-12">
          <SectionHead
            kicker="Аудитория"
            title={<>Кому особенно полезна <span className="italic text-red">Ирина</span></>}
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
              kicker="Результат"
              title={<>Что <span className="italic text-red">получает</span> клиент</>}
            />
            <p className="mt-6 md:mt-8 text-[18px] md:text-[22px] leading-[1.45] text-paper/90 max-w-sm font-editorial">
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
            kicker="Метод"
            title={<><span className="italic text-red">Подход</span> Ирины</>}
            align="center"
          />
          <div className="mt-14 md:mt-20 relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-red/40"
            />
            <ol className="space-y-8 md:space-y-10">
              {s03.items.map((it, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={i} className="relative pl-14 md:pl-0">
                    <span
                      aria-hidden
                      className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-red border-2 border-ink ring-2 ring-red/30"
                    />
                    <div
                      className={`md:w-1/2 ${right ? "md:ml-auto md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}
                    >
                      <span className="inline-block font-editorial italic text-red text-sm tracking-wide mb-2">
                        Шаг {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-sans text-[17px] md:text-[19px] leading-[1.55] text-paper/95 tracking-[-0.01em]">
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
      <section className="relative bg-red-bg text-paper overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
        <div aria-hidden className="absolute -top-20 -left-20 w-[340px] h-[340px] rounded-full bg-ink/35 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-ink/30 blur-3xl" />
        <div className="max-w-[1320px] mx-auto px-5 md:px-12 py-16 md:py-28 relative">
          <SectionHead
            kicker="Преимущества"
            title={<>Сильные <span className="italic">стороны</span></>}
            invert
          />
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {s04.items.map((it, i) => (
              <article
                key={i}
                className="relative bg-ink border border-paper/10 p-6 md:p-8"
              >
                <span className="absolute top-0 left-0 h-[3px] w-16 bg-red" />
                <div className="flex gap-4 md:gap-5">
                  <span className="shrink-0 font-editorial italic text-[38px] md:text-[48px] leading-none text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] md:text-[17px] leading-[1.55] text-paper/95 pt-2">
                    {it}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — QUOTE on milk */}
      <section className="bg-milk text-ink relative overflow-hidden">
        <div className="max-w-[1120px] mx-auto px-5 md:px-12 py-20 md:py-32 relative text-center">
          <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red-bg mb-10 md:mb-14">
            <span className="h-px w-8 bg-red-bg" />
            <span>Рекомендация</span>
            <span className="h-px w-8 bg-red-bg" />
          </div>

          <p className="text-[13px] md:text-sm uppercase tracking-[0.3em] text-ink/60 mb-8 md:mb-10">
            {quote.title}
          </p>

          <div className="relative max-w-4xl mx-auto">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 md:-top-14 left-1/2 -translate-x-1/2 font-editorial italic text-red-bg/90 text-[100px] md:text-[160px] leading-[0.7] select-none"
            >
              “
            </span>
            <p className="relative pt-16 md:pt-24 font-editorial italic text-[26px] sm:text-[34px] md:text-[46px] leading-[1.2] text-ink">
              {quote.body}
            </p>
          </div>

          <div className="mt-12 md:mt-16 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.35em] text-ink/60">
            <span className="h-px w-10 bg-red-bg" />
            <span>Личная рекомендация</span>
            <span className="h-px w-10 bg-red-bg" />
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

          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <ul className="divide-y divide-paper/15 border-y border-paper/15">
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
