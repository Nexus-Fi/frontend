import Restaking from "@/components/Restaking";

export default function Home() {
    return (
        <main className="flex flex-col justify-between px-28 py-16">
            {/* <Restaking /> */}
            <div className="flex flex-col items-center mt-10">
                <img src="https://i.imgflip.com/4/30b1gx.jpg" alt="Launching Soon Meme" className="w-1/2 h-auto" />
                <h1 className="text-4xl font-bold mt-5">Launching Soon!</h1>
                <p className="text-lg mt-2">Stay tuned for something awesome!</p>
            </div>
        </main>
    );
}
