import PageHero from '@/components/ui/PageHero';
import EventInquiry from '@/components/events/EventInquiry';

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 bg-background">
      <PageHero 
        title="Events" 
        subtitle="Momente, die bleiben" 
        image="/images/home/celebrate.jpg" 
      />

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-6 uppercase tracking-widest">
              Feiern & Tagen in der Villa
            </h2>
            <p className="font-serif text-lg text-espresso/80 leading-relaxed">
              Die Villa Schwerzenbach bietet den perfekten Rahmen für besondere Anlässe. Wählen Sie die passende Kategorie oder teilen Sie uns Ihre ganz eigene, individuelle Idee mit.
            </p>
          </div>
          
          <EventInquiry />
        </div>
      </section>
    </div>
  );
}
