'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <h1 className="font-serif text-4xl md:text-5xl tracking-widest uppercase text-espresso mb-16 text-center">
          Contact
        </h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form & Info */}
          <div className="flex-1 space-y-16">
            <div>
              <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-espresso/60 mb-6">Reach Out</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div>
                  <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-espresso/20 py-4 font-sans text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-bordeaux transition-colors" required />
                </div>
                <div>
                  <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-espresso/20 py-4 font-sans text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-bordeaux transition-colors" required />
                </div>
                <div>
                  <input type="text" placeholder="SUBJECT" className="w-full bg-transparent border-b border-espresso/20 py-4 font-sans text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-bordeaux transition-colors" required />
                </div>
                <div>
                  <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-espresso/20 py-4 font-sans text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-bordeaux transition-colors resize-none" required></textarea>
                </div>
                <button type="submit" className="pt-4 font-mono text-xs tracking-[0.25em] uppercase text-espresso hover:text-bordeaux transition-colors pb-1 border-b border-transparent hover:border-bordeaux inline-block">
                  Send Message
                </button>
              </form>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              <div>
                <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-espresso/60 mb-4">Location</h2>
                <div className="font-sans text-sm leading-relaxed text-espresso/90">
                  <p>Villa Schwerzenbach</p>
                  <p>Römerstraße 23</p>
                  <p>6900 Bregenz</p>
                  <p>Österreich</p>
                </div>
              </div>
              <div>
                <h2 className="font-sans text-xs tracking-[0.25em] uppercase text-espresso/60 mb-4">Contact Info</h2>
                <div className="font-sans text-sm leading-relaxed text-espresso/90">
                  <p>+43 5574 123456</p>
                  <p>hello@villa-schwerzenbach.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 h-[500px] lg:h-auto border border-espresso/10 p-2 bg-white shadow-sm">
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
    </main>
  );
}
