"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaTelegramPlane, FaDiscord, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
];

const Footer = () => {
    return (
        <div className="p-6">
            <div className="flex justify-center space-x-4">
                <Link href="https://t.me/NexusFinanceglobal" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost">
                        <FaTelegramPlane size={20} />
                    </Button>
                </Link>
                <Link href="https://discord.com/invite/hpkjjQcB" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost">
                        <FaDiscord size={20} />
                    </Button>
                </Link>
                <Link href="https://x.com/NexusFi_xyz" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost">
                        <FaTwitter size={20} />
                    </Button>
                </Link>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2 text-sm text-gray-600">
                {footerLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="hover:underline">
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Footer; 