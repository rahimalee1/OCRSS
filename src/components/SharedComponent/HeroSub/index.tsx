import React, { FC } from "react";

interface HeroSubProps {
    title: string;
    backgroundImage?: string;
}

const HeroSub: FC<HeroSubProps> = ({ title, backgroundImage = "/images/background/herosub-banner.png" }) => {

    return (
        <>
            <section className="relative w-full min-w-0 pt-36 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24 bg-dark bg-no-repeat bg-center overflow-hidden bg-cover min-h-[280px] md:min-h-[360px] lg:min-h-[400px]" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                    <h2 className="text-white md:text-6xl text-4xl font-medium" data-aos="fade-right">{title}</h2>
                </div>
            </section>
        </>
    );
};

export default HeroSub;