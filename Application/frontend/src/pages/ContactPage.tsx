import { Navbar } from '../components/Navbar';
import { ContactHero } from '../components/ContactHero';
import { ContactFormSection } from '../components/ContactFormSection';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <main className="bg-black">
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
