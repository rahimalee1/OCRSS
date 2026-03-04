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
    image: "/images/event/event-1.png",
    title: "AMSSA \u2013 Webinar: BC Safe Haven Teacher Training on Trauma-Informed Teaching",
    slug: "bc-safe-haven-teacher-training",
    text: "Online (Zoom)",
    date: "Mar 3, 2026",
    location: "Online (Zoom)",
    type: "Open",
    entrants: "Unlimited",
    duration: "2 Hours",
    category: "Training, Education",
    detail:
      "The BC Safe Haven Resource Network invites you to a training on trauma-informed teaching for BC Safe Haven language instructors. As BC Safe Haven clients often come to the classroom with a history of traumatic experiences, it is essential for instructors to know how to deliver language training in a sensitive and trauma-informed manner, establishing and sustaining supportive classroom spaces. This training session will involve a presentation from Drs. Amea Wilbur and Brianna Strumm, University of the Fraser Valley, on the principles and strategies of trauma-informed teaching, as well as a Q&A session for participant questions. The session will culminate with a group activity and discussion in breakout rooms, supporting attendees in building skills and confidence with the application of trauma-informed teaching principles and practices in their own classrooms. This training is designed for BC Safe Haven language instructors working with refugee claimant language learners in BC. Date: March 3, 2026. Time: 1:30 PM \u2013 3:30 PM PST. Location: Zoom Webinar.",
  },
  {
    image: "/images/event/event-2.png",
    title: "BC Refugee Hub \u2013 Webinar: Legal Aid for Refugee Claimants",
    slug: "legal-aid-refugee-claimants-webinar",
    text: "Online (Zoom)",
    date: "Feb 23, 2026",
    location: "Online (Zoom)",
    type: "Open",
    entrants: "Unlimited",
    duration: "1.5 Hours",
    category: "Settlement, Legal",
    detail:
      "The BC Refugee Hub is hosting a webinar for organizations supporting refugee claimants. This session will provide practical guidance to help frontline staff better understand legal aid supports available to refugee claimants in BC, including eligibility, coverage, referrals, and limitations for service providers. Key topics covered: legal aid eligibility and application processes for refugee claimants, legal aid coverage by phase (claim, appeal, PRRA, removal), common challenges and questions frontline workers encounter, options and referrals when legal aid is not available, and low-cost and pro bono legal resources. Speaker: Chad Gautreau, Legal Aid BC. This webinar is designed for staff from organizations working with refugee claimants, including settlement workers, service providers, health sector professionals, and community partners. Date: February 23, 2026. Time: 1:00 PM \u2013 2:30 PM PST. Location: Zoom Webinar.",
  },
  {
    image: "/images/event/event-3.png",
    title: "AMSSA \u2013 Webinar: IRPA Section 91 \u2013 Understanding Immigration Information vs. Immigration Advice",
    slug: "irpa-section-91-webinar",
    text: "Online (Zoom)",
    date: "Jan 16, 2026",
    location: "Online (Zoom)",
    type: "Open",
    entrants: "Unlimited",
    duration: "2 Hours",
    category: "Training, Legal",
    detail:
      "Section 91 of the Immigration and Refugee Protection Act (IRPA) prohibits anyone from advising or representing a person on an IRPA proceeding or application unless registered with a regulatory body. In October 2024, IRCC adopted a different interpretation so salaried staff at NGOs who provide immigration advice or representation will not be committing an offence as long as no compensation is provided by the client. This webinar will provide an understanding of immigration information and immigration advice, clearly defining each and showing the differences, using case studies from BC Newcomer Service Program and BC Safe Haven client situations. Speaker: Will Tao \u2013 Founder & Principal Lawyer, Heron Law Offices. Date: January 16, 2026. Time: 10:00 AM \u2013 12:00 PM PT. Location: Zoom Webinar.",
  },
  {
    image: "/images/event/event-4.png",
    title: "VAST & BC Refugee Hub \u2013 Trauma-Informed Leadership & Organizational Well-Being Training",
    slug: "trauma-informed-leadership-training",
    text: "Online (Zoom)",
    date: "Jan 20, 2026",
    location: "Online (Zoom)",
    type: "Open",
    entrants: "Unlimited",
    duration: "4 Hours",
    category: "Training, Mental Health",
    detail:
      "The BC Refugee Hub, in partnership with VAST (Vancouver Association for Survivors of Torture), is hosting an online training session designed for coordinators, managers, and directors to strengthen trauma-informed leadership and organizational wellness across BC Safe Haven funded organizations. Key topics covered: organization-wide approaches to trauma-informed practice, leadership strategies for addressing trauma and vicarious trauma, practical tools for self-care, stress management, and mental health coping, assessing and improving workplace well-being, and supporting teams through complex and evolving refugee claimant processes. Speakers from VAST will lead this training session. Part 1: 10:30 AM \u2013 12:00 PM, Lunch Break: 12:00 \u2013 1:00 PM, Part 2: 1:00 \u2013 2:30 PM. Date: January 20, 2026. Time: 10:30 AM \u2013 2:30 PM PST. Location: Zoom.",
  },
  {
    image: "/images/event/event-5.jpg",
    title: "MOSAIC \u2013 Chai Time: Community Gathering for Refugee Claimants in Vancouver",
    slug: "chai-time-community-gathering",
    text: "5575 Boundary Road, Vancouver, V5R 2P9",
    date: "Every Tuesday",
    location: "Vancouver, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "1.5 Hours",
    category: "Community, Settlement",
    detail:
      "MOSAIC is hosting Chai Time, a warm and welcoming community gathering for refugee claimants in Vancouver. This recurring event offers a chance to connect with others, enjoy a cup of chai, and learn about available services and supports in a relaxed setting. Participants can meet other newcomers, ask questions, and build community in a safe and inclusive environment. Interpretation support may be available. These sessions are in Farsi/Dari. Open to naturalized citizens, study permit holders, open work permit holders, and refugee claimants. Whether you\u2019re new to Canada or have been here a while, Chai Time is a welcoming space to meet others, share your experiences, and learn about available services. No registration is required \u2014 just drop in! Date: Every Tuesday. Time: 12:30 \u2013 2:00 PM. Location: 5575 Boundary Road, Vancouver, V5R 2P9.",
  },
  {
    image: "/images/event/event-6.png",
    title: "BC Refugee Hub & VAST \u2013 Refugee Claimant Mental Health Training Workshops",
    slug: "mental-health-training-workshops",
    text: "In-Person & Online (Zoom)",
    date: "Mar 6, 2025",
    location: "Multiple Locations, BC",
    type: "Open",
    entrants: "Unlimited",
    duration: "5 Hours",
    category: "Training, Mental Health",
    detail:
      "The BC Refugee Hub is hosting in-person training workshops focused on mental health crisis management, specifically designed for organizations and frontline workers supporting refugee claimants. These workshops provide invaluable resources and practical tools to help strengthen your organization\u2019s mental health crisis response plans. Developed in partnership with VAST as part of the BC Safe Haven Resource Network, led by AMSSA, and funded by the Province of British Columbia. Speakers from VAST cover topics including cross-cultural support, expressive art techniques, and trauma-informed practice. Workshops take place across BC regions including Fraser Valley (Abbotsford), Interior and North (Online via Zoom), Metro Vancouver, and Vancouver Island. Priority is given to BC Safe Haven and NSP funded program team members. Community partners serving refugee claimants can also register.",
  },
  {
    image: "/images/event/event-7.png",
    title: "BC Refugee Hub Webinar \u2013 Refugees and Refugee Claimants: Arrival Statistics and Trends",
    slug: "arrival-statistics-trends-webinar",
    text: "Online (Zoom)",
    date: "Jun 18, 2024",
    location: "Online (Zoom)",
    type: "Open",
    entrants: "Unlimited",
    duration: "1.5 Hours",
    category: "Policy, Research",
    detail:
      "A webinar hosted by the BC Refugee Hub discussing refugee and refugee claimant arrival statistics and trends from local, national, and international perspectives. Topics covered include efforts to expand third-country solutions, resettlement priorities, trends in forced displacement nationally and internationally, and arrival trends in British Columbia. Following the presentation, there will be plenty of time for a Q&A session. This webinar commemorates World Refugee Day 2024: \u201CFor a world where refugees are welcomed.\u201D World Refugee Day is on June 20th every year and honours people who have been forced to flee their home country to escape conflict or persecution. Speakers: Michael Casasola \u2013 Senior Resettlement and Complementary Pathways Officer, UNHCR; Jennifer York \u2013 Director, Refugee Services, ISSofBC. Date: June 18, 2024. Time: 10:30 AM \u2013 12:00 PM PST. Location: Zoom.",
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
