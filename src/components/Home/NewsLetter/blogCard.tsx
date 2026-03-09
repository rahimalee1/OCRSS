import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
    const { title, coverImage, excerpt, date, slug } = blog;
    return (
        <>
            <Link href={`/blog/${slug}`} className="group flex items-center gap-8">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm">
                    <Image
                        src={coverImage!}
                        alt="image"
                        fill
                        className="object-cover group-hover:scale-110 duration-300"
                    />
                </div>
                <div className="">
                    <h4 className="font-medium text-lg group-hover:text-primary mb-3">
                        {title}
                    </h4>
                    <p className="text-muted dark:text-white/60 text-base">
                        by OCRSS Team {date ? `/ ${format(new Date(date), "dd MMM yyyy")}` : ""}
                    </p>
                </div>
            </Link>
        </>
    )
}

export default BlogCard;
