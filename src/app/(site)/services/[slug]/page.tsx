"use client";
import { useParams } from "next/navigation";
import { ServiceData } from "@/app/api/data";
import Volunteer from "@/components/SharedComponent/Volunteer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = ServiceData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-44 pb-24 text-center dark:bg-dark">
        <h2 className="text-2xl font-medium">Service not found</h2>
        <Link href="/services" className="text-primary mt-4 inline-block hover:underline">
          Back to all services
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="dark:bg-dark pt-44 pb-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="lg:col-span-8 col-span-12">
              <div className="rounded-lg overflow-hidden mb-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={870}
                  height={500}
                  className="w-full h-auto object-cover"
                  quality={100}
                />
              </div>
              <h1 className="text-[40px] leading-tight font-semibold mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-primary font-medium mb-8">
                {service.subtitle}
              </p>
              <p className="text-base text-muted dark:text-white/60 mb-10 leading-relaxed">
                {service.detail}
              </p>

              <div className="bg-grey dark:bg-darkmode rounded-lg p-8 border border-border dark:border-dark_border">
                <h3 className="text-xl font-semibold mb-6">What We Provide</h3>
                <ul className="space-y-4">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="mt-1 shrink-0">
                        <Icon
                          icon="solar:check-circle-bold"
                          width="20"
                          height="20"
                          className="text-primary"
                        />
                      </span>
                      <span className="text-base text-muted dark:text-white/70">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 col-span-12 lg:mt-0 mt-8">
              <div className="sticky top-36">
                <h4 className="text-lg font-medium mb-6">All Services</h4>
                <ul className="flex flex-col gap-2">
                  {ServiceData.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors duration-200 ${
                          s.slug === slug
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted dark:text-white/60 hover:bg-grey dark:hover:bg-darkmode hover:text-primary"
                        }`}
                      >
                        <Icon
                          icon="solar:arrow-right-linear"
                          width="16"
                          height="16"
                          className="shrink-0"
                        />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center justify-between">
                  <h5 className="text-lg font-medium">Share</h5>
                  <div className="flex items-center gap-4">
                    <Link href="#">
                      <Image
                        src="/images/icons/icon-facebook.svg"
                        alt="Facebook"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </Link>
                    <Link href="#">
                      <Image
                        src="/images/icons/icon-instagram.svg"
                        alt="Instagram"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </Link>
                    <Link href="#">
                      <Image
                        src="/images/icons/icon-linkedin.svg"
                        alt="LinkedIn"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </Link>
                    <Link href="#">
                      <Image
                        src="/images/icons/icon-twitter.svg"
                        alt="Twitter"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Volunteer />
    </>
  );
};

export default ServiceDetail;
