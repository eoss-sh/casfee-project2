import {
  SmallHeroContainer,
  HeroSubTitel,
  HeroTitel,
  SmallHeroContent,
} from "../../styles/hero";
import { Container } from "../../styles/styles";

interface SmallHeroProps {
  title: string;
  subtitle?: string;
}

const SmallHero = ({ title, subtitle }: SmallHeroProps) => {
  return (
    <SmallHeroContainer>
      <Container>
        <SmallHeroContent>
          <HeroTitel>{title}</HeroTitel>
          <HeroSubTitel>{subtitle}</HeroSubTitel>
        </SmallHeroContent>
      </Container>
    </SmallHeroContainer>
  );
};

export default SmallHero;
