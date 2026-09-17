import { SectionHeading } from '@/components/ui/SectionHeading';

export default function DatenschutzPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title="Datenschutzerklärung" />
        
        <div className="prose prose-lg prose-p:text-espresso/80 max-w-none bg-white p-8 md:p-12 rounded-lg border border-cream">
          <p>
            Wir freuen uns über Ihren Besuch auf unserer Webseite und Ihr Interesse an der Villa Schwerzenbach. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
          </p>
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:<br />
            Villa Schwerzenbach by MIVA<br />
            Römerstrasse 23<br />
            8603 Schwerzenbach<br />
            Schweiz<br />
            E-Mail: info@villa-schwerzenbach.ch
          </p>
          
          <h2>2. Datenerfassung auf unserer Webseite</h2>
          <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
          </p>
          <p>
            (Dies ist ein Platzhalter-Text für das MVP. Die vollständige rechtlich geprüfte Datenschutzerklärung wird hier vor Go-Live eingefügt.)
          </p>
        </div>
      </div>
    </div>
  );
}
