import LatestBlog from "@/components/Blog/LatestBlog";
import Volunteer from "@/components/SharedComponent/Volunteer";
import NewsletterSignup from "@/components/SharedComponent/NewsletterSignup";
import { getAllPosts, getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FACEBOOK_URL, LINKEDIN_URL, X_URL } from "@/lib/social-links";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: any) {
  const data = await params;
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const post = getPostBySlug(data.slug, [
    "title",
    "author",
    "content",
    "metadata",
  ]);

  const siteName = process.env.SITE_NAME || "Your Site Name";
  const authorName = process.env.AUTHOR_NAME || "Your Author Name";

  if (post) {
    const metadata = {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    return metadata;
  } else {
    return {
      title: "Not Found",
      description: "No blog article has been found",
      author: authorName,
      robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function Post({ params }: any) {
  const data = await params;
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const post = getPostBySlug(data.slug, [
    "title",
    "author",
    "authorImage",
    "content",
    "coverImage",
    "date",
  ]);

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <section className=" relative pt-44 dark:bg-dark px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row">
                <span className="text-base text-midnight_text font-medium dark:text-white pr-7 border-r border-solid border-grey dark:border-white w-fit">
                  {format(new Date(post.date), "dd MMM yyyy")}
                </span>
                <span className="text-base text-midnight_text font-medium dark:text-white sm:pl-7 pl-0 w-fit">OCRSS Blog</span>
              </div>
              <h2 className="text-midnight_text dark:text-white text-[40px] leading-tight font-bold pt-7">
                {post.title}
              </h2>
            </div>
            <div className="flex items-center md:justify-center justify-start gap-6 col-span-4 pt-4 md:pt-0">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#2cdd9b"/>
                  <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#2cdd9b" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="">
                <span className="text-[22px] leading-tight font-bold text-midnight_text dark:text-white">OCRSS Team</span>
                <p className="text-xl text-gray dark:text-white">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-32 px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div
                className="z-20 mb-16 h-80 overflow-hidden rounded-sm md:h-45">
                <Image
                  src={post.coverImage}
                  alt="image"
                  width={1170}
                  height={766}
                  quality={100}
                  className="h-full w-full object-cover object-center rounded-3xl"
                />
              </div>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details markdown xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <div>
                    <div className="-mx-4 mb-8 flex flex-col">
                      <div className="w-full py-12 px-11 bg-white dark:bg-dark shadow-lg border-b-2 border-lightborder dark:border-dark_border rounded-t-lg">
                        <h2
                          className="wow fadeInUp relative mb-5 text-2xl dark:text-white text-black  sm:text-3xl"
                          data-wow-delay=".1s"
                        >
                          Share
                        </h2>
                        <div className="flex gap-4 flex-col">
                          <div className="bg-[#526fa3] py-4 px-6 text-20 rounded-lg text-white hover:brightness-110 transition-colors">
                            <Link href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center ">
                              <svg
                                className="svg-inline--fa fa-facebook-f me-3"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="facebook-f"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                width="12.5px"
                                height="20px"
                              >
                                <path
                                  fill="white"
                                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                />
                              </svg>
                              Facebook
                            </Link>
                          </div>
                          <div className="bg-[#000000] py-4 px-6 text-20 rounded-lg text-white hover:brightness-110 transition-colors">
                            <Link href={X_URL} target="_blank" rel="noopener noreferrer" className="flex items-center ">
                              <svg
                                className="svg-inline--fa fa-x me-3"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="x"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                height="21px"
                                width="21px"
                              >
                                <path
                                  fill="currentColor"
                                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                />
                              </svg>
                              X
                            </Link>
                          </div>
                          <div className="bg-[#3C86AD] py-4 px-6 text-20 rounded-lg text-white hover:brightness-110 transition-colors">
                            <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center ">
                              <svg
                                className="svg-inline--fa fa-linkedin-in me-3"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="linkedin-in"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                width="21.5px"
                                height="25px"
                              >
                                <path
                                  fill="currentColor"
                                  d="M100.28 448H7.4V148.9h92.78zM53.79 108.1C24.09 108.1 0 83.79 0 54.14 0 24.37 24.09 0 53.79 0 83.3 0 107.6 24.37 107.6 54.14c.1 29.64-24.2 53.96-53.81 53.96zM447.4 448h-92.68V302.4c0-34.7-.7-79.29-48.32-79.29-48.32 0-55.7 37.72-55.7 76.79V448H157.3V148.9h88.94v40.8h1.28c12.4-23.41 42.62-48.32 87.76-48.32 93.9 0 111.18 61.81 111.18 142.3V448z"
                                />
                              </svg>
                              LinkedIn
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="w-full py-12 px-11 bg-white dark:bg-dark shadow-lg rounded-b-lg">
                        <p className="text-24 mb-4">
                          Join our Newsletter
                        </p>
                        <NewsletterSignup source="Blog detail sidebar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-SnowySky dark:bg-darklight">
        <LatestBlog />
        <Volunteer />
      </div>
    </>
  );
}