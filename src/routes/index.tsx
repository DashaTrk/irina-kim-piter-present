import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import irinaAsset from "@/assets/irina.jpg.asset.json";
import { PdfDocument } from "@/components/landing/PdfDocument";
import { generateLandingPdf } from "@/lib/generate-pdf";
import { contacts, heroCopy, quote, sections } from "@/lib/landing-content";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Тонкие красно-белые линейки-разделители — держат единый структурный ритм. */
function Divider({ label }: { label?: string }) {
  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-12">
      <div className="flex items-center gap-4 py-4">
        <span className="h-px flex-1 bg-paper/15" />
        {label && (
          <span className="text-[9px] uppercase tracking-[0.4em] text-paper/40 whitespace-nowrap">
            {label}
          </span>
        )}
        <span className="h-px w-10 bg-red" />
      </div>
    </div>
  );
}

function SectionBlock({
  n,
  title,
  items,
}: {
  n: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="relative">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-16 md:py-28 grid grid-cols-12 gap-6 md:gap-10">
        {/* Header rail */}
        <div className="col-span-12 md:col-span-4">
          <div className="md:sticky md:top-10">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red">
              <span className="h-px w-8 bg-red" />
              <span>Раздел {n}</span>
            </div>
            <div className="relative mt-6 md:mt-8">
              <span
                aria-hidden
                className="font-editorial select-none block leading-[0.8] text-[26vw] md:text-[180px] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(180,18,28,0.35)" }}
              >
                {n}
              </span>
            </div>
            <h2 className="font-editorial text-3xl md:text-5xl leading-[1.05] mt-4 md:mt-6 max-w-sm">
              {title}
            </h2>
          </div>
        </div>

        {/* List */}
        <ol className="col-span-12 md:col-span-8 space-y-6 md:space-y-8">
          {items.map((it, i) => (
            <li
              key={i}
              className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 md:gap-6 items-baseline border-b border-paper/10 pb-6 md:pb-8 last:border-b-0"
            >
              <span className="font-editorial text-red text-xl md:text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[17px] md:text-xl leading-[1.55] text-paper/90">
                {it}
              </p>
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
    <main className="min-h-screen bg-ink text-paper font-sans overflow-x-hidden selection:bg-red selection:text-paper">
      {/* Top bar */}
      <header className="border-b border-paper/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-4 md:py-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-[10px] uppercase tracking-[0.3em] md:tracking-[0.35em]">
          <span className="font-editorial text-base tracking-normal normal-case truncate">
            Ирина Ким
          </span>
          <span className="text-red shrink-0 text-[9px] md:text-[10px]">
            СПб · Новостройки
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-paper/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-12 md:pt-24 pb-16 md:pb-28 grid grid-cols-12 gap-8 md:gap-10 md:items-end">
          <div className="col-span-12 md:col-span-7 order-2 md:order-1">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-6 md:mb-8">
              <span className="h-px w-8 bg-red" />
              <span>{heroCopy.kicker}</span>
            </div>
            <h1 className="font-editorial text-[56px] sm:text-[88px] md:text-[140px] leading-[0.92] tracking-[-0.03em]">
              Ирина
              <br />
              <span className="italic text-red">Ким</span>
            </h1>
            <p className="mt-8 md:mt-10 text-[11px] md:text-sm uppercase tracking-[0.3em] text-paper/70">
              {heroCopy.role}
            </p>
            <p className="mt-6 md:mt-8 max-w-lg text-[17px] md:text-xl leading-[1.55] text-paper/85">
              {heroCopy.lead}
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 order-1 md:order-2 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={irinaAsset.url}
                alt="Ирина Ким"
                className="w-full h-full object-cover"
              />
              {/* red vertical hairline as editorial frame */}
              <span className="absolute inset-y-0 left-0 w-px bg-red" />
            </div>
            <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.35em] text-paper/50">
              <span>Санкт-Петербург</span>
              <span>№ 01 / 05</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-paper/15">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-16 md:py-28 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red">
              <span className="h-px w-8 bg-red" />
              <span>Введение</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-editorial text-[32px] md:text-6xl leading-[1.08]">
              Квартира — не про метры.
              <br />
              Это про <span className="italic text-red">образ жизни</span>.
            </h2>
            <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl">
              <p className="text-[16px] md:text-lg leading-[1.6] text-paper/80">
                Ирина разбирает не только объект, но и жизнь клиента: семью, работу, детей, маршруты, привычки и окружение.
              </p>
              <p className="text-[16px] md:text-lg leading-[1.6] text-paper/80">
                Результат — квартира, где действительно комфортно жить, а не просто удачная сделка на бумаге.
              </p>
            </div>
          </div>
        </div>
      </section>

      {sections.map((s, i) => (
        <div key={s.number}>
          <SectionBlock n={s.number} title={s.title} items={s.items} />
          <Divider label={i < sections.length - 1 ? `· ${String(i + 2).padStart(2, "0")} ·` : "· 05 ·"} />
        </div>
      ))}

      {/* Quote — inverted milk panel: the single deliberate contrast moment */}
      <section className="bg-milk text-ink">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-20 md:py-36 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red">
              <span className="h-px w-8 bg-red" />
              <span>Раздел {quote.number}</span>
            </div>
            <div
              aria-hidden
              className="font-editorial italic text-[140px] md:text-[220px] leading-none text-red -mt-4 md:-mt-8 select-none"
            >
              “
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="font-editorial italic text-[26px] md:text-5xl leading-[1.22] text-ink">
              {quote.body}
            </p>
            <div className="mt-10 md:mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ink/60">
              <span className="h-px w-8 bg-ink/40" />
              <span>{quote.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section
        id="contacts"
        className="border-t border-paper/15"
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-16 md:py-32 grid grid-cols-12 gap-8 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-red mb-5">
              <span className="h-px w-8 bg-red" />
              <span>Контакты</span>
            </div>
            <h2 className="font-editorial text-[44px] md:text-7xl leading-[1.02]">
              Давайте
              <br />
              <span className="italic text-red">познакомимся</span>
            </h2>
            <div className="mt-8 md:mt-10 relative aspect-[4/5] w-full max-w-sm overflow-hidden">
              <img
                src={irinaAsset.url}
                alt="Ирина Ким"
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-y-0 left-0 w-px bg-red" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-10">
            <div className="font-editorial text-3xl md:text-5xl">
              {contacts.name}
            </div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-paper/60 mt-2">
              {contacts.role}
            </div>
            <ul className="mt-10 md:mt-12 divide-y divide-paper/15 border-y border-paper/15">
              <li>
                <a
                  href={contacts.phoneHref}
                  className="group flex flex-col gap-1 py-5 md:py-6 hover:text-red transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-paper/50 group-hover:text-red/70">
                    Телефон
                  </span>
                  <span className="font-editorial text-xl md:text-3xl break-all">
                    {contacts.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contacts.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 py-5 md:py-6 hover:text-red transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-paper/50 group-hover:text-red/70">
                    Instagram
                  </span>
                  <span className="font-editorial text-xl md:text-3xl break-all">
                    {contacts.instagram}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 py-5 md:py-6 hover:text-red transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.35em] text-paper/50 group-hover:text-red/70">
                    Telegram
                  </span>
                  <span className="font-editorial text-xl md:text-3xl break-all">
                    {contacts.telegram}
                  </span>
                </a>
              </li>
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
