"use client";
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { FaCube, FaDollarSign, FaSync } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { SidebarLink } from "@/types/dashboard"
import { FaTelegramPlane, FaDiscord, FaTwitter } from 'react-icons/fa';
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

const navigation: SidebarLink[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: FaCube,
    },
    {
        label: "Stake",
        href: "/stake",
        icon: FaDollarSign,
    },
    {
        label: "Restake",
        href: "/restake",
        icon: FaSync,
        isComingSoon: true,
    },
]

const footerLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
]

export function Sidebar() {
    const pathname = usePathname();

    console.log("router", pathname)

    return (
        <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
            <div className="p-6">
                <Image
                    src="/logo.png"
                    alt="NexusFi"
                    width={120}
                    height={40}
                    className="mb-8"
                />
                <nav className="space-y-5">
                    {navigation.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button variant={pathname === item.href ? "secondary" : "ghost"}
                                className={`w-full my-3 py-4 justify-start ${pathname === item.href ? "bg-[#DFFFD6]" : ""}`}
                            >
                                {React.createElement(item.icon as IconType, { className: "mr-2 h-4 w-4", 'aria-hidden': "true" })}
                                {item.label}
                                {item.isComingSoon && (
                                    <Badge variant="outline" className="ml-auto">
                                        Soon
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-6">
                <div className="flex justify-center space-x-4">
                    <Link href="https://t.me/nexusfi" target="_blank">
                        <Button size="icon" variant="ghost">
                            <FaTelegramPlane size={20} />
                        </Button>
                    </Link>
                    <Link href="https://discord.gg/nexusfi" target="_blank">
                        <Button size="icon" variant="ghost">
                            <FaDiscord size={20} />
                        </Button>
                    </Link>
                    <Link href="https://x.com/NexusFi_xyz" target="_blank">
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
        </div>
    )
}

