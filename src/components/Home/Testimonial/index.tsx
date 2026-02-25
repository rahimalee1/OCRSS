"use client"
import { Reviews } from "@/app/api/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const UserIcon = ({ name }: { name: string }) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    return (
        <div className="w-[60px] h-[60px] rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center absolute -top-4 -left-20">
            <span className="text-white font-bold text-lg">{initials}</span>
        </div>
    );
};

const Testimonial = () => {
    const settings = {
        autoplay: true,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 100,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <section className="lg:py-28 py-16 bg-grey dark:bg-darkmode">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <h2 className="text-3xl font-medium mb-3 text-center" data-aos="fade-left">
                    What People Say About Us
                </h2>
                <p className="text-base text-center text-muted dark:text-white/60 lg:max-w-60% mx-auto">
                    Hear from community members, volunteers, and supporters who have experienced the impact of our services first-hand.
                </p>
                <div className="mt-20 testimonial-slider">
                    <Slider {...settings}>
                        {Reviews.map((item, index) => (
                            <div key={index} className="px-3 h-full" data-aos="fade-up" data-aos-delay={`${index * 180}`}>
                                <div className="bg-white dark:bg-dark pt-12 pb-6 pr-16 pl-10 rounded-md relative h-full flex flex-col">
                                    <div className="absolute bg-linear-to-r from-primary to-secondary py-2 pr-6 pl-24 top-11 left-0 flex">
                                        <div className="relative">
                                            <UserIcon name={item.clientName} />
                                            <p className="text-white text-lg">
                                                {item.clientName}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-base text-muted dark:text-white/60 mt-24 flex-1">
                                        {item.review}
                                    </p>
                                    <h5 className="text-base pt-7 mt-7 relative before:content-[''] before:absolute before:w-28 before:h-px before:bg-border dark:before:bg-dark_border before:top-0 before:left-0">
                                        {item.post}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;
