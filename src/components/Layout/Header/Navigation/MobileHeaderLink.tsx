import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const path = usePathname();

  let navString

  const counterLetter = item.label.slice(-1);
  if (counterLetter === "s") {
    navString = item.label.toLowerCase().substring(item.label.length - 1, - 1);
  } else {
    navString = item.label.toLowerCase();
  }

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center justify-between w-full py-2 px-3 rounded-md ${path.startsWith(`/${navString}`) ? "bg-primary! text-white!" : null} ${path === item.href ? "bg-primary! text-white!" : ""}`}
      >
        <Link
          href={item.href}
          className={`flex-1 text-black dark:text-white/60 focus:outline-hidden ${path.startsWith(`/${navString}`) ? "text-white!" : ""} ${path === item.href ? "text-white!" : ""}`}
        >
          {item.label}
        </Link>
        {item.submenu && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleToggle();
            }}
            className="p-1 -mr-1 text-black dark:text-white/60 focus:outline-hidden touch-manipulation"
            aria-expanded={submenuOpen}
            aria-label={submenuOpen ? "Close submenu" : "Open submenu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
              className={`transition-transform ${submenuOpen ? "rotate-180" : ""}`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          </button>
        )}
      </div>
      {submenuOpen && item.submenu && (
        <div className="bg-white dark:bg-dark p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block py-2 px-3 text-gray-500  ${path === subItem.href ? "text-primary!" : null}`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
