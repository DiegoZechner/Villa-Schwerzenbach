'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-36 pb-24 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="bg-cream p-8 md:p-16 shadow-2xl border border-cream-light">
          <div className="text-center mb-16">
            <span className="font-script text-3xl text-villa-red block mb-2">A home full of life</span>
            <h1 className="font-villa-editorial text-4xl md:text-6xl tracking-[0.2em] uppercase text-espresso">
              Contact
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Form & Info */}
            <div className="flex-1 space-y-14 w-full">
              <div>
                <h2 className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-villa-red mb-6">Reach Out</h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Nachricht!'); }}>
                  <div>
                    <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-espresso/25 py-4 font-sans text-sm text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-espresso/25 py-4 font-sans text-sm text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <input type="text" placeholder="SUBJECT" className="w-full bg-transparent border-b border-espresso/25 py-4 font-sans text-sm text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors" required />
                  </div>
                  <div>
                    <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-espresso/25 py-4 font-sans text-sm text-espresso placeholder:text-espresso/45 focus:outline-none focus:border-bordeaux transition-colors resize-none" required></textarea>
                  </div>
                  <button type="submit" className="bg-bordeaux text-white font-sans font-medium text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-villa-red transition-colors cursor-pointer">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex flex-col md:flex-row gap-12 pt-4 border-t border-espresso/15">
                <div>
                  <h2 className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-villa-blue mb-3">Location</h2>
                  <div className="font-sans text-sm leading-relaxed text-espresso/90">
                    <p className="font-semibold">Villa Schwerzenbach by MIVA</p>
                    <p>Römerstraße 23</p>
                    <p>6900 Bregenz</p>
                    <p>Österreich</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-villa-blue mb-3">Contact Info</h2>
                  <div className="font-sans text-sm leading-relaxed text-espresso/90">
                    <p>+43 5574 123456</p>
                    <p>hello@villa-schwerzenbach.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arch-Framed Map */}
            <div className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-md h-[480px] arch-mask border-4 border-cream-light bg-cream-light shadow-xl overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=R%C3%B6merstra%C3%9Fe%2023,%20Bregenz&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
