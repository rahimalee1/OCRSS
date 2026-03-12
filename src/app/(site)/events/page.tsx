import HeroSub from "@/components/SharedComponent/HeroSub";
import EventList from "@/components/Events/EventList";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";
import { getSiteImages } from "@/app/lib/site-images";

export const metadata: Metadata = {
    title: "Event List | OCRSS",
};

export const dynamic = "force-dynamic";

export default async function Page() {
    const siteImages = await getSiteImages();
    return (
        <>
            <HeroSub title="Event List" backgroundImage={siteImages.eventsBanner} />
            <EventList />
            <Volunteer />
        </>
    );
}