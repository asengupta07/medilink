"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, DollarSign, Package, Users, AlertTriangle } from "lucide-react"
import Component from "@/components/function/navbar3"

export default function Dashboard() {
    return (
        <div>
            <Component />
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Total Orders</CardTitle>
                                <CardDescription className="text-sm sm:text-base">All orders including pending, completed, and canceled</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">1,234</div>
                                    <ShoppingCart className="h-8 w-8 text-primary" />
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="/pharmacy/allorders" prefetch={false}>View All Orders</Link>
                            </CardFooter>
                        </Card>

                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">New Orders</CardTitle>
                                <CardDescription className="text-sm sm:text-base">Unprocessed orders awaiting action</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">42</div>
                                    <Package className="h-8 w-8 text-primary" />
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="/pharmacy/orders" prefetch={false}>Process New Orders</Link>
                            </CardFooter>
                        </Card>

                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Total Revenue</CardTitle>
                                <CardDescription className="text-sm sm:text-base">Revenue generated this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">$87,429</div>
                                    <DollarSign className="h-8 w-8 text-primary" />
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="/pharmacy/revenue" prefetch={false}>View Revenue Details</Link>
                            </CardFooter>
                        </Card>

                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Inventory Alerts</CardTitle>
                                <CardDescription className="text-sm sm:text-base">Low-stock or out-of-stock items</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">7</div>
                                    <AlertTriangle className="h-8 w-8 text-primary" />
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="/pharmacy/inventory" prefetch={false}>View Inventory Alerts</Link>
                            </CardFooter>
                        </Card>

                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Customer Count</CardTitle>
                                <CardDescription className="text-sm sm:text-base">New and returning customers this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">856</div>
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="#" prefetch={false}>View Customer Details</Link>
                            </CardFooter>
                        </Card>

                        <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Pharmacy Info</CardTitle>
                                <CardDescription className="text-sm sm:text-base">Details about your pharmacy</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm sm:text-base">Name:</span>
                                        <span className="text-sm sm:text-base">HealthCare Pharmacy</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm sm:text-base">License No:</span>
                                        <span className="text-sm sm:text-base">PHR12345</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm sm:text-base">Pharmacist:</span>
                                        <span className="text-sm sm:text-base">Dr. Jane Smith</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm sm:text-base">Hours:</span>
                                        <span className="text-sm sm:text-base">9AM - 9PM</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                                <Link href="#" prefetch={false}>Edit Pharmacy Info</Link>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}