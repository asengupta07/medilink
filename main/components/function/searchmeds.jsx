'use client'

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useAuth } from "@/app/_contexts/authContext"
import { IoTrashOutline } from "react-icons/io5"


export default function Searchmeds() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const { token } = useAuth()
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    availability: "all",
  })
  const [sort, setSort] = useState("name-asc")
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [medicines, setMedicines] = useState([])
  const [cart, setCart] = useState([])
  const [showToast, setShowToast] = useState(false); // State for toast
  const [toastMessage, setToastMessage] = useState("");



  useEffect(() => {
    // Fetch medicines
    fetch("/api/getMedicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data)
      })
      .catch((error) => console.error("Error fetching medicines", error))
  }, [])

  const FilteresandSortedmedicines = useMemo(() => {
    return medicines
      .filter((medicine) => {
        const searchValue = search.toLowerCase()
        return (
          medicine.name.toLowerCase().includes(searchValue) || medicine.category.toLowerCase().includes(searchValue)
        )
      })
      .filter((medicine) => {
        if (filters.category === "all") return true
        return medicine.category === filters.category
      })
      .filter((medicine) => {
        if (filters.price === "all") return true
        if (filters.price === "low") return medicine.price >= 100 && medicine.price <= 150
        if (filters.price === "medium") return medicine.price > 150 && medicine.price <= 300
        if (filters.price === "high") return medicine.price > 300
      })
      .filter((medicine) => {
        if (filters.availability === "all") return true
        return filters.availability === (medicine.inStock ? "in-stock" : "out-of-stock")
      })
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name)
        if (sort === "name-desc") return b.name.localeCompare(a.name)
        if (sort === "price-asc") return a.price - b.price
        if (sort === "price-desc") return b.price - a.price
      })
  }, [search, filters, sort, medicines])

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === medicine._id)
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === medicine._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...medicine, quantity: 1 }]
    })
    setToastMessage(`${medicine.name} has been added to the cart.`);
    setShowToast(true);
  }

  const removeFromCart = (medicineId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== medicineId))
  }

  const updateQuantity = (medicineId, newQuantity) => {
    if (newQuantity < 1) return
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === medicineId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleBookMedicines = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setName("")
    setPhone("")
  }

  const handleSubmit = () => {
    const cartItems = cart.map((item) => ({
      medicineId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      providerId: item.providerId,
      total: item.price * item.quantity,
    }))
    const data = {
      providerId: id,
      name,
      phone,
      cart: cartItems,
    }
    fetch("/api/bookMedicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Mashallah!!! Great Success!!")
        }
      })
    handleCloseModal()
    setCart([])
  }

  return (
    <section className="w-full py-12">
    {showToast && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="grid gap-1 justify-items-start">
            <h1 className="text-2xl font-bold tracking-tight">Find Your Medicines</h1>
            <p className="text-muted-foreground">Search and browse our wide selection of medicines.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-5 md:mt-0">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap md:flex-row gap-4 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    <FilterIcon className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filters.category}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                  >
                    <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Pain Relief">Pain Relief</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Allergy">Allergy</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Digestive">Digestive</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filters.price}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, price: value }))}
                  >
                    <DropdownMenuRadioItem value="all">All Prices</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="low">Low (₹100 - ₹150)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="medium">Medium (₹150 - ₹300)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="high">High (₹300+)</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={filters.availability}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, availability: value }))}
                  >
                    <DropdownMenuRadioItem value="all">All Availability</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="in-stock">In Stock</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="out-of-stock">Out of Stock</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0">
                    <ListOrderedIcon className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                    <DropdownMenuRadioItem value="name-asc">Name: A-Z</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name-desc">Name: Z-A</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shrink-0">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({totalItems})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]" align="end">
                <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cart.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">Your cart is empty</div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div key={item._id} className="flex items-center justify-between p-2">
                        <div>
                          <div>{item.name}</div>
                          <div className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} x {item.quantity}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</Button>
                          <span>{item.quantity}</span>
                          <Button size="icon" variant="outline" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</Button>
                          <Button
                            className="bg-transparent border border-rose-500 hover:bg-rose-500 group"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <IoTrashOutline className="text-rose-500 group-hover:text-white h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <DropdownMenuSeparator />
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <span>Total:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" onClick={handleBookMedicines}>Book Medicines</Button>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>

        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {FilteresandSortedmedicines.map((medicine) => (
            <div key={medicine._id} className="grid gap-4">
              <div className="grid gap-2 relative group transition-all duration-300 md:hover:scale-105 md:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="grid gap-1 px-2">
                  <h3 className="font-semibold">{medicine.name}</h3>
                  <p className="text-sm leading-none text-muted-foreground">{medicine.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">₹{medicine.price.toFixed(2)}</div>
                    <Badge variant={medicine.inStock ? "secondary" : "outline"} className="text-xs">
                      {medicine.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={() => addToCart(medicine)} disabled={!medicine.inStock}>
                  {medicine.inStock ? "Add to Cart" : "Unavailable"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Dialog open={showModal} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <h2 className="text-lg font-medium">Book Medicines</h2>
              <div className="grid gap-4 w-full">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
              <Button onClick={handleSubmit}>Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
    </section>
  )
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
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function ListOrderedIcon(props) {
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
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

function SearchIcon(props) {
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
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
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
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
function Toast({ message, duration, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50"
    >
      {message}
      <button onClick={onClose} className="ml-4">
        <XIcon className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
