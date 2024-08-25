"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, X, FileText } from "lucide-react"
import Component from "@/components/function/navbar3"

export default function OrdersManagement() {
    const [activeTab, setActiveTab] = useState("new")
    const [orders, setOrders] = useState([
        { id: "ORD001", customer: "John Doe", items: "Aspirin, Bandages", total: "$24.99", status: "New", hasPrescription: false },
        { id: "ORD002", customer: "Jane Smith", items: "Antibiotics", total: "$45.50", status: "New", hasPrescription: true },
        { id: "ORD003", customer: "Bob Johnson", items: "Vitamins, Supplements", total: "$67.25", status: "Processing", hasPrescription: false },
        { id: "ORD004", customer: "Alice Brown", items: "Pain relievers", total: "$15.75", status: "Completed", hasPrescription: false },
        { id: "ORD005", customer: "Charlie Davis", items: "Prescription medication", total: "$89.99", status: "New", hasPrescription: true },
    ])

    const ordersToApprove = orders.filter(order => order.status === "New")

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        )
    }

    return (
        <div>
            <Component />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Order List</CardTitle>
                            <CardDescription>Manage and track all orders</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="new" className="w-full" onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="new">New</TabsTrigger>
                                    <TabsTrigger value="processing">Processing</TabsTrigger>
                                    <TabsTrigger value="shipped">Shipped</TabsTrigger>
                                    <TabsTrigger value="all">Today&apos;s Orders</TabsTrigger>
                                </TabsList>
                                <TabsContent value="new">
                                    <OrderTable orders={orders.filter(order => order.status === "New")} updateOrderStatus={updateOrderStatus} />
                                </TabsContent>
                                <TabsContent value="processing">
                                    <OrderTable orders={orders.filter(order => order.status === "Processing")} updateOrderStatus={updateOrderStatus} />
                                </TabsContent>
                                <TabsContent value="Completed">
                                    <OrderTable orders={orders.filter(order => order.status === "Completed")} updateOrderStatus={updateOrderStatus} />
                                </TabsContent>
                                <TabsContent value="all">
                                    <OrderTable orders={orders} updateOrderStatus={updateOrderStatus} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {activeTab === "new" && (
                        <div>
                            <h1 className="text-3xl font-bold mb-8">Orders Pending Approval</h1>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {ordersToApprove.map((order) => (
                                    <Card key={order.id} className="flex flex-col">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                {order.id}
                                            </CardTitle>
                                            <Badge variant={order.hasPrescription ? "default" : "secondary"}>
                                                {order.hasPrescription ? "Rx" : "OTC"}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{order.total}</div>
                                            <p className="text-xs text-muted-foreground">{order.customer}</p>
                                            <p className="text-sm mt-2 mb-4">{order.items}</p>
                                            <div className="flex space-x-2">
                                                <Button className="flex-1" size="sm" onClick={() => updateOrderStatus(order.id, "Processing")}>
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Approve
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex-1" onClick={() => updateOrderStatus(order.id, "Canceled")}>
                                                    <X className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                            {order.hasPrescription && (
                                                <Button variant="ghost" className="w-full mt-2" size="sm">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View Prescription
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function OrderTable({ orders, updateOrderStatus }) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                                <OrderStatusBadge status={order.status} />
                            </TableCell>
                            <TableCell>
                                <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="Processing">Processing</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Delivered">Delivered</SelectItem>
                                        <SelectItem value="Canceled">Canceled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

function OrderStatusBadge({ status }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "New":
                return "bg-blue-500"
            case "Processing":
                return "bg-yellow-500"
            case "Shipped":
                return "bg-green-500"
            case "Delivered":
                return "bg-purple-500"
            case "Canceled":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <Badge className={`${getStatusColor(status)} text-white`}>
            {status}
        </Badge>
    )
}