import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { rooms } from './schema';
import { eq } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'villa.db');
const client = createClient({ url: `file:${dbPath}` });
const db = drizzle(client);

const amenities = {
  Classic: ["WLAN", "Flatscreen-TV", "Minibar", "Safe", "Regendusche"],
  Comfort: ["WLAN", "Flatscreen-TV", "Minibar", "Safe", "Regendusche", "Sitzbereich", "Nespresso-Maschine"],
  Superior: ["WLAN", "Flatscreen-TV", "Minibar", "Safe", "Regendusche", "Sitzbereich", "Nespresso-Maschine", "Bademantel & Pantoffeln"],
  Deluxe: ["WLAN", "Flatscreen-TV", "Minibar", "Safe", "Regendusche", "Badewanne", "Sitzbereich", "Nespresso-Maschine", "Bademantel & Pantoffeln", "Stuckdecken"],
  Suite: ["WLAN", "Flatscreen-TV", "Minibar", "Safe", "Regendusche", "Freistehende Badewanne", "Separater Wohnbereich", "Nespresso-Maschine", "Bademantel & Pantoffeln", "Loungebereich"],
};

const seedRooms = [
  { slug: "rosengarten", name: "Rosengarten", category: "Classic", pricePerNight: 15900, capacity: 2, sizeSqm: 18, description: "Gemütliches Zimmer mit Blick auf den hauseigenen Rosengarten. Warme Farben und stilvolles Interieur laden zum Verweilen ein.", sortOrder: 1, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "parkblick", name: "Parkblick", category: "Classic", pricePerNight: 16900, capacity: 2, sizeSqm: 20, description: "Helles Zimmer mit Panoramablick auf den umliegenden Park. Der ideale Rückzugsort nach einem ereignisreichen Tag.", sortOrder: 2, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "salon-bordeaux", name: "Salon Bordeaux", category: "Comfort", pricePerNight: 18900, capacity: 2, sizeSqm: 24, description: "Elegantes Zimmer in warmen Bordeaux-Tönen mit einem gemütlichen Sitzbereich. Stilvolle Details und hochwertige Stoffe prägen das Ambiente.", sortOrder: 3, images: JSON.stringify(["/images/rooms/top-04/6900_Roemer23_Top04_-17.jpg", "/images/rooms/top-04/6900_Roemer23_Top04_-21.jpg", "/images/rooms/top-04/6900_Roemer23_Top04_-31.jpg", "/images/rooms/top-04/6900_Roemer23_Top04_-32.jpg", "/images/rooms/top-04/6900_Roemer23_Top04_-35.jpg"]) },
  { slug: "beletage", name: "Beletage", category: "Comfort", pricePerNight: 19900, capacity: 2, sizeSqm: 26, description: "Grosszügiges Zimmer im ersten Obergeschoss mit hohen Decken und historischem Charme. Klassische Eleganz trifft auf modernen Komfort.", sortOrder: 4, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "orangerie", name: "Orangerie", category: "Comfort", pricePerNight: 19900, capacity: 3, sizeSqm: 28, description: "Lichtdurchflutetes Zimmer mit verspielten botanischen Akzenten. Ideal für Familien oder Gäste, die etwas mehr Platz schätzen.", sortOrder: 5, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "bibliothek", name: "Bibliothek", category: "Superior", pricePerNight: 22900, capacity: 2, sizeSqm: 30, description: "Ruhiges Refugium mit edlen Holzmöbeln und einer kuratierte Bücherauswahl. Perfekt für Gäste, die Ruhe und Inspiration suchen.", sortOrder: 6, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "villa-blau", name: "Villa Blau", category: "Superior", pricePerNight: 23900, capacity: 2, sizeSqm: 32, description: "Stilvolles Zimmer in den charakteristischen Blautönen der Villa. Ein harmonisches Zusammenspiel aus Farbe, Licht und Design.", sortOrder: 7, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "dachterrasse", name: "Dachterrasse", category: "Superior", pricePerNight: 24900, capacity: 3, sizeSqm: 35, description: "Exklusives Zimmer mit privatem Zugang zur Dachterrasse und Blick über die Dächer von Schwerzenbach.", sortOrder: 8, images: JSON.stringify(["/images/rooms/placeholder.jpg"]) },
  { slug: "belle-epoque", name: "Belle Époque", category: "Deluxe", pricePerNight: 27900, capacity: 2, sizeSqm: 38, description: "Opulentes Zimmer, das die Pracht der Belle Époque einfängt. Hohe Stuckdecken, Kronleuchter und edle Materialien schaffen ein unvergessliches Erlebnis.", sortOrder: 9, images: JSON.stringify(["/images/rooms/top-10/6900_Roemer23_Top10_-11.jpg", "/images/rooms/top-10/6900_Roemer23_Top10_-16.jpg"]) },
  { slug: "grand-suite", name: "Grand Suite", category: "Suite", pricePerNight: 32900, capacity: 4, sizeSqm: 50, description: "Geräumige Suite mit separatem Wohnbereich und luxuriöser Ausstattung. Der perfekte Rahmen für besondere Anlässe.", sortOrder: 10, images: JSON.stringify(["/images/rooms/top-11/6900_Roemer23_Top11_-26.jpg"]) },
  { slug: "villa-suite", name: "Villa Suite", category: "Suite", pricePerNight: 37900, capacity: 4, sizeSqm: 65, description: "Die Krönung der Villa – unsere grösste Suite mit Panoramablick, freistehender Badewanne und einem eigenen Loungebereich.", sortOrder: 11, images: JSON.stringify(["/images/rooms/top-12/6900_Roemer23_Top12_-13.jpg", "/images/rooms/top-12/6900_Roemer23_Top12_-6.jpg"]) },
];

