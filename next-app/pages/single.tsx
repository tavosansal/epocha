import Navbar from '../components/Navbar';
import { useConverters } from '../context/ConvertersContext';
import UnixConverter from '../components/UnixConverter';

export default function Single() {
  const { converters } = useConverters();
  const first = converters[0];

  return (
    <div>
      <Navbar />
      <main className="container py-6">
        <h2 className="text-2xl font-bold mb-4">Single Converter</h2>
        {first ? <UnixConverter converter={first} /> : <p>No converter found</p>}
      </main>
    </div>
  );
}
