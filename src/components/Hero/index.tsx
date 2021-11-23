import React from 'react';
import { MainLink } from '../../styles/buttons';
import { HeroContainer, HeroImage, HeroSubTitel, HeroTitel } from '../../styles/hero';
import { Container } from '../../styles/styles';

interface HeroProps {
    title: string,
    subtitle?: string,
    image: string,
    buttonLink?: string,
    buttonText?: string 
}

const Hero = ({title, subtitle, image, buttonLink, buttonText}:HeroProps) => {

    return (
        <HeroContainer>
            <HeroImage src={image} />
            <Container>
                <HeroTitel>{title}</HeroTitel>
                <HeroSubTitel>{subtitle}</HeroSubTitel>
                {buttonLink && <MainLink href={buttonLink}>{buttonText}</MainLink>}
            </Container>
        </HeroContainer>
    )
}

export default Hero;