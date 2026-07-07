export function RemovePdfWhatIs() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">What it is</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            A simple PDF page remover that runs in your browser
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            A PDF page remover lets you delete selected pages from a PDF file and save the cleaned result. Everything happens locally in your browser, so your document never leaves your device unless you choose to process a larger file with credits.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This is useful for stripping blank pages, removing outdated sections, or trimming a long report down to only the pages you need. Unlike desktop software, there is nothing to install, and you can use it on any computer or phone with an internet connection. It is also free for most everyday documents.
          </p>
        </div>
      </div>
    </section>
  );
}
