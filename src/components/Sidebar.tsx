"use client";
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaCube, FaDollarSign, FaSync, FaTelegramPlane, FaDiscord, FaTwitter, FaBars } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { SidebarLink } from "@/types/dashboard"
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer"
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

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-9 left-9 p-2 rounded-md text-black"
                onClick={toggleMobileMenu}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar Container */}
            <aside className={`
                fixed top-0 left-0 z-40 h-screen
                transition-transform duration-300 ease-in-out
                bg-white dark:bg-gray-900 border-r
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:w-64 md:static md:h-full md:transform-none
            `}>
                <div className="flex w-64 flex-col bg-white border-r border-gray-200 h-full">
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
                                    <Button
                                        variant={pathname === item.href ? "secondary" : "ghost"}
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

                    <div className="mt-auto md:hidden">
                        <Footer />
                    </div>
                </div>

                {/* create space box */}
                <div className="hidden md:block flex-col">
                    <div className="h-[200px]"></div>
                </div>

                <div className="flex flex-col mt-auto">
                    <Footer />
                </div>
            </aside>


            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    )
}

