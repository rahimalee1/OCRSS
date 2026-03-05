import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, coverImage, excerpt, date, slug } = blog;
    return (
        <Link href={`/blog/${slug}`} className="group flex flex-col h-full rounded-xl overflow-hidden shadow-cause-shadow dark:shadow-darkmd bg-white dark:bg-dark border border-border dark:border-dark_border hover:shadow-lg transition-shadow duration-300">
            <div className="overflow-hidden w-full h-52 flex-shrink-0">
                <Image
                    src={coverImage}
                    alt={title ?? "Blog post"}
                    width={600}
                    height={208}
                    className="w-full h-full object-cover group-hover:scale-105 duration-300"
                />
            </div>
            <div className="flex flex-col flex-1 p-5">
                <span className="text-sm text-gray-400 mb-2">
                    {format(new Date(date), "MMM dd yyyy")}
                </span>
                <h5 className="text-base leading-snug font-semibold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h5>
                <p className="text-primary text-sm font-medium mt-auto flex items-center gap-1">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </p>
            </div>
        </Link>
    );
};

export default BlogCard;