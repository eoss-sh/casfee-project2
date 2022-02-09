interface SmallHeroProps {
  title: string;
  subtitle?: string;
}

const SmallHero = ({ title, subtitle }: SmallHeroProps) => {
  return (
    <section className="smallhero">
      <div className="container">
        <section className="smallhero-content">
          <h1 className="smallhero-content__title">{title}</h1>
          <h4 className="smallhero-content__subtitle">{subtitle}</h4>
        </section>
      </div>
    </section>
  );
};

export default SmallHero;
