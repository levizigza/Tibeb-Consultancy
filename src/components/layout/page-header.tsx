export function PageHeader({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="mx-auto w-full max-w-page px-gutter pt-2xl pb-xl sm:px-gutter-lg md:pt-3xl">
      <div className="max-w-content">
        <h1 className="text-title font-semibold tracking-tight" data-motion="enter">
          {title}
        </h1>
        <div className="regal-band mt-6 w-36 max-w-full" aria-hidden="true" data-motion="draw" />
        <p className="mt-lg max-w-content text-body-lg" data-motion="fade">
          {lede}
        </p>
      </div>
    </header>
  );
}
