import CommunityInAction from "@/components/CommunityInAction";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/Newsletter";
import PlatformFeatures from "@/components/PlatformFeatures";
import RecentEvents from "@/components/RecentEvents";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PlatformFeatures/>
      <RecentEvents />
      <CommunityInAction />
      <Newsletter/>
    </main>
  );
}
