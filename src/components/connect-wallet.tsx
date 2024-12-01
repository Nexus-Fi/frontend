'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { FaEllipsisV } from "react-icons/fa"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ConnectWallet() {
    const [isConnected, setIsConnected] = React.useState(false)

    if (isConnected) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                    0x1234...5678
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <FaEllipsisV className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsConnected(false)}>
                            Disconnect
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    return (
        <Button onClick={() => setIsConnected(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Connect Wallet
        </Button>
    )
}

