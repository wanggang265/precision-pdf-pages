type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageIntro({ eyebrow, title, description, className = "max-w-3xl" }: PageIntroProps) {
  return (
    <div className={className}>
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{eyebrow}</div>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
