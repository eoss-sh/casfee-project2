import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  buttonLink?: string;
  buttonText?: string;
}

const Hero = ({
  title,
  subtitle,
  image,
  buttonLink,
  buttonText,
}: HeroProps) => {
  return (
    <section className="hero">
      <img className="hero-image" src={image} alt="hero" />
      <div className="container">
        <h1 className="hero-title">{title}</h1>
        <h4 className="hero-subtitle">{subtitle}</h4>
        {buttonLink && (
          <Link to={buttonLink}>
            <Button variant="secondary">{buttonText}</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;
