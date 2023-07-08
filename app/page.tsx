import { Calendar } from '@/components';
import { monthMM } from '@/utils/date';

export default function Home() {
  return (
    <main className="container pt-6 mb-10">
      <h1 className="font-black text-sky-950 text-4xl text-center">
        PT Sukses Solusindo Digital
      </h1>
      <div className="font-bold text-sky-900 text-3xl text-center mt-3">
        Calendar - {monthMM}
      </div>
      <div className="rounded-lg overflow-hidden">
        <Calendar />
      </div>
    </main>
  );
}
