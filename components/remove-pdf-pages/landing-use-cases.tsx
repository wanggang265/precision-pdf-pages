export function RemovePdfUseCases() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">When to use it</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            Common ways to use a PDF page remover
          </h2>
        </div>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Remove blank pages scanned into a document.
          </li>
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Delete confidential pages before sharing a report.
          </li>
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Cut down a long presentation to only the slides you need.
          </li>
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Strip outdated appendix pages from a contract or manual.
          </li>
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Clean up a PDF before printing or emailing.
          </li>
          <li className="rounded-[16px] border border-slate-100 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-4">
            Prepare a final draft by removing draft or comment pages.
          </li>
        </ul>
      </div>
    </section>
  );
}
