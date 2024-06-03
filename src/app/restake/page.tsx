import Image from "next/image";
import Restaking from "@/components/Restaking";

export default function Home() {
    return (
        <main className="flex flex-col justify-between px-28 py-16">
            <Restaking />
        </main>
    );
}
