import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ServiceData } from "@/app/api/data";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "Our Services | OCRSS",
};

const Page = () => {
  return (
    <>
      <HeroSub title="Our Services" />
      <section className="lg:py-28 py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-medium mb-4" data-aos="fade-up">
              How We Support Our Community
            </h2>
            <p
              className="text-base text-muted dark:text-white/60"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Oromo Cultural Resettlement Services Society provides practical
              services, education, and community programs that help Oromo
              refugees, immigrants, and other newcomers build a safe, dignified
              life in British Columbia.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {ServiceData.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-white dark:bg-darkmode rounded-md shadow-cause-shadow dark:shadow-darkmd h-full flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <div className="overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={350}
                      height={250}
                      className="w-full h-[220px] object-cover group-hover:scale-110 duration-300 scale-[1.01]"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted dark:text-white/60 text-sm mb-4">
                      {service.subtitle}
                    </p>
                    <h5 className="text-error group-hover:text-warning text-base font-medium flex gap-3 items-center w-fit mt-auto">
                      Learn More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <Icon
                          icon="solar:arrow-right-linear"
                          width="20"
                          height="20"
                        />
                      </span>
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center mt-16">
            <h3
              className="text-2xl font-semibold mb-3"
              data-aos="fade-up"
            >
              Our Purpose
            </h3>
            <p
              className="text-base text-muted dark:text-white/60"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              We exist to provide social, educational, employment, and
              settlement services to Oromo refugees and immigrants, without
              excluding other cultural communities. Guided by our constitution,
              we promote cultural understanding and Canadian multiculturalism,
              seek support to expand opportunities and social development, and
              work closely with other organizations to build an inclusive,
              welcoming community in British Columbia.
            </p>
          </div>
        </div>
      </section>
      <Volunteer />
    </>
  );
};

export default Page;
