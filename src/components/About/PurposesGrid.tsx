"use client"

import { Icon } from "@iconify/react/dist/iconify.js";

const purposes = [
  {
    icon: "mdi:home-group",
    title: "Settlement & Housing",
    text: "To provide social, educational, employment, and settlement services including housing support to refugees and immigrants without excluding other persons of cultural backgrounds.",
  },
  {
    icon: "mdi:translate",
    title: "Language & Information",
    text: "To assist newcomers and refugees by providing interpretation, translation, information, referrals, and Canadian life skills support.",
  },
  {
    icon: "mdi:compass-outline",
    title: "Newcomer Orientation",
    text: "To offer structured orientation sessions covering Canadian culture, rights, responsibilities, healthcare, education, and daily life skills.",
  },
  {
    icon: "mdi:earth",
    title: "Cultural Understanding",
    text: "To promote community development, cultural understanding, and the Canadian multiculturalism concept to new immigrants and refugees.",
  },
  {
    icon: "mdi:hand-coin-outline",
    title: "Fundraising & Partnerships",
    text: "To actively seek private and government support to enhance opportunities and social development for our communities.",
  },
  {
    icon: "mdi:account-voice",
    title: "Active Participation",
    text: "To encourage immigrant refugees to play a dynamic role in Canadian society and build meaningful community connections.",
  },
  {
    icon: "mdi:hub-outline",
    title: "Community Network",
    text: "To work closely with associations, community organizations, and settlement services providers to establish a strong support network.",
  },
  {
    icon: "mdi:account-group-outline",
    title: "Youth & Family Programs",
    text: "To provide workshops, seminars, leadership training, family counselling, parenting programs, and youth development for immigrant families and newcomers in British Columbia.",
  },
  {
    icon: "mdi:school-outline",
    title: "Advancement of Education",
    text: "To advance education by offering programs, classes, workshops, and learning resources related to studies, language, culture, and community knowledge.",
  },
  {
    icon: "mdi:hand-heart-outline",
    title: "Relief of Poverty",
    text: "To relieve poverty and hardship by providing assistance, basic necessities, charitable aid, and community support programs to individuals and families in need.",
  },
  {
    icon: "mdi:leaf",
    title: "Community Well-Being",
    text: "To carry out activities that promote social inclusion, cultural understanding, moral development, and well-being for newcomers, youth, seniors, and vulnerable community members.",
  },
  {
    icon: "mdi:handshake-outline",
    title: "Sponsorship & Resettlement",
    text: "To connect refugees with sponsors and coordinate community sponsorship programs that provide a foundation for a new life in Canada.",
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
