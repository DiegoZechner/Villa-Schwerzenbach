export default function ImpressumPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-cream p-8 md:p-16 shadow-2xl border border-cream-light">
          <div className="text-center mb-12">
            <span className="font-script text-3xl text-villa-red block mb-1">Villa Schwerzenbach by MIVA</span>
            <h1 className="font-villa-editorial text-4xl md:text-5xl text-espresso uppercase tracking-[0.18em]">Impressum</h1>
          </div>
          
          <div className="space-y-6 text-espresso/85 bg-cream-light p-8 md:p-12 border border-espresso/15 text-sm leading-relaxed">
            <div>
              <h2 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-2">Betreiber der Webseite</h2>
              <p>
                <strong>Villa Schwerzenbach by MIVA</strong><br />
                Römerstraße 23<br />
                6900 Bregenz<br />
                Österreich
              </p>
            </div>
            
            <div>
              <h2 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-2">Kontakt</h2>
              <p>
                Telefon: +43 5574 123456<br />
                E-Mail: hello@villa-schwerzenbach.com<br />
                Webseite: www.villa-schwerzenbach.com
              </p>
            </div>

            <div>
              <h2 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-2">Haftungsausschluss</h2>
              <p>
                Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
