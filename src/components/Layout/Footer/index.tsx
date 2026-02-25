import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../Header/Logo";
import { footerLinks } from "@/app/api/data";
import { Icon } from "@iconify/react/dist/iconify.js";

const Footer: FC = () => {
  return (
    <footer className="pt-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 pb-10 ">
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <Logo />
            <div className="mt-6">
              <p className="text-sm font-light text-muted dark:text-white/60 mb-6">
                Oromo Cultural Resettlement Services Society (OCRSS) is a registered BC non-profit
                dedicated to empowering refugees, immigrants, and newcomer communities in British Columbia.
              </p>
              <p className="text-sm font-light text-muted dark:text-white/60 mb-0">
                Our programs focus on settlement, education, employment, and community integration —
                ensuring equitable opportunities for all.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <div className="lg:pl-10">
              <div className="flex items-start mb-8 gap-4">
                <Image
                  src="/images/icons/icon-pin.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <div className="">
                  <h5 className="text-sm text-midnight_text dark:text-white mb-4">
                    OCRSS Head Office
                  </h5>
                  <p className="text-sm text-muted dark:text-white/60">
                    3, 3025 Nanaimo Street, Vancouver, BC. V5N 5W6 -
                    CANADA
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-8 gap-4">
                <Image
                  src="/images/icons/icon-phone.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <div className="">
                  <Link
                    href="https://wa.me/16042201449"
                    target="_blank"
                    className="text-sm text-midnight_text dark:text-white mb-0 hover:text-primary!"
                  >
                    +1 (604) 220-1449
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/icons/icon-mail.svg"
                  alt="icon"
                  width={24}
                  height={24}
                />
                <div className="">
                  <Link
                    href="https://mail.google.com/mail/?view=cm&to=oromocultural@gmail.com"
                    target="_blank"
                    className="text-sm text-midnight_text dark:text-white mb-0 hover:text-primary!"
                  >
                    oromocultural@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h4 className="text-base text-midnight_text dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="pl-5">
              {footerLinks.slice(0, 5).map((item, index) => (
                <li key={index} className="mb-5">
                  <Link
                    href={item.href}
                    className="text-sm relative text-muted dark:text-white/60 hover:text-primary dark:hover:text-primary hover:before:border-primary before:content-[''] before:absolute before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:top-1 before:-left-5 before:rotate-45"
                  >
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h4 className="text-base text-midnight_text dark:text-white mb-4">
              Our Services
            </h4>
            <ul className="pl-5">
              {footerLinks.slice(5, 10).map((item, index) => (
                <li key={index} className="mb-5">
                  <Link
                    href={item.href}
                    className="text-sm relative text-muted dark:text-white/60 hover:text-primary dark:hover:text-primary hover:before:border-primary before:content-[''] before:absolute before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:top-1 before:-left-5 before:rotate-45"
                  >
                    {item.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border dark:border-dark_border">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex items-center justify-between py-6 lg:flex-nowrap flex-wrap lg:gap-0 gap-4">
          <p className="text-sm text-midnight_text dark:text-white">
            © {new Date().getFullYear()} OCRSS — Oromo Cultural Resettlement Services Society. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#">
              <Icon
                icon="ri:facebook-fill"
                className="text-xl text-midnight_text dark:text-white hover:text-primary! cursor-pointer"
              />
            </Link>
            <Link href="#">
              <Icon
                icon="mdi:instagram"
                className="text-xl text-midnight_text dark:text-white hover:text-primary! cursor-pointer"
              />
            </Link>
            <Link href="#">
              <Icon
                icon="ri:linkedin-fill"
                className="text-xl text-midnight_text dark:text-white hover:text-primary! cursor-pointer"
              />
            </Link>
            <Link href="#">
              <Icon
                icon="line-md:twitter-x-alt"
                className="text-base text-midnight_text dark:text-white hover:text-primary! cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
