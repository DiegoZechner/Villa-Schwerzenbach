'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, X } from 'lucide-react';

const posts = [
  { id: 1, img: '/images/home/stay.jpg', text: 'Absolut traumhafter Aufenthalt! Das Apartment "Salon Bordeaux" war so stilvoll eingerichtet. Jederzeit wieder! ⭐️⭐️⭐️⭐️⭐️', user: 'Maria S.', likes: 124, comments: 12 },
  { id: 2, img: '/images/home/eat.jpg', text: 'Das Essen war hervorragend. Eine perfekte Location für ein Dinner. 🍷✨', user: 'Thomas K.', likes: 89, comments: 4 },
  { id: 3, img: '/images/home/meet.jpg', text: 'Haben hier unser Firmen-Retreat abgehalten. Besser geht es nicht.', user: 'Startup Inc.', likes: 45, comments: 2 },
  { id: 4, img: '/images/home/celebrate.jpg', text: 'Wir haben unsere Hochzeit hier gefeiert. Es war magisch! 💍❤️', user: 'Julia & Tim', likes: 302, comments: 45 },
  { id: 5, img: '/images/home/lobby.jpg', text: 'Der Empfang war herzlich, das Haus voller Geschichte. Kann ich nur wärmstens empfehlen.', user: 'Elena P.', likes: 112, comments: 8 },
  { id: 6, img: '/images/home/stay.jpg', text: '"Belle Époque" hat unsere Erwartungen übertroffen. Super bequemes Bett und tolle Aussicht. ⭐️⭐️⭐️⭐️⭐️', user: 'Johannes M.', likes: 67, comments: 3 },
];

export default function InstagramGallery() {
  const [activePost, setActivePost] = useState<typeof posts[0] | null>(null);

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-cream p-1 shrink-0">
             <Image src="/images/logos/miva-logo.png" alt="Miva Logo" fill className="object-contain p-1 rounded-full" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-espresso">@VillaSchwerzenbach_byMiva</h2>
            <p className="text-espresso/60 text-sm md:text-base">A House Full of Life. STAY • EAT • MEET • CELEBRATE</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="relative aspect-square cursor-pointer group"
              onClick={() => setActivePost(post)}
            >
              <Image src={post.img} alt="Gallery post" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-2"><Heart className="w-6 h-6 fill-white" /> {post.likes}</div>
                <div className="flex items-center gap-2"><MessageCircle className="w-6 h-6 fill-white" /> {post.comments}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {activePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-12" onClick={() => setActivePost(null)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setActivePost(null)}>
            <X className="w-8 h-8" />
          </button>
          
          <div className="bg-white w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden rounded-sm" onClick={e => e.stopPropagation()}>
            {/* Image side */}
            <div className="w-full md:w-3/5 h-[40vh] md:h-auto relative bg-black">
              <Image src={activePost.img} alt="Post image" fill className="object-contain" />
            </div>
            {/* Comments side */}
            <div className="w-full md:w-2/5 flex flex-col h-[50vh] md:h-auto md:max-h-[80vh]">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden relative shrink-0">
                   <Image src="/images/logos/miva-logo.png" alt="Miva Logo" fill className="object-cover p-1" />
                </div>
                <span className="font-bold text-sm text-espresso">VillaSchwerzenbach_byMiva</span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden relative shrink-0">
                     <Image src="/images/logos/miva-logo.png" alt="Miva Logo" fill className="object-cover p-1" />
                  </div>
                  <p className="text-sm text-espresso"><span className="font-bold mr-2">VillaSchwerzenbach_byMiva</span>Same Space. Different Stories. ✨</p>
                </div>
                
                {/* Mock Review */}
                <div className="flex gap-3 mt-6">
                  <div className="w-8 h-8 rounded-full bg-cream text-espresso flex items-center justify-center shrink-0 font-bold text-xs">
                     {activePost.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-espresso"><span className="font-bold mr-2">{activePost.user}</span>{activePost.text}</p>
                    <p className="text-xs text-gray-400 mt-1">Gepostet auf Google Reviews</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-4">
                    <Heart className="w-6 h-6 text-villa-red fill-villa-red cursor-pointer" />
                    <MessageCircle className="w-6 h-6 text-espresso cursor-pointer hover:text-gray-500" />
                    <Send className="w-6 h-6 text-espresso cursor-pointer hover:text-gray-500" />
                  </div>
                  <Bookmark className="w-6 h-6 text-espresso cursor-pointer hover:text-gray-500" />
                </div>
                <p className="text-sm font-bold text-espresso mb-1">{activePost.likes} "Gefällt mir"-Angaben</p>
                <p className="text-xs text-gray-400 uppercase">Vor 2 Tagen</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
