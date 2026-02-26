export const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "/#blog" },
];

export const helpdata: { icon: string; title: string; text: string }[] = [
  {
    icon: "/images/help/donation.svg",
    title: "Donate",
    text: "Your generous donations help us relieve poverty and hardship by providing direct assistance, basic necessities, and charitable aid to individuals and families in need.",
  },
  {
    icon: "/images/help/food-supply.svg",
    title: "Fund Our Programs",
    text: "Help us secure private and government support to enhance opportunities and social development for newcomers, refugees, and immigrants in British Columbia.",
  },
  {
    icon: "/images/help/volunteer.svg",
    title: "Volunteer",
    text: "Join our community programs and services! Volunteer your time to support settlement, education, youth mentorship, cultural events, and family support initiatives.",
  },
];

export interface ServiceItem {
  image: string;
  title: string;
  slug: string;
  subtitle: string;
  points: string[];
  detail: string;
}

export const ServiceData: ServiceItem[] = [
  {
    image: "/images/causes/cause-1.jpg",
    title: "Settlement & Resettlement Support",
    slug: "settlement-resettlement-support",
    subtitle:
      "We walk alongside newcomers from their first days in Canada.",
    points: [
      "Provide social, educational, employment, and settlement services to refugees and immigrants of Oromo without excluding other persons of cultural backgrounds.",
      "One\u2011to\u2011one orientation to life in Canada \u2013 housing, health, education, transportation, and local services.",
      "Newcomer\u2019s orientation to explain rights, responsibilities, and day\u2011to\u2011day life in British Columbia.",
      "Encourage immigrant refugees to play a dynamic role in Canadian society.",
    ],
    detail:
      "As stated in our Constitution \u2013 purpose (a) \u2013 OCRSS exists to provide social, educational, employment, and settlement services to refugees and immigrants of Oromo without excluding other persons of cultural backgrounds. From the very first day a newcomer arrives in Canada, our trained settlement workers provide one\u2011on\u2011one guidance on housing, healthcare, education, transportation, and government services. We develop personalized settlement plans that respect each family\u2019s unique background and needs while helping them navigate the Canadian system with confidence. In accordance with purpose (e), we actively encourage immigrant refugees to play a dynamic role in Canadian society, building the social networks that are vital to a successful transition.",
  },
  {
    image: "/images/causes/cause-2.jpg",
    title: "Language, Interpretation & Information Services",
    slug: "language-interpretation-information",
    subtitle:
      "Bridging language gaps so families can access what they need.",
    points: [
      "Interpretation and translation services for appointments, community services, and important documents.",
      "Information and referrals to community organizations, government services, and specialized supports.",
      "Canadian life\u2011skills and language support for adults and families.",
    ],
    detail:
      "Our Constitution \u2013 purpose (b) \u2013 mandates that OCRSS assist newcomers and refugees by providing services such as interpretation and translation, information, and referrals. Language barriers are one of the biggest obstacles newcomers face, and our services ensure that no one is left behind. We provide professional interpretation and translation for medical appointments, legal consultations, school meetings, and government interactions. Beyond interpretation, we connect families with community organizations, social services, and specialized supports through our comprehensive referral network. Our life\u2011skills programming helps adults and families build the everyday language confidence they need to navigate banking, grocery shopping, public transit, and more \u2013 empowering independence from day one.",
  },
  {
    image: "/images/causes/cause-3.jpg",
    title: "Employment & Pre\u2011Employment Support",
    slug: "employment-pre-employment-support",
    subtitle:
      "Opening doors to meaningful work and economic independence.",
    points: [
      "Pre\u2011employment programs to prepare newcomers for the Canadian workplace.",
      "Support with job search skills, r\u00e9sum\u00e9s, applications, and interview preparation.",
      "Guidance on education and training pathways to upgrade skills and credentials.",
    ],
    detail:
      "As outlined in our Constitution \u2013 purpose (b) \u2013 OCRSS provides a pre\u2011employment program to help newcomers and refugees enter the Canadian workforce. Economic independence is essential to building a new life. We offer workshops on Canadian workplace culture, resume writing, cover letters, and interview techniques. Our employment counsellors provide one\u2011on\u2011one coaching, helping individuals identify transferable skills, explore credential recognition pathways, and connect with employers who value diverse talent. We also guide newcomers toward education and training opportunities that can help them upgrade qualifications and unlock long\u2011term career growth.",
  },
  {
    image: "/images/causes/cause-4.jpg",
    title: "Community Development & Canadian Multiculturalism",
    slug: "community-development-multiculturalism",
    subtitle:
      "Promoting cultural understanding and the Canadian multiculturalism concept.",
    points: [
      "Promote community development ideas, cultural understanding, and Canadian multiculturalism concept to new immigrants and refugees.",
      "Encourage cross\u2011cultural dialogue between Oromo, Indigenous, and other communities in British Columbia.",
      "Organize cultural events, festivals, and public forums that celebrate diversity.",
      "Foster mutual respect and understanding across all cultural backgrounds.",
    ],
    detail:
      "Our Constitution \u2013 purpose (c) \u2013 directs OCRSS to promote community development ideas, cultural understanding, and Canadian multiculturalism concept to new immigrants and refugees. We celebrate Oromo heritage while embracing Canada\u2019s rich multicultural fabric. Through cultural festivals, public forums, and cross\u2011cultural dialogue events, we bring together newcomers and long\u2011time residents to foster mutual understanding and respect. These initiatives help newcomers feel a sense of belonging while educating the broader community about Oromo traditions, values, and contributions to Canadian society.",
  },
  {
    image: "/images/causes/cause-5.jpg",
    title: "Youth, Children & Family Support",
    slug: "youth-children-family-support",
    subtitle:
      "Supporting the next generation and the families who care for them.",
    points: [
      "Community programs and services for immigrant youth, refugees, and Canadians in general.",
      "Workshops, seminars, leadership training, and family counselling of particular interest to immigrant families, newcomers, and refugees in British Columbia.",
      "Parenting programs and children and youth programs to help young newcomers thrive.",
      "Community development training and community forums for families and individuals.",
    ],
    detail:
      "Our Constitution \u2013 purposes (g) and (h) \u2013 commit OCRSS to providing community programs and services to immigrant youth, refugees, and Canadians in general, and to designing a series of community workshops, seminars, leadership and family counselling, community development training, community forums, parenting programs, children and youth programs which will be of particular interest to immigrant families, newcomers, and refugees who have arrived in British Columbia. We provide after\u2011school tutoring, homework help, recreational activities, and mentorship that help young newcomers succeed in school and build self\u2011confidence. Our leadership development programs prepare youth and adults to become active voices in their communities, and our family support workers offer counselling, referrals, and a compassionate ear \u2013 because strong families build strong communities.",
  },
  {
    image: "/images/causes/cause-6.jpg",
    title: "Advancement of Education",
    slug: "advancement-of-education",
    subtitle:
      "Advancing education through programs, classes, workshops, and learning resources.",
    points: [
      "Advance education by offering programs, classes, workshops, and learning resources.",
      "Educational activities related to studies, language, culture, ethics, and community knowledge.",
      "Learning opportunities for youth, adults, and families.",
      "Support for newcomers to navigate the Canadian education system and credential recognition.",
    ],
    detail:
      "Our Constitution \u2013 purpose (I) \u2013 mandates the advancement of education by offering programs, classes, workshops, and learning resources related to studies, language, culture, ethics, and community knowledge, including educational activities for youth, adults, and families. We run English language classes, cultural knowledge workshops, and academic support programs that help newcomers at every stage of life. For youth, we provide tutoring and homework support; for adults, we offer pathways to credential recognition and continuing education; and for families, we create shared learning experiences that bridge cultural gaps and build confidence in the Canadian education system.",
  },
  {
    image: "/images/causes/cause-7.jpg",
    title: "Poverty Relief & Social Support",
    slug: "poverty-relief-social-support",
    subtitle:
      "Standing with individuals and families in times of need.",
    points: [
      "Relieve poverty and hardship by providing assistance and support to individuals and families in need.",
      "Help with basic necessities, charitable aid, and community support programs.",
      "Referrals to appropriate social and community services.",
      "Activities that promote social inclusion and reduce isolation for vulnerable community members.",
    ],
    detail:
      "Our Constitution \u2013 purpose (J) \u2013 directs OCRSS to relieve poverty and hardship by providing assistance and support to individuals and families in need, including necessities, charitable aid, and community support programs. No one should face hardship alone. We help connect people with emergency resources, food banks, clothing donations, and subsidized services. Through our referral network, we ensure that vulnerable community members \u2013 including seniors, single parents, and people with disabilities \u2013 receive the specialized support they need. We also organize inclusive community activities designed to reduce loneliness and build the social connections that are essential to well\u2011being.",
  },
  {
    image: "/images/causes/cause-8.jpg",
    title: "Community Benefit & Social Well\u2011Being",
    slug: "community-benefit-social-wellbeing",
    subtitle:
      "Carrying out activities that promote social inclusion, cultural understanding, and community well\u2011being.",
    points: [
      "Activities that promote social inclusion, cultural understanding, moral development, and community well\u2011being.",
      "Programs that support newcomers, youth, seniors, and vulnerable members of the community.",
      "Initiatives that strengthen community bonds and create a welcoming environment for all.",
      "Collaboration with local organizations to build an inclusive, supportive community network.",
    ],
    detail:
      "Our Constitution \u2013 purpose (K) \u2013 commits OCRSS to carrying out activities that promote social inclusion, cultural understanding, moral development, and community well\u2011being, including programs that support newcomers, youth, seniors, and vulnerable members of the community. We create safe, welcoming spaces where people from all backgrounds can come together, share experiences, and support one another. From community potlucks and cultural exchanges to wellness workshops and seniors\u2019 social groups, our programs are designed to strengthen the social fabric of our community and ensure that no one is left on the margins.",
  },
  {
    image: "/images/causes/cause-9.jpg",
    title: "Advocacy & Partnership Development",
    slug: "advocacy-partnership-development",
    subtitle:
      "Seeking support and building networks to expand opportunities for our community.",
    points: [
      "Actively seek private and government support to enhance opportunities and social development.",
      "Work closely with other associations, community organizations, and settlement services providers to establish a community network.",
      "Advocate for policies and programs that benefit newcomers, refugees, and immigrants.",
      "Build partnerships that amplify the reach and impact of our services.",
    ],
    detail:
      "Our Constitution \u2013 purposes (d) and (f) \u2013 direct OCRSS to actively seek private and government support to enhance opportunities and social development, and to work closely with other associations, community organizations, and settlement services providers to establish a community network. We believe that lasting change requires collective action. Our advocacy efforts focus on ensuring that the voices of Oromo refugees and immigrants are heard at every level of government and in every relevant institution. Through strategic partnerships with settlement agencies, cultural associations, civic organizations, and government bodies, we amplify our impact and ensure our community has access to the broadest possible range of resources and opportunities.",
  },
];

