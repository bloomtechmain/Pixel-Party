import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { VideoRevealSection } from '../components/VideoRevealSection';
import { CreativitySection } from '../components/CreativitySection';
import { PixelValueSection } from '../components/PixelValueSection';
import { AboutSection } from '../components/AboutSection';
import { ArtistManagementSection } from '../components/ArtistManagementSection';
import { OurStorySection } from '../components/OurStorySection';
import { BeautifulMomentsSection } from '../components/BeautifulMomentsSection';
import { StartFilmSection } from '../components/StartFilmSection';
import { LetsCreateSection } from '../components/LetsCreateSection';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <main className="bg-black">
      <Navbar />
      <HeroSection />
      <VideoRevealSection />
      <CreativitySection />
      <PixelValueSection />
      <AboutSection />
      <ArtistManagementSection />
      <OurStorySection />
      <BeautifulMomentsSection />
      <StartFilmSection />
      <LetsCreateSection />
      <Footer />
    </main>
  );
}
