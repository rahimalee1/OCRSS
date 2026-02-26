import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutCTA from "@/components/About/CTA";
import PurposesGrid from "@/components/About/PurposesGrid";

export const metadata: Metadata = {
  title: "About Us | OCRSS",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="pt-36 pb-16 bg-linear-to-r from-primary to-secondary">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">
            About Us
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Building stronger communities and safer futures for newcomers in British Columbia.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="lg:py-28 py-16 bg-white dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/causes/cause-1.jpg"
                  alt="OCRSS Community"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            <div data-aos="fade-left">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6">
                Building Stronger Communities Every Day
              </h2>
              <p className="text-muted dark:text-white/60 text-base mb-6 leading-relaxed">
                The <strong className="text-midnight_text dark:text-white">Oromo Cultural Resettlement Services Society (OCRSS)</strong> is
                a registered BC non-profit society dedicated to empowering and
                advocating for refugees, immigrants, and newcomer communities in British Columbia.
              </p>
              <p className="text-muted dark:text-white/60 text-base mb-8 leading-relaxed">
                Our programs focus on settlement services, education, employment support, community integration,
                and cultural understanding — ensuring equitable opportunities for all. We work closely with
                associations, community organizations, and settlement services providers to establish a strong
                community network.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-darkprimary transition-colors font-medium"
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission / Constitutional Purposes */}
      <section className="lg:py-28 py-16 bg-grey dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2" data-aos="fade-up">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-4" data-aos="fade-up" data-aos-delay="100">
              What We Stand For
            </h2>
            <p className="text-muted dark:text-white/60 text-base max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Our work is guided by a clear set of principles that shape every program and service we offer
              to newcomers and communities across British Columbia.
            </p>
          </div>
          <PurposesGrid />
        </div>
      </section>

      {/* Stats / Counter */}
      <section className="py-16 bg-linear-to-r from-primary to-secondary">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div data-aos="fade-up">
              <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
              <p className="text-white/80">Volunteers</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-4xl font-bold text-white mb-2">20+</h3>
              <p className="text-white/80">Community Events</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-4xl font-bold text-white mb-2">10+</h3>
              <p className="text-white/80">Programs & Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <AboutCTA />
    </main>
  );
}
