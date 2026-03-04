import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Services list", href: "/services" },
      { label: "Services details", href: "/services/housing-support" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    submenu: [
      { label: "Events list", href: "/events" },
      { label: "Events details", href: "/events/bc-safe-haven-teacher-training" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    submenu: [
      { label: "Blog list", href: "/blog" },
      { label: "Blog details", href: "/blog/blog_1" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