export const Eventdata: {
  image: string;
  title: string;
  text: string;
  date: string;
  location: string;
  type: string;
  entrants: string;
  duration: string;
  category: string;
  detail: string;
  slug: string;
}[] = [
  {
    image: "/images/event/event-1.jpg",
    title: "You should have eagle’s eye on new trends and techonogies",
    slug: "event-1",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
  {
    image: "/images/event/event-2.jpeg",
    title: "New Seminar on Newest Food Recipe from World’s Best",
    slug: "event-2",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
  {
    image: "/images/event/event-3.jpeg",
    title: "Learn from small things to create something bigger.",
    slug: "event-3",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
  {
    image: "/images/event/event-4.jpg",
    title: "Literary Escapade Book Reading and Discussion.",
    slug: "event-4",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
  {
    image: "/images/event/event-5.jpg",
    title: "A Journey Through Time Historical Reenactment Fair.",
    slug: "event-5",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
  {
    image: "/images/event/event-6.jpg",
    title: "Leadership Summit Empowering Tomorrow's Leaders.",
    slug: "event-6",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Feb 10, 2026",
    location: "San Marcos",
    type: "Open",
    entrants: "Unlimited",
    duration: "1655 Days",
    category: "Calendar, Dontaions",
    detail:
      "Donec hendrerit, dui quis ultricies eleifend, ipsum sapien auctor ligula, vitae interdum augue metus nec sem. Pellentesque mollis ex risus, eget dignissim nibh fermentum in. Cras eu ipsum eget ante ullamcorper vehicula. Suspendisse non blandit mi.Mauris eu sapien urna. Fusce eu luctus augue, non vestibulum felis. Fusce sollicitudin porta augue non porta. Vivamus ullamcorper tristique nisi, in mattis elit porta vitae. Curabitur euismod lectus non maximus dictum. Vivamus luctus, eros at posuere",
  },
];

export const footerLinks: { link: string; href: string }[] = [
  { link: "About Us", href: "/about" },
  { link: "Our Services", href: "/services" },
  { link: "Events", href: "/events" },
  { link: "Contact Us", href: "/contact" },
  { link: "Blog", href: "/blog" },
  { link: "Settlement Support", href: "/services/settlement-resettlement-support" },
  { link: "Employment Support", href: "/services/employment-pre-employment-support" },
  { link: "Youth & Family", href: "/services/youth-children-family-support" },
  { link: "Education Programs", href: "/services/advancement-of-education" },
  { link: "Poverty Relief", href: "/services/poverty-relief-social-support" },
];

export const Reviews: {
  clientName: string;
  review: string;
  post: string;
}[] = [
  {
    clientName: "Alawy Sharifa",
    review:
      "OCRSS helped my family settle into a new life in British Columbia. From language support to employment guidance, they were with us every step of the way. I truly feel at home now thanks to their dedicated team.",
    post: "Community Member",
  },
  {
    clientName: "Muhammad Rahim",
    review:
      "Volunteering with OCRSS has been one of the most rewarding experiences. The organization genuinely cares about empowering newcomers through education, mentorship, and cultural connection. Their impact on the community is remarkable.",
    post: "Volunteer & Supporter",
  },
];
