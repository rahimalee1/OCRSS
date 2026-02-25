import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutCTA from "@/components/About/CTA";

export const metadata: Metadata = {
  title: "About Us | OCRSS",
};

const purposes = [
  {
    letter: "a",
    title: "Settlement & Social Services",
    text: "To provide social, educational, employment, and settlement services to refugees and immigrants of Oromo without excluding other persons of cultural backgrounds.",
  },
  {
    letter: "b",
    title: "Newcomer Assistance",
    text: "To assist newcomers and refugees by providing them with services such as interpretation and translation, information, and referrals, pre-employment program, newcomer's orientation, and Canadian life skills in general.",
  },
  {
    letter: "c",
    title: "Community Development & Multiculturalism",
    text: "To promote community development ideas, cultural understanding, and Canadian multiculturalism concept to new immigrants and refugees.",
  },
  {
    letter: "d",
    title: "Advocacy & Partnerships",
    text: "To actively seek private and government support to enhance opportunities and social development.",
  },
  {
    letter: "e",
    title: "Active Participation",
    text: "To encourage immigrant refugees to play a dynamic role in Canadian society.",
  },
  {
    letter: "f",
    title: "Community Network",
    text: "Work closely with other associations, community organizations, and settlement services providers to establish a community network.",
  },
  {
    letter: "g",
    title: "Youth & Community Programs",
    text: "To provide community programs and services to immigrant youth, refugees, and Canadians in general.",
  },
  {
    letter: "h",
    title: "Workshops & Family Counselling",
    text: "Design a series of community workshops, seminars, leadership, and family counselling, community development training, community forums, parenting programs, children, and youth programs for immigrant families, newcomers, and refugees in British Columbia.",
  },
  {
    letter: "I",
    title: "Advancement of Education",
    text: "To advance education by offering programs, classes, workshops, and learning resources related to studies, language, culture, ethics, and community knowledge, including educational activities for youth, adults, and families.",
  },
  {
    letter: "J",
    title: "Relief of Poverty",
    text: "To relieve poverty and hardship by providing assistance and support to individuals and families in need, including necessities, charitable aid, and community support programs.",
  },
  {
    letter: "K",
    title: "Community Benefit & Well-Being",
    text: "To carry out activities that promote social inclusion, cultural understanding, moral development, and community well-being, including programs that support newcomers, youth, seniors, and vulnerable members of the community.",
  },
];

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
                a registered BC non-profit society (Incorporation Number: S0080269) dedicated to empowering and
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
              Constitutional Purposes
            </h2>
            <p className="text-muted dark:text-white/60 text-base max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              As a registered society under the BC Societies Act, OCRSS is committed to the following purposes
              as outlined in our Constitution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {purposes.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark rounded-lg p-8 shadow-cause-shadow dark:shadow-darkmd hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={`${(index % 3) * 100}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-lg">{item.letter}</span>
                </div>
                <h4 className="text-lg font-bold text-midnight_text dark:text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-muted dark:text-white/60 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Counter */}
      <section className="py-16 bg-linear-to-r from-primary to-secondary">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-aos="fade-up">
              <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
              <p className="text-white/80">Families Supported</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
              <p className="text-white/80">Volunteers</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-4xl font-bold text-white mb-2">20+</h3>
              <p className="text-white/80">Community Events</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
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
