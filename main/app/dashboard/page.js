'use client'

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Header from "@/components/function/navbar"
import Link from "next/link"
import { useAuth } from "../_contexts/authContext"
import Loader2 from "@/components/function/load"

export default function Dashboard() {
  const { token } = useAuth()
  const [sortBy, setSortBy] = useState("distance")
  const [filters, setFilters] = useState({
    hospitals: true,
    clinics: true,
  })

  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleSortChange = (value) => {
    setSortBy(value)
  }
  const handleFilterChange = (type, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: checked,
    }))
  }

  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async (latitude, longitude) => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/services", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          method: 'POST',
          body: JSON.stringify({
            latitude,
            longitude
          })
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setServices(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchServices(latitude, longitude);
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getGeolocation();
  }, []);

  const filteredServices = useMemo(() => {
    if (!services) return [];
    return services
      .filter((service) => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
          (filters.hospitals && service.type === "Hospital") ||
          (filters.clinics && service.type === "Clinic");
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "distance":
            return a.distance - b.distance
          case "rating":
            return b.rating - a.rating
          case "name":
            return a.name.localeCompare(b.name);
          default:
            return 0
        }
      });
  }, [filters, sortBy, services, searchTerm]);

  useEffect(() => {
    document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOverlayClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      {(isMenuOpen || isSidebarOpen) && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div className='flex flex-1 overflow-hidden'>
        <aside className={`w-64 flex-shrink-0 overflow-y-auto bg-background p-6 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="flex flex-col items-start bg-gradient-to-b from-primary to-background text-primary-foreground">
              <CardTitle className="text-lg mb-2">Looking for medicines?</CardTitle>
              <CardDescription className="text-foreground text-[0.8rem] leading-[1rem] text-justify">
                Find nearby pharmacies with ease! Discover stores stocked with the medicines you need. Stay connected to your local pharmacy network effortlessly. Explore now and ensure you have access to the medicines you rely on.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-0 justify-center flex-grow">
              <div className="h-40 w-full flex justify-center items-center mb-4">
                <img src="Medicines.png" className="max-h-full object-contain"
                  width={180}
                  height={180}
                  alt="Hospital illustration"
                />
              </div>
            </CardContent>
            <div className="p-4">
              <Link href="/pharmacies" prefetch={false}>
                <Button className="w-full">Explore!</Button>
              </Link>
            </div>
          </Card>
        </aside>
        <main className="flex-1 overflow-hidden p-4">
          <Card className="h-full flex flex-col border-none shadow-[0_4px_6px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.06)] shadow-slate-400 dark:shadow-slate-700">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <CardTitle className="mb-2 md:mb-0">Nearby Services</CardTitle>
                <div className="relative flex flex-1 md:flex-none">
                  <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search hospitals and medicines..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    value={searchTerm}
                    onChange={handleSearchChange} />
                </div>
              </div>
              <CardDescription className="max-w-lg text-balance leading-relaxed m-0 mt-2">
                Find hospitals and clinics near you.
              </CardDescription>

              <div className="flex items-center gap-2 mt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <FilterIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.hospitals}
                      onCheckedChange={(checked) => handleFilterChange("hospitals", checked)}>
                      Hospitals
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.clinics}
                      onCheckedChange={(checked) => handleFilterChange("clinics", checked)}>
                      Clinics
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <ListOrderedIcon className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                      <DropdownMenuRadioItem value="distance">Distance</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                {isLoading ? (<Loader2 />)
                  : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/20 hover:bg-muted/20">
                          <TableHead className="font-bold text-muted-foreground">Name</TableHead>
                          <TableHead className="font-bold text-muted-foreground hidden sm:table-cell">Type</TableHead>
                          <TableHead className="font-bold text-muted-foreground hidden sm:table-cell">Rating</TableHead>
                          <TableHead className="font-bold text-muted-foreground hidden md:table-cell">Distance</TableHead>
                          <TableHead className="font-bold text-muted-foreground text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredServices.map((service, index) => (
                          <TableRow className="hover:bg-muted/10" key={index}>
                            <TableCell>
                              <div className="font-medium">{service.name}</div>
                              <div className="text-sm text-accent">{service.address}</div>
                              <div className="text-sm text-accent md:hidden">{service.type} | {service.distance} km</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{service.type}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon key={i} className={`h-4 w-4 ${i < service.rating ? "fill-primary" : ""}`} />
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{service.distance} km</TableCell>
                            <TableCell className="text-right">
                              <Link href={`/hospital?Id=${service.id}`} prefetch={false}>
                                <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                                  <WaypointsIcon className="h-3.5 w-3.5" />
                                  View More
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>)
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>)
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}

function StarIcon(props) {
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
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>)
  );
}

function WaypointsIcon(props) {
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
      <circle cx="12" cy="4.5" r="2.5" />
      <path d="m10.2 6.3-3.9 3.9" />
      <circle cx="4.5" cy="12" r="2.5" />
      <path d="M7 12h10" />
      <circle cx="19.5" cy="12" r="2.5" />
      <path d="m13.8 17.7 3.9-3.9" />
      <circle cx="12" cy="19.5" r="2.5" />
    </svg>)
  );
}

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