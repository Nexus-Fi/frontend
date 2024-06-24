import Image from "next/image";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-28 py-16">
      <Dashboard />
    </main>
  );
}
