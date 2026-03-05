"use client"

import { helpdata } from "@/app/api/data";
import { Icon } from "@iconify/react/dist/iconify.js";

const helpIcons = [
    "mdi:hand-heart-outline",
    "mdi:cash-multiple",
    "mdi:account-group-outline",
];

const Help = () => {
    return (
        <section className="lg:py-28 py-16 bg-white dark:bg-dark">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
                <div className="text-center">
                    <h2 className="text-3xl mb-3 font-medium" data-aos-delay={'100'} data-aos="fade-right">
                        How can you help us?
                    </h2>
                    <p className="text-muted dark:text-white/60 text-base">
                        Support our mission through donations, funding, or volunteering.<br className="lg:block hidden" /> Together we can strengthen settlement, education, and community services for newcomers in British Columbia.
                    </p>
                    <div className="mt-20 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                        {helpdata.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-grey dark:bg-darkmode rounded-lg p-8 text-center flex flex-col items-center justify-center shadow-cause-shadow dark:shadow-darkmd hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border dark:border-dark_border"
                                data-aos="fade-up"
                                data-aos-delay={`${index * 150}`}
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                                    <Icon
                                        icon={helpIcons[index] || "mdi:star-outline"}
                                        className="text-3xl text-primary group-hover:text-white transition-colors duration-300"
                                    />
                                </div>
                                <h4 className="text-lg font-bold text-midnight_text dark:text-white group-hover:text-primary mb-3 transition-colors duration-300">
                                    {item.title}
                                </h4>
                                <p className="text-muted dark:text-white/80 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Help;
