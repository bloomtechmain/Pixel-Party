import { Navbar } from '../components/Navbar';
import { ExploreHero } from '../components/ExploreHero';
import { ArtistManagementSection } from '../components/ArtistManagementSection';
import { ExploreGallery } from '../components/ExploreGallery';
import { Footer } from '../components/Footer';

export function ExplorePage() {
  return (
    <main className="bg-black">
      <Navbar />
      <ExploreHero />
      <ArtistManagementSection />
      <ExploreGallery />
      <Footer />
    </main>
  );
}
