"use client"

import { Icon } from "@iconify/react/dist/iconify.js";

const purposes = [
  {
    icon: "mdi:home-group",
    title: "Settlement & Social Services",
    text: "To provide social, educational, employment, and settlement services to refugees and immigrants of Oromo without excluding other persons of cultural backgrounds.",
  },
  {
    icon: "mdi:translate",
    title: "Newcomer Assistance",
    text: "To assist newcomers and refugees by providing them with services such as interpretation and translation, information, and referrals, pre-employment program, newcomer's orientation, and Canadian life skills in general.",
  },
  {
    icon: "mdi:earth",
    title: "Community Development & Multiculturalism",
    text: "To promote community development ideas, cultural understanding, and Canadian multiculturalism concept to new immigrants and refugees.",
  },
  {
    icon: "mdi:handshake-outline",
    title: "Advocacy & Partnerships",
    text: "To actively seek private and government support to enhance opportunities and social development.",
  },
  {
    icon: "mdi:account-voice",
    title: "Active Participation",
    text: "To encourage immigrant refugees to play a dynamic role in Canadian society.",
  },
  {
    icon: "mdi:hub-outline",
    title: "Community Network",
    text: "Work closely with other associations, community organizations, and settlement services providers to establish a community network.",
  },
  {
    icon: "mdi:account-group-outline",
    title: "Youth & Community Programs",
    text: "To provide community programs and services to immigrant youth, refugees, and Canadians in general.",
  },
  {
    icon: "mdi:school-outline",
    title: "Workshops & Family Counselling",
    text: "Design a series of community workshops, seminars, leadership, and family counselling, community development training, community forums, parenting programs, children, and youth programs for immigrant families, newcomers, and refugees in British Columbia.",
  },
  {
    icon: "mdi:book-education-outline",
    title: "Advancement of Education",
    text: "To advance education by offering programs, classes, workshops, and learning resources related to studies, language, culture, ethics, and community knowledge, including educational activities for youth, adults, and families.",
  },
  {
    icon: "mdi:hand-heart-outline",
    title: "Relief of Poverty",
    text: "To relieve poverty and hardship by providing assistance and support to individuals and families in need, including necessities, charitable aid, and community support programs.",
  },
  {
    icon: "mdi:leaf",
    title: "Community Benefit & Well-Being",
    text: "To carry out activities that promote social inclusion, cultural understanding, moral development, and community well-being, including programs that support newcomers, youth, seniors, and vulnerable members of the community.",
  },
];

const PurposesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {purposes.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-dark rounded-lg p-8 shadow-cause-shadow dark:shadow-darkmd hover:shadow-lg transition-shadow"
          data-aos="fade-up"
          data-aos-delay={`${(index % 3) * 100}`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon icon={item.icon} className="text-2xl text-primary" />
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
  );
};

export default PurposesGrid;
