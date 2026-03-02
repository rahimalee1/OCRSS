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
    text: "Your generous contributions help us provide housing, basic necessities, and essential support to refugee families rebuilding their lives in British Columbia.",
  },
  {
    icon: "/images/help/food-supply.svg",
    title: "Fund Our Programs",
    text: "Support our settlement, education, and cultural programs that empower newcomers to build a safe, dignified life and contribute to Canadian society.",
  },
  {
    icon: "/images/help/volunteer.svg",
    title: "Volunteer",
    text: "Join our team of dedicated volunteers! Help with settlement support, event coordination, fundraising, youth mentorship, and community outreach.",
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
    title: "Housing Support",
    slug: "housing-support",
    subtitle:
      "Helping newcomer families find safe, affordable housing as they begin their new lives in Canada.",
    points: [
      "Assistance with finding and securing rental housing in British Columbia.",
      "Guidance on tenant rights, lease agreements, and landlord communication.",
      "Referrals to subsidized housing programs and emergency shelters.",
      "Support with furnishing and settling into a new home.",
    ],
    detail:
      "In accordance with our constitutional purpose to provide settlement services, OCRSS helps newly arrived refugees and immigrants secure safe, affordable housing. Our settlement workers guide families through the rental process, explain tenant rights and responsibilities, and connect them with subsidized housing programs where available. We also coordinate furniture donations and household essentials so that families can settle into their new homes with dignity. For those in crisis, we provide referrals to emergency shelters and transitional housing services.",
  },
  {
    image: "/images/causes/cause-2.jpg",
    title: "Orientation for Newcomers",
    slug: "orientation-for-newcomers",
    subtitle:
      "Structured orientation sessions that prepare newcomers for everyday life in Canada.",
    points: [
      "Introduction to Canadian culture, rights, responsibilities, and daily life skills.",
      "Guidance on healthcare, education, banking, transportation, and government services.",
      "One-on-one settlement plans tailored to each family\u2019s needs.",
      "Information sessions on legal rights, workplace standards, and community resources.",
    ],
    detail:
      "Our Constitution directs OCRSS to assist newcomers with orientation and Canadian life skills. We offer comprehensive orientation sessions that cover everything a newly arrived family needs to know \u2014 from how to access healthcare and enrol children in school, to understanding the public transit system, opening a bank account, and knowing their legal rights. Each participant receives a personalized settlement plan that respects their unique background while building the knowledge and confidence needed to navigate life in British Columbia independently.",
  },
  {
    image: "/images/causes/cause-3.jpg",
    title: "Language Support",
    slug: "language-support",
    subtitle:
      "Breaking down language barriers so families can communicate, connect, and thrive.",
    points: [
      "Professional interpretation and translation for medical, legal, and government appointments.",
      "English language learning resources and referrals to ESL programs.",
      "Document translation for immigration paperwork, school records, and employment credentials.",
      "Multilingual staff who understand the challenges newcomers face.",
    ],
    detail:
      "Language barriers are one of the most significant challenges facing newcomers. OCRSS provides professional interpretation and translation services for medical appointments, legal consultations, school meetings, and government interactions. We also connect families with English as a Second Language (ESL) programs and provide in-house language support to help adults and youth build everyday communication skills. Our goal is to ensure that no one is unable to access the services they need simply because of a language gap.",
  },
  {
    image: "/images/causes/cause-4.jpg",
    title: "Cultural Lifestyle Support",
    slug: "cultural-lifestyle-support",
    subtitle:
      "Promoting cultural understanding and helping newcomers adapt while preserving their heritage.",
    points: [
      "Programs that promote Canadian multiculturalism and cross-cultural dialogue.",
      "Support for newcomers to maintain their cultural identity while integrating into Canadian life.",
      "Community development initiatives that build mutual respect across cultures.",
      "Workshops on navigating cultural differences in workplaces, schools, and neighbourhoods.",
    ],
    detail:
      "Our Constitution commits OCRSS to promoting community development, cultural understanding, and the Canadian multiculturalism concept. We believe that successful integration means embracing Canadian values while honouring one\u2019s cultural heritage. Our cultural lifestyle programs help newcomers understand Canadian social norms, workplace culture, and community expectations, while also creating spaces where they can practise and share their own traditions. Through cross-cultural dialogue events and community forums, we foster mutual respect and understanding across all backgrounds.",
  },
  {
    image: "/images/causes/cause-5.jpg",
    title: "Traditional & Cultural Activities",
    slug: "traditional-cultural-activities",
    subtitle:
      "Celebrating Oromo heritage through music, food, dance, and community gatherings.",
    points: [
      "Cultural festivals, traditional music, dance performances, and storytelling events.",
      "Oromo language and heritage classes for children and youth.",
      "Community gatherings that strengthen bonds within the diaspora.",
      "Public awareness events that share Oromo culture with the broader Canadian community.",
    ],
    detail:
      "OCRSS organizes traditional and cultural activities that keep Oromo heritage alive within the diaspora community. From cultural shows and traditional food festivals to heritage language classes for the next generation, our programs ensure that newcomers can stay connected to their roots while building a new life in Canada. These events also serve as bridges between communities \u2014 inviting all British Columbians to learn about, appreciate, and celebrate the rich traditions of the Oromo people.",
  },
  {
    image: "/images/causes/cause-6.jpg",
    title: "Sponsorship Programs",
    slug: "sponsorship-programs",
    subtitle:
      "Connecting refugees with sponsors and resources to build a foundation for a new life.",
    points: [
      "Support for private sponsorship applications and community sponsorship groups.",
      "Coordination between sponsors and refugee families for smooth resettlement.",
      "Post-arrival support for sponsored families including orientation and settlement services.",
      "Partnerships with faith groups, community organizations, and individuals who wish to sponsor.",
    ],
    detail:
      "OCRSS works closely with community groups, faith organizations, and individuals who wish to sponsor refugee families coming to Canada. We provide guidance on the private sponsorship process, help form sponsorship groups, and coordinate between sponsors and arriving families to ensure a warm, well-prepared welcome. Once families arrive, our settlement workers provide ongoing support \u2014 from housing and orientation to language services and employment guidance \u2014 so that every sponsored family has the foundation they need to succeed.",
  },
  {
    image: "/images/causes/cause-7.jpg",
    title: "Fundraising Programs",
    slug: "fundraising-programs",
    subtitle:
      "Mobilizing community resources to sustain programs that change lives.",
    points: [
      "Community fundraising events and campaigns to support OCRSS services.",
      "Grant applications and proposals to government and private foundations.",
      "Partnerships with businesses and donors who share our mission.",
      "Transparent reporting on how funds are used to serve the community.",
    ],
    detail:
      "Sustainable funding is essential to our mission. OCRSS actively seeks private and government support to enhance opportunities and social development for our community, as directed by our Constitution. We organize community fundraising events, submit grant proposals to government agencies and private foundations, and build partnerships with businesses that share our values. Every dollar raised goes directly toward programs that help refugees and newcomers settle, learn, work, and thrive. We are committed to transparency and accountability in how we manage and report on community funds.",
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
    title: "Annual General Meeting",
    slug: "annual-general-meeting",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Jul 19, 2026",
    location: "Vancouver, BC",
    type: "Members & Public",
    entrants: "Unlimited",
    duration: "Half Day",
    category: "Governance, Community",
    detail:
      "The OCRSS Annual General Meeting is held every July and is open to all members and supporters. This is an important opportunity for our community to come together, review the past year\u2019s achievements, discuss upcoming programs, elect board members, and shape the direction of the society. As a member-funded organization under the BC Societies Act, transparency and community participation are at the heart of everything we do. All members are encouraged to attend and have their voices heard.",
  },
  {
    image: "/images/event/event-2.jpeg",
    title: "Community Picnic & Family Day",
    slug: "community-picnic",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Aug 9, 2026",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1 Day",
    category: "Community, Family",
    detail:
      "Join us for a day of food, fun, and fellowship at the annual OCRSS Community Picnic. Families, newcomers, and friends of all backgrounds are warmly welcome. Enjoy traditional Oromo dishes alongside Canadian barbecue favourites, games and activities for children, live music, and a relaxed atmosphere where community bonds are strengthened. This event is a highlight of the year and a chance for newcomers to meet neighbours, make friends, and feel at home in British Columbia.",
  },
  {
    image: "/images/event/event-3.jpeg",
    title: "Oromo Cultural Show",
    slug: "oromo-cultural-show",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Oct 17, 2026",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1 Evening",
    category: "Cultural, Community",
    detail:
      "The Oromo Cultural Show is a vibrant evening of traditional music, dance, poetry, and storytelling that celebrates the rich heritage of the Oromo people. Performers of all ages take the stage to share their talents and preserve cultural traditions for the next generation. The event is open to the entire community and serves as a bridge between cultures \u2014 inviting all Canadians to experience the beauty and diversity of Oromo traditions. Proceeds support OCRSS youth and education programs.",
  },
  {
    image: "/images/event/event-6.jpg",
    title: "Traditional Oromo Food & Heritage Festival",
    slug: "food-heritage-festival",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Jun 21, 2026",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1 Day",
    category: "Cultural, Community",
    detail:
      "Experience the rich culinary traditions of the Oromo people at our annual Food & Heritage Festival. Community members will prepare and share authentic dishes while guests enjoy live performances, cultural displays, and artisan crafts. This festival is a bridge between cultures \u2014 an invitation for all British Columbians to taste, learn, and celebrate the traditions that make our communities stronger. Proceeds support OCRSS settlement and education programs.",
  },
  {
    image: "/images/event/event-4.jpg",
    title: "Newcomer Welcome & Orientation Workshop",
    slug: "newcomer-orientation-workshop",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Apr 5, 2026",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "Half Day",
    category: "Settlement, Education",
    detail:
      "OCRSS is hosting a comprehensive orientation workshop for recently arrived refugees and immigrants. Participants will learn about life in Canada, including housing, healthcare, education, transportation, banking, and government services. Our trained settlement workers will provide one-on-one guidance and answer questions in Oromo and English. Light refreshments and childcare will be provided. This workshop is a safe, welcoming space for newcomers to get the information and support they need.",
  },
  {
    image: "/images/event/event-5.jpg",
    title: "Employment Readiness & Job Fair for Newcomers",
    slug: "employment-readiness-job-fair",
    text: "3, 3025 Nanaimo Street, Vancouver, CANADA",
    date: "Sep 12, 2026",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1 Day",
    category: "Employment, Community",
    detail:
      "OCRSS is partnering with local employers and training organizations to host an Employment Readiness & Job Fair designed for refugees and newcomers. The event will feature resume-writing workshops, mock interviews, credential recognition guidance, and direct connections with hiring managers. Whether you are looking for your first job in Canada or seeking to advance your career, this event provides the tools and networks you need to succeed in the Canadian workforce.",
  },
  {
    image: "/images/event/event-7.png",
    title: "BC Safe Haven Teacher Training on Trauma-Informed Teaching",
    slug: "bc-safe-haven-teacher-training",
    text: "Online (Zoom)",
    date: "Mar 3, 2026",
    location: "Online",
    type: "Open",
    entrants: "Unlimited",
    duration: "2 Hours",
    category: "Training, Education",
    detail:
      "The BC Safe Haven Resource Network invites you to a training on trauma-informed teaching for language instructors working with refugee claimant learners in BC. As BC Safe Haven clients often come to the classroom with a history of traumatic experiences, it is essential for instructors to deliver language training in a sensitive and trauma-informed manner. This session features a presentation from Drs. Amea Wilbur and Brianna Strumm of the University of the Fraser Valley on the principles and strategies of trauma-informed teaching, followed by a Q&A session and breakout room activities. This is a partner event hosted by AMSSA and the BC Refugee Hub.",
  },
  {
    image: "/images/event/event-8.png",
    title: "Legal Aid for Refugee Claimants Webinar",
    slug: "legal-aid-refugee-claimants-webinar",
    text: "Online (Zoom)",
    date: "Feb 23, 2026",
    location: "Online",
    type: "Open",
    entrants: "Unlimited",
    duration: "1.5 Hours",
    category: "Settlement, Legal",
    detail:
      "The BC Refugee Hub is hosting a webinar for organizations supporting refugee claimants. This session provides practical guidance to help frontline staff better understand legal aid supports available to refugee claimants in BC, including eligibility, coverage, referrals, and limitations. Key topics include legal aid eligibility and application processes, coverage by phase (claim, appeal, PRRA, removal), common challenges frontline workers encounter, and options when legal aid is not available including low-cost and pro bono legal resources. Speaker: Chad Gautreau, Legal Aid BC. This is a partner event hosted by the BC Refugee Hub.",
  },
  {
    image: "/images/event/event-9.jpg",
    title: "Chai Time: Community Gathering for Refugee Claimants",
    slug: "chai-time-community-gathering",
    text: "5575 Boundary Road, Vancouver, V5R 2P9",
    date: "Every Tuesday",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1.5 Hours",
    category: "Community, Settlement",
    detail:
      "MOSAIC hosts Chai Time, a warm and welcoming community gathering for refugee claimants in Vancouver. Every Tuesday from 12:30 to 2:00 PM, newcomers can connect with others, enjoy a cup of chai, and learn about available services and supports in a relaxed setting. Participants can meet other newcomers, ask questions, and build community in a safe and inclusive environment. Interpretation support may be available. Open to naturalized citizens, study permit holders, open work permit holders, and refugee claimants. No registration required \u2014 just drop in! This is a recurring partner event hosted by MOSAIC.",
  },
];

