import BookingsTable from '@/components/admin/BookingsTable';

export default function BookingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#35271f] font-playfair mb-6">Buchungsverwaltung</h1>
      <BookingsTable />
    </div>
  );
}
