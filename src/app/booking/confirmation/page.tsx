import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ConfirmationPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen flex items-center font-sans">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="bg-cream p-10 md:p-16 shadow-2xl border border-cream-light">
          <div className="w-24 h-24 bg-bordeaux text-cream arch-mask flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="font-script text-3xl text-villa-red block mb-2">Wir freuen uns auf Sie</span>
          <h1 className="font-villa-editorial text-3xl md:text-5xl text-espresso uppercase tracking-[0.15em] mb-6">
            Vielen Dank für Ihre Buchung
          </h1>
          
          <div className="bg-cream-light p-8 border border-espresso/15 mt-8 mb-10 text-left max-w-xl mx-auto">
            <p className="text-base text-espresso mb-6 text-center">Ihre Buchung war erfolgreich. Eine Bestätigung wurde an Ihre E-Mail gesendet.</p>
            
            <div className="bg-cream p-4 mb-6 flex justify-between items-center border border-espresso/10">
              <span className="text-espresso/70 uppercase text-xs font-semibold tracking-widest">Buchungsnummer</span>
              <span className="font-bold text-bordeaux text-lg">VS-8492-X</span>
            </div>
            
            <p className="text-espresso/80 text-center text-sm">
              Bei Fragen zu Ihrer Buchung kontaktieren Sie uns gerne unter<br/>
              <a href="mailto:hello@villa-schwerzenbach.com" className="text-villa-blue underline">hello@villa-schwerzenbach.com</a>
            </p>
          </div>

          <Link href="/">
            <Button variant="outline">Zurück zur Startseite</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
