import React, { FC } from "react";

interface HeroSubProps {
    title: string;
}

const HeroSub: FC<HeroSubProps> = ({ title }) => {

    return (
        <>
            <section className="relative w-full min-w-0 pt-44 pb-40 bg-dark bg-[url('/images/background/herosub-banner.png')] bg-no-repeat bg-center overflow-hidden bg-[length:100%_auto] min-h-[320px] md:min-h-[380px]">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                    <h2 className="text-white md:text-6xl text-4xl font-medium" data-aos="fade-right">{title}</h2>
                </div>
            </section>
        </>
    );
};

export default HeroSub;