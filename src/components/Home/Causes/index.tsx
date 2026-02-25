"use client"
import { ServiceData } from "@/app/api/data";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
                                    <div className="bg-white group dark:bg-dark rounded-4 overflow-hidden">
                                        <div className="overflow-hidden h-[220px]">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={350}
                                                height={220}
                                                className="w-full h-full object-cover group-hover:scale-110 duration-300"
                                            />
                                        </div>
                                        <div className="px-8 pt-8 pb-6 shadow-cause-shadow dark:shadow-darkmd h-[200px] flex flex-col">
                                            <h4 className="text-lg font-bold dark:text-white group-hover:text-primary mb-3 line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-muted dark:text-white/80 text-sm leading-relaxed line-clamp-3">
                                                {item.subtitle}
                                            </p>
                                        </div>
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
