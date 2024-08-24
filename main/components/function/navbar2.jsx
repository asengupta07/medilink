"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import ThemeSwitcher from "../theme/ThemeSwitcher"
import { useAuth } from "@/app/_contexts/authContext"
import { useRouter, usePathname } from "next/navigation"
import { FaRegCalendarPlus } from "react-icons/fa6";
import { BsGraphUp } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { PiPrescription } from "react-icons/pi";

const Navbar = ({ isMenuOpen, handleMenuToggle }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { token, logout } = useAuth()
    const [name, setName] = useState('')

    const getName = async () => {
        const res = await fetch("/api/getName", {
            method: "GET",
            headers: {
                Authorization: token
            }
        })
        const data = await res.json()
        setName(data.name)
    }

    useEffect(() => {
        if (token) {
            getName()
        }
    }, [token])

    const handleLogout = () => {
        logout()
        router.push("/")
    }


    if (pathname === "/provider/dashboard") {
        return (
            <header className="text-primary py-4 px-4 lg:px-6 shadow-md dark:shadow-gray-800 backdrop-blur-lg bg-opacity-30 sticky top-0 left-0 right-0 z-50 flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={handleMenuToggle}
                    >
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                    <Link
                        href="/"
                        className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground md:text-base"
                        prefetch={false}
                    >
                        <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">MediLink</span>
                    </Link>
                    <h1 className="text-base font-medium">MediLink</h1>
                    <nav
                        className={`fixed top-14 left-0 z-40 w-full bg-background px-4 py-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                            } lg:static lg:translate-x-0 lg:bg-transparent lg:px-0 lg:py-0 lg:flex`}
                    >
                        <div className="grid gap-4 lg:flex lg:gap-4">
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-2 px-2 ${pathname === '/dashboard' ? 'text-blue-500' : 'text-foreground'}`}
                                prefetch={false}
                            >
                                <HomeIcon className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/pharmacies"
                                className={`flex items-center gap-2 px-2 ${pathname === '/pharmacies' ? 'text-blue-500' : 'text-foreground'}`}
                                prefetch={false}
                            >
                                <PiPrescription className="h-5 w-5" />
                                Pharmacies
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <img
                                    src="med.jpg"
                                    width={32}
                                    height={32}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="w-full cursor-pointer" onClick={handleLogout}><button>Logout</button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        );
    }

    return (
        <header className="text-primary py-4 px-4 lg:px-6 shadow-md dark:shadow-gray-800 backdrop-blur-lg bg-opacity-30 sticky top-0 left-0 right-0 z-50 flex justify-between items-center w-full">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={handleMenuToggle}
                >
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                <Link
                    href="/"
                    className="group flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground md:text-base"
                    prefetch={false}
                >
                    <MountainIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">MediLink</span>
                </Link>
                <h1 className="text-base font-medium">MediLink</h1>
                <nav
                    className={`fixed top-14 left-0 z-40 w-full bg-background px-4 py-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                        } lg:static lg:translate-x-0 lg:bg-transparent lg:px-0 lg:py-0 lg:flex`}
                >
                    <div className="grid gap-4 lg:flex lg:gap-4">
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-2 text-foreground"
                            prefetch={false}
                        >
                            <HomeIcon className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-2 text-foreground"
                            prefetch={false}
                        >
                            <FaRegCalendarPlus className="h-4 w-4" />
                            Appointments
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-2 text-foreground"
                            prefetch={false}
                        >
                            <BsGraphUp className="h-4 w-4" />
                            Analytics
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-2 text-foreground"
                            prefetch={false}
                        >
                            <IoSettingsOutline className="h-5 w-5" />
                            Manage Services
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-2 text-foreground"
                            prefetch={false}
                        >
                            <BiMessageRounded className="h-5 w-5" />
                            Feedbacks
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <img
                                src="med.jpg"
                                width={32}
                                height={32}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="w-full cursor-pointer" onClick={handleLogout}><button>Logout</button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Navbar;

function MenuIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>)
    );
}

function HomeIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>)
    );
}

function MountainIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>)
    );
}