export const footerLinks: { link: string; href: string }[] = [
  { link: "About Us", href: "/about" },
  { link: "Our Services", href: "/services" },
  { link: "Events", href: "/events" },
  { link: "Contact Us", href: "/contact" },
  { link: "Blog", href: "/blog" },
  { link: "Housing Support", href: "/services/housing-support" },
  { link: "Language Support", href: "/services/language-support" },
  { link: "Newcomer Orientation", href: "/services/orientation-for-newcomers" },
  { link: "Cultural Activities", href: "/services/traditional-cultural-activities" },
  { link: "Sponsorship", href: "/services/sponsorship-programs" },
];

export const Reviews: {
  clientName: string;
  review: string;
  post: string;
}[] = [
  {
    clientName: "Alawy Sharifa",
    review:
      "OCRSS helped my family settle into a new life in British Columbia. From finding housing to language support and employment guidance, they were with us every step of the way. I truly feel at home now thanks to their dedicated team.",
    post: "Community Member",
  },
  {
    clientName: "Muhammad Rahim",
    review:
      "Volunteering with OCRSS has been one of the most rewarding experiences. The organization genuinely cares about empowering newcomers through education, mentorship, and cultural connection. Their impact on the community is remarkable.",
    post: "Volunteer & Supporter",
  },
  {
    clientName: "Fatima Abdi",
    review:
      "When we first arrived in Canada, everything felt overwhelming. OCRSS helped us with orientation, connected us to English classes, and even helped my husband find work. They treated us like family and gave us hope for a better future.",
    post: "Newcomer Family",
  },
];
