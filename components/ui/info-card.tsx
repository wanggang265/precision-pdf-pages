import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function InfoCard({ title, children, className = "" }: InfoCardProps) {
  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:p-6 ${className}`.trim()}>
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <div className="mt-2 text-sm leading-7 text-slate-600">{children}</div>
    </div>
  );
}