async function main() {
  console.log("Creating tables...");

  // Create tables manually since we're using libsql
  await client.execute(`CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    pricePerNight INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    sizeSqm INTEGER NOT NULL,
    amenities TEXT NOT NULL,
    images TEXT NOT NULL,
    isActive INTEGER NOT NULL DEFAULT 1,
    sortOrder INTEGER NOT NULL
  )`);

  await client.execute(`CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    roomId INTEGER NOT NULL REFERENCES rooms(id),
    guestName TEXT NOT NULL,
    guestEmail TEXT NOT NULL,
    guestPhone TEXT,
    checkIn TEXT NOT NULL,
    checkOut TEXT NOT NULL,
    numGuests INTEGER NOT NULL,
    totalPrice INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    stripeSessionId TEXT,
    stripePaymentIntent TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL
  )`);

  await client.execute(`CREATE TABLE IF NOT EXISTS blockedDates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER NOT NULL REFERENCES rooms(id),
    date TEXT NOT NULL,
    reason TEXT,
    UNIQUE(roomId, date)
  )`);

  await client.execute(`CREATE TABLE IF NOT EXISTS roomOccupiedDates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roomId INTEGER NOT NULL REFERENCES rooms(id),
    date TEXT NOT NULL,
    bookingId TEXT NOT NULL REFERENCES bookings(id),
    UNIQUE(roomId, date)
  )`);

  console.log("Tables created.");
  console.log("Seeding rooms...");

  for (const r of seedRooms) {
    const existing = await db.select().from(rooms).where(eq(rooms.slug, r.slug));
    if (existing.length === 0) {
      await db.insert(rooms).values({
        ...r,
        amenities: JSON.stringify(amenities[r.category as keyof typeof amenities]),
        isActive: true,
      });
      console.log(`  ✓ ${r.name}`);
    } else {
      console.log(`  - ${r.name} (exists)`);
    }
  }
  console.log("Done! 11 rooms seeded.");
}

main().catch(console.error);
