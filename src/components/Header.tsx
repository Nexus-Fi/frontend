'use client'

import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { ConnectWallet } from "@/components/connect-wallet"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Sidebar from "@/components/Sidebar"

export function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>

                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>
            <ConnectWallet />
        </header>
    )
}

