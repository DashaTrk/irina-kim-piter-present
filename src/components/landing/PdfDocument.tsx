import { forwardRef } from "react";
import irinaAsset from "@/assets/irina.jpg.asset.json";
import { contacts, heroCopy, quote, sections } from "@/lib/landing-content";

// A4 portrait at 96dpi = 794 x 1123 px. We render pages at 794x1123.
const PAGE = "w-[794px] h-[1123px] relative overflow-hidden";

function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-ink/20 ${className}`} />;
}

function PageChrome({ page, total }: { page: number; total: number }) {
  return (
    <div className="absolute inset-x-14 bottom-8 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-ink/50">
      <span>Ирина Ким · Эксперт по новостройкам СПб</span>
      <span>
        {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function SectionPage({ title, items, page, total }: { title: string; items: string[]; page: number; total: number }) {
  return (
    <div data-pdf-page data-pdf-bg="#ffffff" className={`${PAGE} bg-paper text-ink px-14 pt-16`}>
      <div className="border-b border-ink/10 pb-6">
        <h2 className="font-editorial text-[48px] leading-[1.05] mt-2">{title}</h2>
      </div>
      <ol className="mt-10 space-y-6">
        {items.map((it, i) => (
          <li key={i} className="flex gap-6 items-baseline">
            <span className="font-editorial text-red text-2xl w-8">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[19px] leading-[1.55] flex-1">{it}</span>
          </li>
        ))}
      </ol>
      <PageChrome page={page} total={total} />
    </div>
  );
}

export const PdfDocument = forwardRef<HTMLDivElement>((_props, ref) => {
  const total = 2 + sections.length + 1 + 1; // cover + intro + sections + quote + contacts
  let p = 0;
  const nextPage = () => ++p;

  return (
    <div ref={ref} className="bg-white text-ink font-sans">
      {/* Cover */}
      <div data-pdf-page data-pdf-bg="#0a0a0a" className={`${PAGE} bg-ink text-paper`}>
        <div className="absolute top-14 left-14 right-14 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-paper/60">
          <span>Персональная презентация</span>
          <span>Санкт-Петербург</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end px-14 pb-20">
          <div className="text-[11px] uppercase tracking-[0.4em] text-red mb-6">Когда стоит рекомендовать</div>
          <h1 className="font-editorial text-[112px] leading-[0.92] tracking-[-0.03em]">
            Ирина<br />
            <span className="italic text-red">Ким</span>
          </h1>
          <div className="mt-10 max-w-[520px] text-[18px] leading-[1.55] text-paper/85">
            {heroCopy.role}. {heroCopy.lead}
          </div>
        </div>
        <div className="absolute right-14 top-24 w-[260px] aspect-square overflow-hidden rounded-full border border-paper/20">
          <img src={irinaAsset.url} alt="" crossOrigin="anonymous" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-x-14 bottom-8 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/50">
          <span>Ирина Ким · Эксперт по новостройкам СПб</span>
          <span>{String(nextPage()).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Intro */}
      <div data-pdf-page data-pdf-bg="#f5f2ed" className={`${PAGE} bg-milk text-ink px-14 pt-24`}>
        <div className="text-[11px] uppercase tracking-[0.4em] text-red mb-8">Введение</div>
        <h2 className="font-editorial text-[56px] leading-[1.05] max-w-[620px]">
          Квартира — это не про метры.<br />
          Это про <span className="italic text-red">образ жизни</span>.
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-12 max-w-[640px]">
          <p className="text-[17px] leading-[1.6]">
            Ирина разбирает не только объект, но и жизнь клиента: семью, работу, детей, маршруты, привычки и окружение.
          </p>
          <p className="text-[17px] leading-[1.6]">
            Результат — квартира, где действительно комфортно жить, а не просто удачная сделка на бумаге.
          </p>
        </div>
        <PageChrome page={nextPage()} total={total} />
      </div>

      {sections.map((s) => (
        <SectionPage key={s.number} title={s.title} items={s.items} page={nextPage()} total={total} />
      ))}

      {/* Quote */}
      <div data-pdf-page data-pdf-bg="#b4121c" className={`${PAGE} bg-red text-paper px-16 pt-20`}>
        <div className="font-editorial text-[130px] leading-none mt-6 opacity-30">“</div>
        <p className="font-editorial italic text-[38px] leading-[1.25] max-w-[640px] -mt-6">
          {quote.body}
        </p>
        <div className="mt-16 text-[12px] uppercase tracking-[0.35em] text-paper/80">
          Рекомендация · {quote.title}
        </div>
        <div className="absolute inset-x-14 bottom-8 flex items-end justify-between text-[10px] uppercase tracking-[0.3em] text-paper/60">
          <span>Ирина Ким · Эксперт по новостройкам СПб</span>
          <span>{String(nextPage()).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Contacts */}
      <div data-pdf-page data-pdf-bg="#ffffff" className={`${PAGE} bg-paper text-ink px-14 pt-16`}>
        <div className="text-[11px] uppercase tracking-[0.4em] text-red mb-6">Контакты</div>
        <h2 className="font-editorial text-[64px] leading-[1.02]">
          Давайте <span className="italic text-red">познакомимся</span>
        </h2>
        <div className="mt-12 max-w-2xl">
          <div className="font-editorial text-[32px]">{contacts.name}</div>
          <div className="text-[12px] uppercase tracking-[0.3em] text-ink/60 mt-1">{contacts.role}</div>
          <Rule className="mt-8" />
          <dl className="mt-8 space-y-6 text-[17px]">
            <div className="flex justify-between gap-6">
              <dt className="uppercase tracking-[0.25em] text-[11px] text-ink/60 w-32 pt-1">Телефон</dt>
              <dd className="flex-1 font-editorial text-[22px]">{contacts.phone}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="uppercase tracking-[0.25em] text-[11px] text-ink/60 w-32 pt-1">Instagram</dt>
              <dd className="flex-1 font-editorial text-[22px]">{contacts.instagram}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="uppercase tracking-[0.25em] text-[11px] text-ink/60 w-32 pt-1">Telegram</dt>
              <dd className="flex-1 font-editorial text-[22px]">{contacts.telegram}</dd>
            </div>
          </dl>
        </div>
        <PageChrome page={nextPage()} total={total} />
      </div>
    </div>
  );
});

PdfDocument.displayName = "PdfDocument";