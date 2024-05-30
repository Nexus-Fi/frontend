"use client"
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import React, { useState } from "react";
// import AppLogo from '../assets/app-logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { chainId } from '@/lib/constant'

declare const window: any;

const style = {
	wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
	logoContainer: `flex items-center cursor-pointer`,
	logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
	searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
	searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
	searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
	headerItems: ` flex items-center align-right justify-end`,
	headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
	headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

export default function Navbar() {
	const router = useRouter();
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [wallets, setWallets] = useState({
		isKeplrInstalled: null,
		isLeapInstalled: null,
	});

	const connect = async (wallet) => {
		if (wallet == "leap") {
			if (!window.leap) {
				alert("Please install leap extension");
			} else {
				try {
					await window.leap.enable(chainId);

					const offlineSigner = window.leap.getOfflineSigner(chainId);

					const accounts = await offlineSigner.getAccounts();

					// console.log(accounts[0].address);

					setShow(false);

					// dispatch(connected({ account: accounts[0].address, wallet: wallet }));
					// navigate("/navigate");
				} catch (error) {
					console.log(error);
				}
			}
		}

		if (wallet == "keplr") {
			if (!window.keplr) {
				alert("Please install keplr extension");
			} else {
				try {

					await window.keplr.enable(chainId);

					const offlineSigner = window.keplr.getOfflineSigner(chainId);

					const accounts = await offlineSigner.getAccounts();

					// console.log(accounts[0].address);

					setShow(false);

					// dispatch(connected({ account: accounts[0].address, wallet: wallet }));
					// navigate("/navigate");
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const connectKeplr = async () => {
		if (!window.keplr) {
			alert("Please install keplr extension");
		}
		else {
			try {

				await window.keplr.enable(chainId);

				const offlineSigner = window.keplr.getOfflineSigner(chainId);

				const accounts = await offlineSigner.getAccounts();

				console.log("address", accounts[0].address, "chainId", chainId);
				console.log(accounts)

				// console.log(accounts[0].address);

				setShow(false);

				// dispatch(connected({ account: accounts[0].address, wallet: wallet }));
				// navigate("/navigate");
			} catch (error) {
				console.log(error);
			}
		}
	};


	const checkInstalledWallets = () => {
		setWallets({
			isLeapInstalled: window.leap !== undefined,
			isKeplrInstalled: window.keplr !== undefined,
		});
	};

	return (
		<div className={style.wrapper}>
			<Link href="/">
				<div className={style.logoContainer}>
					{/* <Image src={mantleSeaLogo} height={80} width={200} alt="mantle logo" /> */}
					<div className="text-[32px] text-white font-serif"
					>
						NexusFi
					</div>
					<div className={style.logoText}></div>
				</div>
			</Link>



			<div className={style.headerItems}>
				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/");
					}}
				>
					Dashboard
				</div>

				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/restake");
					}}
				>
					Restake
				</div>

				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/operator");
					}}
				>
					Operator
				</div>

				<div
					className={style.headerItem}
					onClick={() => {
						router.push("/avs");
					}}
				>
					AVS
				</div>
			</div>

			<div className="flex flex-row space-x-1 items-center md:flex md:flex-grow justify-end ">
				{/* <div className={style.headerIcon} onClick={() => { router.push(`/profile/${address}`) }}> */}
				<div
					className={style.headerIcon}
					onClick={() => {
						router.push("/account");
					}}
				>
					<CgProfile />
				</div>
				<div className={style.headerIcon}>
					<MdOutlineAccountBalanceWallet />
				</div>
				<div
					className="bg-[#5D00CF] text-white px-[18px] py-[10px] rounded-[16px] cursor-pointer"
					onClick={connectKeplr}
				>
					Connect Keplr Wallet
				</div>
			</div>
		</div>
	);
};
