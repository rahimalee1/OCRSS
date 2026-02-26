"use client"
import { ServiceData } from "@/app/api/data";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const serviceIcons = [
    "mdi:earth",
    "mdi:translate",
    "mdi:briefcase-outline",
    "mdi:account-group-outline",
    "mdi:account-child-outline",
    "mdi:school-outline",
    "mdi:hand-heart-outline",
    "mdi:leaf",
    "mdi:handshake-outline",
];

const Causes = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
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
                <h2 className="text-center text-3xl font-medium mb-3" data-aos="fade-left">
                    Our Services
                </h2>
                <p className="text-base text-muted dark:text-white/60 text-center">
                Practical services, education, and community programs that help newcomers <br className="lg:block hidden" /> build a safe, dignified life in British Columbia.
                </p>
                <div className="mt-20">
                    <Slider {...settings}>
                        {ServiceData.map((item, index) => (
                            <div key={index} className="px-4">
                                <Link href={`/services/${item.slug}`}>
                                    <div className="group bg-white dark:bg-dark rounded-lg p-8 text-center h-[280px] flex flex-col items-center justify-center shadow-cause-shadow dark:shadow-darkmd hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                                            <Icon
                                                icon={serviceIcons[index] || "mdi:star-outline"}
                                                className="text-3xl text-primary group-hover:text-white transition-colors duration-300"
                                            />
                                        </div>
                                        <h4 className="text-lg font-bold text-midnight_text dark:text-white group-hover:text-primary mb-3 line-clamp-2 transition-colors duration-300">
                                            {item.title}
                                        </h4>
                                        <p className="text-muted dark:text-white/80 text-sm leading-relaxed line-clamp-3">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Causes;
