import Image from "next/image";
import Calendar from "./calendar";

export default function Home() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Calendar />
    </main>
  );
}
