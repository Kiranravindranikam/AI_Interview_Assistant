import { supabase } from '@/lib/supabaseClient';

export default async function InstrumentsPage() {
  const { data: instruments, error } = await supabase.from('instruments').select();

  if (error) {
    return <div>Error loading instruments: {error.message}</div>;
  }

  return (
    <ul>
      {instruments?.map((instrument: { id: number; name: string }) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  );
}
