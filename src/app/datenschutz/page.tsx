export default function DatenschutzPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-cream p-8 md:p-16 shadow-2xl border border-cream-light">
          <div className="text-center mb-12">
            <span className="font-script text-3xl text-villa-red block mb-1">Villa Schwerzenbach by MIVA</span>
            <h1 className="font-villa-editorial text-4xl md:text-5xl text-espresso uppercase tracking-[0.18em]">Datenschutzerklärung</h1>
          </div>
          
          <div className="space-y-6 text-espresso/85 bg-cream-light p-8 md:p-12 border border-espresso/15 text-sm leading-relaxed">
            <p>
              Wir freuen uns über Ihren Besuch auf unserer Webseite und Ihr Interesse an der Villa Schwerzenbach. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
            </p>
            <div>
              <h2 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-2">1. Verantwortliche Stelle</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:<br />
                Villa Schwerzenbach by MIVA<br />
                Römerstraße 23<br />
                6900 Bregenz<br />
                Österreich<br />
                E-Mail: hello@villa-schwerzenbach.com
              </p>
            </div>
            
            <div>
              <h2 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-2">2. Datenerfassung auf unserer Webseite</h2>
              <p>
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
