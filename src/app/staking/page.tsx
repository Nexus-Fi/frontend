"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function StakePage() {
    const [amount, setAmount] = useState("")
    const [selectedAsset, setSelectedAsset] = useState("")

    const handleStake = () => {
        // Implement staking logic here
        console.log("Staking", amount, selectedAsset)
    }

    // Calculate stNIBI amount based on input
    const stNIBIAmount = amount ? parseFloat(amount) : 0

    return ( 
        <div className="max-w-xl mx-auto pt-6 pb-20">
            <div className="relative w-full h-[500px]">
                <Card className="bg-white border-gray-900 h-[500px] p-8">
                    <Card className="bg-white border-gray-800 p-6 absolute top-[-2%] left-[-2%] right-[2%] bottom-[2%]">
                        <Tabs defaultValue="stake" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                <TabsTrigger
                                    value="stake"
                                    className="data-[state=active]:bg-white data-[state=active]:text-gray-800 py-2 px-4 rounded-md"
                                >
                                    Stake
                                </TabsTrigger>
                                <TabsTrigger
                                    value="unstake"
                                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 py-2 px-4 rounded-md"
                                >
                                    Unstake
                                </TabsTrigger>
                                <TabsTrigger
                                    value="withdraw"
                                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 py-2 px-4 rounded-md"
                                >
                                    Withdraw
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="stake" className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            Select the asset
                                        </label>
                                        <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select asset" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nibi">NIBI</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 mb-2">
                                            Enter Amount
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="0.0"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    <div className="flex justify-between text-sm py-2">
                                        <span className="text-gray-600">You will get</span>
                                        <span className="text-gray-900">{stNIBIAmount} stNIBI</span>
                                    </div>

                                    <div className="flex justify-between text-sm py-2">
                                        <span className="text-gray-600">Exchange Rate</span>
                                        <span className="text-gray-900">1 st NIBI = 1 NIBI</span>
                                    </div>

                                    <Button
                                        onClick={handleStake}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
                                        disabled={!amount || !selectedAsset}
                                    >
                                        Stake
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="unstake">
                                <div className="text-center text-gray-500 py-8">
                                    Unstake functionality coming soon
                                </div>
                            </TabsContent>

                            <TabsContent value="withdraw">
                                <div className="text-center text-gray-500 py-8">
                                    Withdraw functionality coming soon
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </Card>
            </div>
        </div>
    )
}

