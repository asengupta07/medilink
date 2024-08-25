"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Component from "@/components/function/navbar3"

export default function Allorderpage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2023-06-01",
      status: "Completed",
      total: 99.99,
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2023-05-15",
      status: "Canceled",
      total: 49.99,
      paymentMethod: "PayPal",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      date: "2023-04-20",
      status: "Returned",
      total: 79.99,
      paymentMethod: "Debit Card",
    },
    {
      id: "ORD004",
      customer: "Sarah Lee",
      date: "2023-03-10",
      status: "Completed",
      total: 129.99,
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD005",
      customer: "Tom Wilson",
      date: "2023-02-28",
      status: "Completed",
      total: 59.99,
      paymentMethod: "PayPal",
    },
  ])

  const [filters, setFilters] = useState({
    customer: "",
    status: null,  // Use null instead of an empty string
    paymentMethod: null,  // Use null instead of an empty string
  })

  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const { customer, status, paymentMethod } = filters

      const customerMatch = customer ? order.customer.toLowerCase().includes(customer.toLowerCase()) : true
      const statusMatch = status !== null ? order.status === status : true
      const paymentMatch = paymentMethod !== null ? order.paymentMethod === paymentMethod : true

      return customerMatch && statusMatch && paymentMatch
    });
  }, [orders, filters])

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }))
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
  }

  const handleCloseModal = () => {
    setSelectedOrder(null)
  }

  return (
    <div>
      <Component />
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">All Orders</h1>
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search orders..."
              value={filters.customer}
              onChange={(e) => handleFilterChange("customer", e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="grid gap-4 p-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    id="status"
                    value={filters.status || "All"}  // Show "All" as placeholder
                    onValueChange={(value) => handleFilterChange("status", value === "All" ? null : value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem> {/* "All" option now with non-empty value */}
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                      <SelectItem value="Returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    id="payment-method"
                    value={filters.paymentMethod || "All"}  // Show "All" as placeholder
                    onValueChange={(value) => handleFilterChange("paymentMethod", value === "All" ? null : value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem> {/* "All" option now with non-empty value */}
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleOrderClick(order)}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "Completed" ? "secondary" : order.status === "Canceled" ? "outline" : "warning"
                      }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedOrder && (
          <Dialog open onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-4xl">
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <div className="text-2xl font-bold">{selectedOrder.id}</div>
                    <div className="text-muted-foreground">{selectedOrder.date}</div>
                  </div>

                </div>
                <div className="grid gap-6">
                  <div className="grid gap-4">
                    <div className="font-semibold">Order Items</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Product A</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>$49.99</TableCell>
                          <TableCell>$99.98</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Product B</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>$29.99</TableCell>
                          <TableCell>$29.99</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="grid gap-4">
                    <div className="font-semibold">Customer Details</div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Customer</div>
                        <div>{selectedOrder.customer}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Email</div>
                        <div>customer@example.com</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Phone</div>
                        <div>+1 (555) 555-5555</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="font-semibold">Payment Details</div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Payment Method</div>
                        <div>{selectedOrder.paymentMethod}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Total</div>
                        <div>${selectedOrder.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FilterIcon(props) {
  return (
    <svg
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
