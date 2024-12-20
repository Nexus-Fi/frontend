"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const memes = [
        "https://steemitimages.com/DQmXjAYWYUiAdVXCpkfwxECwz3t3jQcSTALaFtcFcgkKbzu/DVEtDB_W0AAddsg.jpg", // HODL crying meme
        "https://steemitimages.com/DQmfYecXfqRhhT2kdT5TyskCorGAErsg8CRpzSSKo3Wbenp/IMG-20180126-WA0013.jpg", // Crypto portfolio down meme
        "https://steemitimages.com/1280x0/https://steemitimages.com/DQmWDR99pWVvjBdgbQhg516uhgxE7WcbeDZNfbcBjT5HNk2/IMG-20180126-WA0014.jpg",
    ];

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    return (
        <main className="flex max-h-screen flex-col items-center pb-10 justify-center p-8 text-center">
            <img
                src={randomMeme}
                alt="Crypto Meme"
                className="w-full max-w-md rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-xl mb-8 text-gray-600">
                Like your meme gains, this page has disappeared! 📉
            </p>
            <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Back to Homepage
                </Button>
            </Link>
        </main>
    );
} 