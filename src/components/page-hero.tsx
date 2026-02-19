type PageHeroProps = {
  title: string;
  description: string;
};

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="border-b border-white/10 bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">{description}</p>
      </div>
    </section>
  );
}
