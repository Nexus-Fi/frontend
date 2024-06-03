import Image from "next/image";
import DiscoverAVS from "@/components/DiscoverAVS";

export default function Home() {
    return (
        <main className="flex flex-col justify-between px-28 py-16">
            <DiscoverAVS />
        </main>
    );
}
