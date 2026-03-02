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
                    <div className="mt-20 grid grid-cols-12 gap-8">
                        {helpdata.map((item, index) => (
                            <div key={index} className="md:col-span-4 sm:col-span-6 col-span-12 text-center flex flex-col gap-5 items-center justify-center" data-aos="fade-up" data-aos-delay={`${index * 150}`}>
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon
                                        icon={helpIcons[index] || "mdi:star-outline"}
                                        className="text-4xl text-primary"
                                    />
                                </div>
                                <h4 className="text-lg font-medium">
                                    {item.title}
                                </h4>
                                <p className="text-muted dark:text-white/60 text-base">
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
