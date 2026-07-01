import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import irinaAsset from "@/assets/irina.jpg.asset.json";
import { PdfDocument } from "@/components/landing/PdfDocument";
import { generateLandingPdf } from "@/lib/generate-pdf";
import { contacts, heroCopy, quote, sections } from "@/lib/landing-content";

export const Route = createFileRoute("/")({
  component: Index,
});

function DownloadButton({
  onClick,
  loading,
  variant = "light",
}: {
  onClick: () => void;
  loading: boolean;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`group inline-flex items-center gap-4 px-8 py-4 text-[11px] uppercase tracking-[0.35em] transition-all disabled:opacity-60 ${
        dark
          ? "bg-paper text-ink hover:bg-red hover:text-paper"
          : "bg-ink text-paper hover:bg-red"
      }`}
    >
      <span>{loading ? "Готовим PDF…" : "Скачать презентацию"}</span>
      <span className="w-8 h-px bg-current transition-transform group-hover:scale-x-150 origin-left" />
      <span className="font-editorial text-base normal-case tracking-normal">PDF</span>
    </button>
  );
}

function SectionBlock({
  n,
  title,
  items,
  reverse = false,
}: {
  n: string;
  title: string;
  items: string[];
  reverse?: boolean;
}) {
  return (
    <section className="border-t border-ink/15">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-12 gap-6 md:gap-10">
        <div className={`col-span-12 md:col-span-4 ${reverse ? "md:order-2" : ""}`}>
          <div className="sticky top-10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-red mb-6">
              Раздел {n}
            </div>
            <div className="font-editorial text-[120px] md:text-[180px] leading-[0.85] text-ink/10">
              {n}
            </div>
            <h2 className="font-editorial text-3xl md:text-5xl leading-[1.05] mt-6 max-w-sm">
              {title}
            </h2>
          </div>
        </div>
        <ol className="col-span-12 md:col-span-8 space-y-8">
          {items.map((it, i) => (
            <li key={i} className="grid grid-cols-[3rem_1fr] gap-6 items-baseline border-b border-ink/10 pb-8 last:border-b-0">
              <span className="font-editorial text-red text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg md:text-xl leading-[1.5] text-ink">{it}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
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

  return (
    <main className="min-h-screen bg-paper text-ink font-sans overflow-x-hidden">
      {/* Top bar */}
      <header className="border-b border-ink/15">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between text-[11px] uppercase tracking-[0.35em]">
          <span className="font-editorial text-base tracking-normal normal-case">Ирина Ким</span>
          <span className="hidden md:inline text-ink/60">Санкт-Петербург · Новостройки</span>
          <span className="text-red">Персональная презентация</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.4em] text-red mb-8">
              {heroCopy.kicker}
            </div>
            <h1 className="font-editorial text-[68px] sm:text-[96px] md:text-[140px] leading-[0.9] tracking-[-0.03em]">
              Ирина
              <br />
              <span className="italic text-red">Ким</span>
            </h1>
            <p className="mt-10 text-sm uppercase tracking-[0.3em] text-ink/70">
              {heroCopy.role}
            </p>
            <p className="mt-8 max-w-lg text-lg md:text-xl leading-[1.5] text-ink/80">
              {heroCopy.lead}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <DownloadButton onClick={handleDownload} loading={loading} />
              <a
                href="#contacts"
                className="text-[11px] uppercase tracking-[0.35em] border-b border-ink pb-1 hover:text-red hover:border-red transition-colors"
              >
                Связаться
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 relative">
            <div className="aspect-[4/5] w-full overflow-hidden bg-milk">
              <img
                src={irinaAsset.url}
                alt="Ирина Ким"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:flex bg-ink text-paper px-6 py-4 items-center gap-4">
              <span className="font-editorial text-3xl italic text-red">01</span>
              <span className="text-[10px] uppercase tracking-[0.35em] max-w-[140px] leading-tight">
                Помощь в подборе квартиры под жизнь клиента
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro strip */}
      <section className="bg-milk">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-red">Введение</div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-editorial text-4xl md:text-6xl leading-[1.05]">
              Квартира — это не про метры.
              <br />
              Это про <span className="italic text-red">образ жизни</span>.
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-8 max-w-3xl">
              <p className="text-lg leading-[1.6] text-ink/80">
                Ирина разбирает не только объект, но и жизнь клиента: семью, работу, детей, маршруты, привычки и окружение.
              </p>
              <p className="text-lg leading-[1.6] text-ink/80">
                Результат — квартира, где действительно комфортно жить, а не просто удачная сделка на бумаге.
              </p>
            </div>
          </div>
        </div>
      </section>

      {sections.map((s, i) => (
        <SectionBlock key={s.number} n={s.number} title={s.title} items={s.items} reverse={i % 2 === 1} />
      ))}

      {/* Quote */}
      <section className="bg-red text-paper">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-36 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.4em] text-paper/70">
              Раздел {quote.number}
            </div>
            <div className="font-editorial text-[160px] md:text-[220px] leading-none opacity-30 -mt-6">
              “
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-editorial italic text-3xl md:text-5xl leading-[1.2]">
              {quote.body}
            </p>
            <div className="mt-12 text-[11px] uppercase tracking-[0.35em] text-paper/80">
              {quote.title}
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="bg-ink text-paper">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.4em] text-red mb-6">Контакты</div>
            <h2 className="font-editorial text-5xl md:text-7xl leading-[1.02]">
              Давайте
              <br />
              <span className="italic text-red">познакомимся</span>
            </h2>
            <div className="mt-10 aspect-[4/5] w-full max-w-sm overflow-hidden">
              <img src={irinaAsset.url} alt="Ирина Ким" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-10">
            <div className="font-editorial text-4xl md:text-5xl">{contacts.name}</div>
            <div className="text-[11px] uppercase tracking-[0.35em] text-paper/60 mt-2">
              {contacts.role}
            </div>
            <div className="mt-12 divide-y divide-paper/15 border-y border-paper/15">
              <a href={contacts.phoneHref} className="group flex items-baseline justify-between py-6 hover:text-red transition-colors">
                <span className="text-[11px] uppercase tracking-[0.35em] text-paper/60 group-hover:text-red/80">Телефон</span>
                <span className="font-editorial text-2xl md:text-3xl">{contacts.phone}</span>
              </a>
              <a href={contacts.instagramHref} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between py-6 hover:text-red transition-colors">
                <span className="text-[11px] uppercase tracking-[0.35em] text-paper/60 group-hover:text-red/80">Instagram</span>
                <span className="font-editorial text-2xl md:text-3xl">{contacts.instagram}</span>
              </a>
              <a href={contacts.telegramHref} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between py-6 hover:text-red transition-colors">
                <span className="text-[11px] uppercase tracking-[0.35em] text-paper/60 group-hover:text-red/80">Telegram</span>
                <span className="font-editorial text-2xl md:text-3xl">{contacts.telegram}</span>
              </a>
            </div>
            <div className="mt-12">
              <DownloadButton onClick={handleDownload} loading={loading} variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-paper/10 bg-ink text-paper/60">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.35em]">
          <span>© Ирина Ким · Санкт-Петербург</span>
          <span>Персональная презентация</span>
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
