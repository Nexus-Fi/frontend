import Image from "next/image";
import Delegate from "@/components/Delegate";

export default function Home() {
    return (
        <main className="flex flex-col justify-between px-28 py-16">
            <Delegate />
        </main>
    );
}
