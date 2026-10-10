export function PageHeader({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="mx-auto w-full max-w-page px-gutter pt-2xl pb-xl sm:px-gutter-lg md:pt-3xl">
      <div className="max-w-content">
        <h1 className="text-title font-semibold tracking-tight" data-motion="enter">
          {title}
        </h1>
        <div className="mt-6 flex w-24 flex-col" aria-hidden="true" data-motion="draw">
          <span className="h-1 bg-curtain" />
          <span className="h-1.5 bg-ornament" />
        </div>
        <p className="mt-lg max-w-content text-body-lg">{lede}</p>
      </div>
    </header>
  );
}
