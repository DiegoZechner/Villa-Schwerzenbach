export interface RoomData {
  id: string;
  topNumber: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  floor: string;
  size: number;
  type: string;
  category: string;
  bedrooms: string;
  beds: number;
  capacity: number;
  orientation: string;
  balcony?: string;
  notes?: string;
  locationNote?: string;
  price: number;
  image: string;
  amenities: string[];
}

export const allRooms: RoomData[] = [
  {
    id: '1',
    topNumber: '02',
    slug: 'die-aurelia',
    name: 'Top 02 - Die Aurelia',
    shortName: 'Die Aurelia',
    tagline: 'Das goldene Erwachen',
    description: '„Die Aurelia“ im ersten Stock fängt die Wärme der Südsonne und den Glanz römischer Geschichte perfekt ein. Dieses kompakte Juwel besticht durch zeitlose Eleganz und ein durchdachtes Raumkonzept. Ein besonderes Highlight ist das großzügige Badezimmer mit integrierter Ankleide, das für exklusiven Komfort sorgt. Ein edler Rückzugsort, der Charakter ausstrahlt und die perfekte Partnerin zur Nachbarin „Die Antiqua“ bildet.',
    floor: '1. OG',
    size: 30,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Süd',
    notes: 'Ankleide ist im großen Badezimmer',
    locationNote: 'Top 2 und Top 3 sind nebeneinander, wie ein Paar.',
    price: 159,
    image: '/images/rooms/top-02.jpg',
    amenities: [
      'Großzügiges Badezimmer mit integrierter Ankleide',
      'Ausrichtung nach Süden (Sonnenlage)',
      '1. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '2',
    topNumber: '03',
    slug: 'die-antiqua',
    name: 'Top 03 - Die Antiqua',
    shortName: 'Die Antiqua',
    tagline: 'Zeitlose Eleganz mit Aussicht',
    description: 'In der „Antiqua“ lebt das historische Erbe der Villa Schwerzenbach in einem hellen, lichtdurchfluteten Ambiente weiter. Der private Balkon bietet den perfekten Platz, um den Sonnenuntergang und das Spiel des Abendlichts über der Stadt zu beobachten. Ein Rückzugsort im ersten Stock, der Beständigkeit und Stil vereint – ideal für alle, die eine Verbindung aus Geschichte und einem weiten Blick über Bregenz suchen. Als charmante Nachbarin bildet sie das perfekte Pendant zur „Aurelia“.',
    floor: '1. OG',
    size: 33,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Süd-West',
    balcony: '3 m²',
    locationNote: 'Top 2 und Top 3 sind nebeneinander, wie ein Paar.',
    price: 169,
    image: '/images/rooms/top-03.jpg',
    amenities: [
      'Privater Balkon (3 m²) mit Blick über Bregenz',
      'Ausrichtung nach Süd-West (Abendsonne)',
      '1. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '3',
    topNumber: '04',
    slug: 'die-belle',
    name: 'Top 04 - Die Belle',
    shortName: 'Die Belle',
    tagline: 'Schönheit im Kreise der Liebsten',
    description: 'Das Familien-Apartment der Villa. „Die Belle“ bietet mit zwei separaten Schlafzimmern und viel Raum für Gemeinsamkeit den idealen Rahmen für Traditionen von morgen. Hier verbindet sich die Großzügigkeit der Belle Époque mit modernem Familienglück in bester Sonnenlage.',
    floor: '1. OG',
    size: 61,
    type: '3-Zimmer-Wohnung',
    category: '3-Zimmer-Wohnung',
    bedrooms: '2 (1x Doppel, 1x Einzel)',
    beds: 2,
    capacity: 3,
    orientation: 'Ost-Süd',
    price: 229,
    image: '/images/rooms/top-04.jpg',
    amenities: [
      '2 separate Schlafzimmer (1x Doppelbett, 1x Einzelbett)',
      'Großzügiger Wohnbereich',
      'Ausrichtung nach Ost-Süd (Sonnenlage)',
      '1. Obergeschoss',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '4',
    topNumber: '05',
    slug: 'das-atelier',
    name: 'Top 05 - Das Atelier',
    shortName: 'Das Atelier',
    tagline: 'Raum für Inspiration',
    description: '„Das Atelier“ ist ein Ort, der Geist und Seele öffnet. Neben einem stilvollen Wohnbereich bietet dieses Apartment einen inspirierenden Arbeitsplatz sowie einen privaten Balkon für die schöpferische Pause an der frischen Brise. Hier verbindet sich die Großzügigkeit der Villa mit einem modernen Rückzugsort für Visionäre, die Business und Erholung auf Niveau vereinen möchten. Ein Refugium, das Raum für neue Gedanken und echte Entspannung schafft.',
    floor: '2. OG',
    size: 46,
    type: '1-Zimmer-Wohnung',
    category: '1-Zimmer-Wohnung',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Süd-West',
    balcony: '5 m²',
    notes: 'Küche ist nicht im Schlafzimmer, vor der Küche ist ein offener Raum mit Arbeitsplatz',
    price: 199,
    image: '/images/rooms/top-05.jpg',
    amenities: [
      'Privater Balkon (5 m²)',
      'Separater Küchenbereich & offener Raum mit Arbeitsplatz',
      'Ausrichtung nach Süd-West',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '5',
    topNumber: '06',
    slug: 'der-flaneur',
    name: 'Top 06 - Der Flaneur',
    shortName: 'Der Flaneur',
    tagline: 'Der Romantiker der Villa',
    description: 'Mit dem Blick nach Westen fängt „Der Flaneur“ das sanfte Licht des Nachmittags perfekt ein. Dieses charmante Studio ist ein Rückzugsort für Genießer, die das Leben leicht nehmen und die besondere Atmosphäre der Villa schätzen. In direkter Nachbarschaft zur „Muse“ lädt das Apartment dazu ein, den Tag in aller Ruhe Revue passieren zu lassen. Ein Ort, der zum Verweilen einlädt und den Zauber des Augenblicks spürbar macht.',
    floor: '2. OG',
    size: 32,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'West',
    notes: '2 Fenster',
    locationNote: 'Top 6 und Top 7 sind nebeneinander, wie ein Paar.',
    price: 179,
    image: '/images/rooms/top-06.jpg',
    amenities: [
      '2 große Fenster mit Blick nach Westen (Nachmittagssonne)',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '6',
    topNumber: '07',
    slug: 'die-muse',
    name: 'Top 07 - Die Muse',
    shortName: 'Die Muse',
    tagline: 'Von der Inspiration geküsst',
    description: 'Drei große Fenster öffnen den Raum für das klare Licht des Nordens und Westens. Als idealer Gegenpol zum „Flaneur“ besticht „Die Muse“ durch ein helles, freundliches Ambiente und eine Ästhetik der Klarheit. Dieses Studio schafft den perfekten Rahmen, um den Gedanken freien Lauf zu lassen und Raum für kreative Träume zu finden. Ein inspirierender Rückzugsort in der Villa Schwerzenbach, der Ruhe und neue Energie schenkt.',
    floor: '2. OG',
    size: 36,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'West-Nord',
    notes: '3 Fenster',
    locationNote: 'Top 6 und Top 7 sind nebeneinander, wie ein Paar.',
    price: 189,
    image: '/images/rooms/top-07.jpg',
    amenities: [
      '3 große Fenster (Ausrichtung West-Nord)',
      'Helles, lichtdurchflutetes Studio-Ambiente',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '7',
    topNumber: '08',
    slug: 'der-lacus',
    name: 'Top 08 - Der Lacus',
    shortName: 'Der Lacus',
    tagline: 'Die Tiefe des Bodensees',
    description: '„Lacus“ – eine lateinische Hommage an den See und das antike Brigantium. Drei Fenster blicken nach Norden und lassen die kühle, klare Atmosphäre des Wassers spürbar werden. Dieses exklusive Studio besticht durch seine ruhige Ausstrahlung und bildet den perfekten Rahmen für Gäste, die die Verbindung zur Geschichte und die tiefe Ruhe des Sees suchen. Ein Rückzugsort voller Beständigkeit, der die historische Seele der Stadt in die Villa Schwerzenbach holt.',
    floor: '2. OG',
    size: 30,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Nord',
    notes: '3 Fenster',
    locationNote: 'Top 8 und Top 9 sind nebeneinander, wie ein Paar.',
    price: 169,
    image: '/images/rooms/top-08.jpg',
    amenities: [
      '3 Fenster mit Blick nach Norden',
      'Ruhige, entspannte Atmosphäre',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '8',
    topNumber: '09',
    slug: 'der-kokon',
    name: 'Top 09 - Der Kokon',
    shortName: 'Der Kokon',
    tagline: 'Geborgenheit in ihrer reinsten Form',
    description: 'Als kleinstes und intimstes Apartment der Villa ist „Der Kokon“ ein Ort der Ruhe, an dem die Außenwelt verstummt. Ein gemütliches Nest zum Erholen und Krafttanken – reduziert auf das Wesentliche, aber kompromisslos in Qualität und Wohlgefühl. Dieses Studio bietet den perfekten Rahmen, um ganz bei sich anzukommen und die Geborgenheit eines privaten Rückzugsorts inmitten der Stadt zu genießen.',
    floor: '2. OG',
    size: 28,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Nord',
    notes: '1 Fenster',
    locationNote: 'Top 8 und Top 9 sind nebeneinander, wie ein Paar.',
    price: 159,
    image: '/images/rooms/top-09.jpg',
    amenities: [
      'Intimes Studio-Design (1 Fenster, Nord-Ausrichtung)',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '9',
    topNumber: '10',
    slug: 'der-ambitus',
    name: 'Top 10 - Der Ambitus',
    shortName: 'Der Ambitus',
    tagline: 'Der Raum für Visionen',
    description: 'Im majestätischen Erker des „Ambitus“ verschwimmen die Grenzen zwischen Innen und Außen. Dieses architektonische Highlight bietet einen 180-Grad-Blick über Bregenz und schenkt Raum für den persönlichen Horizont. Ein besonderes Erlebnis ist das großzügige Badezimmer, das fast wie ein eigener Raum wirkt. Ein exklusiver Ort für Visionäre, der die Weite der Umgebung mit Komfort und architektonischer Klarheit vereint.',
    floor: '2. OG',
    size: 43,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Nord-Ost',
    notes: 'Mit Erker, Badezimmer 9 m²',
    price: 219,
    image: '/images/rooms/top-10.jpg',
    amenities: [
      'Majestätischer Erker mit 180-Grad-Blick über Bregenz',
      'Großzügiges 9 m² Badezimmer',
      'Ausrichtung nach Nord-Ost',
      '2. Obergeschoss',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '10',
    topNumber: '11',
    slug: 'die-via-sol',
    name: 'Top 11 - Die Via Sol',
    shortName: 'Die Via Sol',
    tagline: 'Das Flaggschiff des Lichts',
    description: 'Das größte Apartment der Villa Schwerzenbach ist ein strahlendes Erlebnis für höchste Ansprüche. Mit zwei separaten Schlafzimmern, einem Gäste-WC und einem weitläufigen Wohnbereich bietet „Die Via Sol“ den idealen Rahmen für geselliges Beisammensein und exklusiven Komfort. Hier wandert die Sonne von Osten nach Süden durch die großzügigen Räume und erfüllt das historische Ambiente mit natürlicher Energie und Klarheit.',
    floor: '2. OG',
    size: 76,
    type: '3-Zimmer-Wohnung',
    category: '3-Zimmer-Wohnung',
    bedrooms: '2 (1x Doppel, 1x Einzel + 1x Doppel)',
    beds: 4,
    capacity: 5,
    orientation: 'Ost-Süd',
    notes: 'Zusätzlich Gäste-WC',
    price: 329,
    image: '/images/rooms/top-11.jpg',
    amenities: [
      'Größtes Apartment der Villa (76 m²)',
      '2 separate Schlafzimmer (4 Betten für bis zu 5 Personen)',
      'Weitläufiger Wohnbereich & zusätzliches Gäste-WC',
      'Ausrichtung nach Ost-Süd (ganztägige Sonne)',
      '2. Obergeschoss',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  },
  {
    id: '11',
    topNumber: '12',
    slug: 'die-aura',
    name: 'Top 12 - Die Aura',
    shortName: 'Die Aura',
    tagline: 'Die Seele über den Dächern',
    description: 'Hoch oben im Dachgeschoss atmet „Die Aura“ die unsichtbare Eleganz des Hauses. Mit freiem Blick über den See und einem luxuriösen Bad, das mit Dusche und Wanne zur Auszeit einlädt, ist dieses Studio der wahr gewordene Höhepunkt der Villa. Ein Ort mit unvergleichlichem Flair, der den Geist zur Ruhe kommen lässt und die Freiheit über den Dächern spürbar macht. Hier oben scheint die Zeit stillzustehen.',
    floor: 'DG',
    size: 46,
    type: 'Studio',
    category: 'Studio',
    bedrooms: '1',
    beds: 1,
    capacity: 2,
    orientation: 'Nord',
    notes: 'Badezimmer mit Dusche und Badewanne, Seeblick',
    price: 279,
    image: '/images/rooms/top-12.jpg',
    amenities: [
      'Dachgeschoss mit freiem Blick über den Bodensee',
      'Luxuriöses Badezimmer mit Dusche und Badewanne',
      'Ausrichtung nach Norden',
      'Kingsize-Bett',
      'Espressomaschine & High-Speed WLAN',
      'Premium Pflegeprodukte'
    ]
  }
];

