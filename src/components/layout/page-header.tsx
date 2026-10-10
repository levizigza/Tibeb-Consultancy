export function PageHeader({ title, lede }: { title: string; lede: string }) {
  return (
    <header className="mx-auto w-full max-w-page px-gutter pt-2xl pb-xl sm:px-gutter-lg md:pt-3xl">
      <div className="max-w-content">
        <h1 className="text-title font-semibold tracking-tight">{title}</h1>
        <p className="mt-lg max-w-content text-body-lg">{lede}</p>
      </div>
    </header>
  );
}
