import React from 'react';
import { CiDollar } from "react-icons/ci";
import Link from 'next/link';

const OperatorCard = () => {
    return (
        <div className="card my-5 bg-base-200 shadow-xl">
            <Link href="/operator/0x321980af329232423423"> // redirecting on basic of contract address
                <div className=" p-5 justify-between items-center">
                    <div className='flex flex-row w-full items-center gap-4'>
                        <CiDollar className='bg-yellow-300 rounded-xl text-3xl' />
                        <div>
                            <h2 className="text-left text-xl font-semibold ">NexusFi</h2>
                            <div className='text-[12px]'>0x321980af329232423423</div>
                        </div>

                    </div>
                    <div className="divider divider-neutral"></div>

                    <div>
                        <div className='pb-4'>InfStones is committed to supporting a wide range of AVSes and reward delegators through our Giveaway!
                        </div>
                        <div className='text-sm'>
                            <div className="my-1 border-t border-gray-300"></div>
                            <div className="">
                                <div className='flex items-center justify-between'>
                                    <div className=''>RESTAKE CONCENTRATION</div>
                                    <div> 5.3</div>
                                </div>
                            </div>

                            <div className="my-1 border-t border-gray-300"></div>
                            <div className="">
                                <div className='flex items-center justify-between'>
                                    <div className=''>NIBI RESTAKED</div>
                                    <div> 0.000</div>
                                </div>
                            </div>

                            <div className="my-1 border-t border-gray-300"></div>
                            <div className="">
                                <div className='flex items-center justify-between'>
                                    <div className=''>NEXUS RESTAKED</div>
                                    <div> 0.000</div>
                                </div>
                            </div>

                            <div className="my-1 border-t border-gray-300"></div>
                            <div className="">
                                <div className='flex items-center justify-between'>
                                    <div className=''>TOTAL NUM. STAKERS</div>
                                    <div> 0.000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='flex flex-row gap-4'>
                <div className="flex items-center justify-center">
                    <div className="w-px h-12 bg-green-300"></div>
                    <div className='flex flex-col px-2'>
                        <div> 0.000</div>
                        <div className='text-xs'>Restaked</div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-px h-12 bg-green-300"></div>
                    <div className='flex flex-col px-2'>
                        <div> 7320223</div>
                        <div className='text-xs'>TVL</div>
                    </div>
                </div>
            </div> */}
                </div>
            </Link>
        </div>
    );
};

export default OperatorCard;