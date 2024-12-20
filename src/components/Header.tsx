'use client'

import { useState } from 'react'
import { Wallet } from "@/components/wallet"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "@/components/Sidebar"
import { FaBars } from 'react-icons/fa'

export function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                    <button
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Open Sidebar"
                    >
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            <Wallet />
        </header>
    )
}

