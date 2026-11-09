'use client';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-8 md:pb-10 px-6 md:px-12 font-sans">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-cream p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="font-villa-editorial text-3xl md:text-4xl tracking-[0.2em] uppercase text-espresso">
              Contact
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Form & Info */}
            <div className="flex-1 space-y-10 w-full">
              <div>
                <h2 className="font-sans font-semibold text-[11px] tracking-[0.25em] uppercase text-villa-red mb-4">Reach Out</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Nachricht!'); }}>
                  <div>
                    <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-espresso/25 py-3 font-sans text-xs text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-espresso/25 py-3 font-sans text-xs text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <input type="text" placeholder="SUBJECT" className="w-full bg-transparent border-b border-espresso/25 py-3 font-sans text-xs text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <textarea placeholder="MESSAGE" rows={3} className="w-full bg-transparent border-b border-espresso/25 py-3 font-sans text-xs text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors resize-none" required></textarea>
                  </div>
                  <button type="submit" className="bg-bordeaux text-white font-sans font-medium text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-villa-red transition-colors cursor-pointer mt-2">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex flex-col sm:flex-row gap-10 pt-4 border-t border-espresso/15">
                <div>
                  <h2 className="font-sans font-semibold text-[11px] tracking-[0.25em] uppercase text-villa-blue mb-2">Location</h2>
                  <div className="font-sans text-xs leading-relaxed text-espresso/90">
                    <p className="font-semibold">Villa Schwerzenbach by MIVA</p>
                    <p>Römerstraße 23</p>
                    <p>6900 Bregenz</p>
                    <p>Österreich</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-sans font-semibold text-[11px] tracking-[0.25em] uppercase text-villa-blue mb-2">Contact Info</h2>
                  <div className="font-sans text-xs leading-relaxed text-espresso/90">
                    <p>+43 5574 123456</p>
                    <p>hello@villa-schwerzenbach.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Frameless Google Maps Widget */}
            <div className="flex-1 w-full h-[360px] lg:h-[400px] overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=R%C3%B6merstra%C3%9Fe%2023,%20Bregenz&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full block"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
