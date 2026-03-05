import { Eventdata } from "@/app/api/data";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

const FutureEvents = () => {
  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <h2 className="text-3xl font-medium mb-3 text-midnight_text dark:text-white" data-aos="fade-left">Upcoming Events Near You</h2>
          <p className="text-base text-muted dark:text-white/60 mx-auto lg:max-w-60%">
            Join us at local events to make a difference! Connect, volunteer, and support our mission in your community.
          </p>
        </div>
        <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
          {Eventdata.slice(0, 3).map((item, index) => (
            <Link
              key={index}
              href={`/events/${item.slug}`}
              className="group flex flex-col h-full rounded-xl overflow-hidden shadow-cause-shadow dark:shadow-darkmd bg-white dark:bg-dark border border-border dark:border-dark_border hover:shadow-lg transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="overflow-hidden w-full h-52 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={208}
                  className="w-full h-full object-cover group-hover:scale-105 duration-300"
                />
              </div>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-sm text-gray-400 dark:text-white/50 mb-2">
                  {isNaN(new Date(item.date).getTime())
                    ? item.date
                    : format(new Date(item.date), "MMM dd yyyy")}
                </span>
                <h4 className="text-base leading-snug font-semibold text-midnight_text dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted dark:text-white/60 mb-4">{item.text}</p>
                <p className="text-primary text-sm font-medium mt-auto flex items-center gap-1">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureEvents;
