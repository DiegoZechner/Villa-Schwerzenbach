import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export default function ConfirmationPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        
        <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-bordeaux" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <SectionHeading 
          title="Vielen Dank für Ihre Buchung" 
          subtitle="Wir freuen uns auf Sie" 
        />
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-cream mt-8 mb-10 text-left max-w-xl mx-auto">
          <p className="text-lg text-espresso mb-6 text-center">Ihre Buchung war erfolgreich. Eine Bestätigung wurde an Ihre E-Mail gesendet.</p>
          
          <div className="bg-cream-light p-4 rounded-sm mb-6 flex justify-between items-center">
            <span className="text-espresso/70 uppercase text-xs font-medium">Buchungsnummer</span>
            <span className="font-bold text-bordeaux text-lg">VS-8492-X</span>
          </div>
          
          <p className="text-espresso/80 text-center text-sm">
            Bei Fragen zu Ihrer Buchung kontaktieren Sie uns gerne unter<br/>
            <a href="mailto:info@villa-schwerzenbach.ch" className="text-villa-blue underline">info@villa-schwerzenbach.ch</a>
          </p>
        </div>

        <Link href="/">
          <Button variant="outline">Zurück zur Startseite</Button>
        </Link>
      </div>
    </div>
  );
}
