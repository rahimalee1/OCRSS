import Link from "next/link";
import { getAllPosts } from "@/utils/markdown";
import BlogCard from "./blogCard";
import ContactTeaserForm from "./ContactTeaserForm";

const Newsletter = () => {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-44">
          <div data-aos="fade-left">
            <div className="mb-8">
              <p className="text-base text-primary mb-3">Contact us</p>
              <h2 className="text-3xl font-medium mb-6">
                Get in touch about new and upcoming causes
              </h2>
              <p className="text-base text-muted dark:text-white/60">
                Have a question, idea, or partnership in mind? Send us a message and
                stay connected with the latest causes, initiatives, and community
                projects.
              </p>
            </div>
            <ContactTeaserForm />
          </div>
          <div className="lg:mt-0 mt-8">
            <div className="flex justify-between items-center border-b border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark pb-6 mb-8 focus-visible:outline-none-10">
              <h4 className="text-base mb-0">Latest from OCRSS</h4>
              <Link href="/blog" className="text-error hover:text-warning text-base">
                View all
              </Link>
            </div>
            {posts.slice(0, 3).map((blog, i) => (
              <div
                key={i}
                className="lg:mb-10 mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;