"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Navbar from "@/components/function/navbar2"


export default function Select() {
    const [selectedView, setSelectedView] = useState("doctors")
    const [sortOption, setSortOption] = useState({ field: "rating", order: "desc" })
    const [searchQuery, setSearchQuery] = useState("")
    const [val, setVal] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    
    const [sortBy, setSortBy] = useState("rating-desc")

    const doctorsData = [
        { name: "Dr. Jane Doe", rating: 4.9, appointments: 320, specialty: "Cardiologist", department: "Cardiology Department", image: "/med.jpg" },
        { name: "Dr. Emily Davis", rating: 4.9, appointments: 330, specialty: "Pediatrician", department: "Pediatrics Department", image: "/med.jpg" },
        { name: "Dr. Chris Martinez", rating: 4.5, appointments: 270, specialty: "Gastroenterologist", department: "Gastroenterology Department", image: "/med.jpg" },
        { name: "Dr. Alice Johnson", rating: 4.8, appointments: 310, specialty: "Dermatologist", department: "Dermatology Department", image: "/med.jpg" },
        { name: "Dr. Sarah Wilson", rating: 4.7, appointments: 320, specialty: "Endocrinologist", department: "Endocrinology Department", image: "/med.jpg" },
        { name: "Dr. David Lee", rating: 4.8, appointments: 350, specialty: "Pulmonologist", department: "Pulmonology Department", image: "/med.jpg" },
        { name: "Dr. Robert Clark", rating: 4.9, appointments: 340, specialty: "Rheumatologist", department: "Rheumatology Department", image: "/med.jpg" },
        { name: "Dr. Laura Kim", rating: 4.6, appointments: 310, specialty: "Ophthalmologist", department: "Ophthalmology Department", image: "/med.jpg" },
        { name: "Dr. Michael Brown", rating: 4.6, appointments: 290, specialty: "Neurologist", department: "Neurology Department", image: "/med.jpg" },
        { name: "Dr. Andrew Wilson", rating: 4.7, appointments: 300, specialty: "Cardiologist", department: "Cardiology Department", image: "/med.jpg" },
        { name: "Dr. Jessica Taylor", rating: 4.8, appointments: 310, specialty: "Pediatrician", department: "Pediatrics Department", image: "/med.jpg" },
        { name: "Dr. Samuel Reed", rating: 4.4, appointments: 260, specialty: "Gastroenterologist", department: "Gastroenterology Department", image: "/med.jpg" },
        { name: "Dr. Megan White", rating: 4.9, appointments: 340, specialty: "Dermatologist", department: "Dermatology Department", image: "/med.jpg" },
        { name: "Dr. Daniel Green", rating: 4.8, appointments: 330, specialty: "Endocrinologist", department: "Endocrinology Department", image: "/med.jpg" },
        { name: "Dr. Maria Lopez", rating: 4.9, appointments: 360, specialty: "Pulmonologist", department: "Pulmonology Department", image: "/med.jpg" },
        { name: "Dr. Elizabeth Brown", rating: 4.8, appointments: 350, specialty: "Rheumatologist", department: "Rheumatology Department", image: "/med.jpg" },
        { name: "Dr. Thomas Harris", rating: 4.6, appointments: 320, specialty: "Ophthalmologist", department: "Ophthalmology Department", image: "/med.jpg" },
        { name: "Dr. Laura Adams", rating: 4.7, appointments: 310, specialty: "Neurologist", department: "Neurology Department", image: "/med.jpg" }
    ]
    const departmentsData = [
        { name: "Cardiology Department", rating: 4.8, appointments: 450, description: "Specialized in heart health.", image: "/med.jpg" },
        { name: "Orthopedics Department", rating: 4.6, appointments: 380, description: "Specializing in bone and joint health.", image: "/med.jpg" },
        { name: "Dermatology Department", rating: 4.7, appointments: 400, description: "Focused on skin health.", image: "/med.jpg" },
        { name: "Neurology Department", rating: 4.9, appointments: 420, description: "Specialized in brain and nervous system health.", image: "/med.jpg" },
        { name: "Pediatrics Department", rating: 4.8, appointments: 430, description: "Providing healthcare for children.", image: "/med.jpg" },
        { name: "Gastroenterology Department", rating: 4.5, appointments: 370, description: "Focused on digestive system health.", image: "/med.jpg" },
        { name: "Endocrinology Department", rating: 4.7, appointments: 410, description: "Specializing in hormone-related health.", image: "/med.jpg" },
        { name: "Pulmonology Department", rating: 4.9, appointments: 440, description: "Focused on lung health.", image: "/med.jpg" },
        { name: "Ophthalmology Department", rating: 4.6, appointments: 390, description: "Providing eye care and vision health.", image: "/med.jpg" },
        { name: "Rheumatology Department", rating: 4.8, appointments: 420, description: "Specializing in joint and autoimmune diseases.", image: "/med.jpg" }
    ]

    const handleViewToggle = (view) => {
        setSelectedView(view)
        setSelectedDepartment(null) // Reset selected department when view changes
    }

    const handleSortChange = (value) => {
        const [field, order] = value.split('-')
        setSortOption({ field, order })
        setSortBy(value)
        setVal(value)
    }
    

    const sortData = (data) => {
        const { field, order } = sortOption
        return data.sort((a, b) => {
            if (order === "asc") {
                return a[field] - b[field]
            } else {
                return b[field] - a[field]
            }
        })
    }

    const filteredDoctors = doctorsData.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedDepartment || doctor.department === selectedDepartment)
    )

    const filteredDepartments = departmentsData.filter((department) =>
        department.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedDoctors = sortData(filteredDoctors)
    const sortedDepartments = sortData(filteredDepartments)

    return (
        <div>
            <Navbar />
            <div className="flex min-h-screen w-full bg-background">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-64 flex-col bg-background p-6">
                    <nav className="flex flex-col gap-2 space-y-12">
                        {/* Toggle View */}
                        <Toggle
                            aria-label="Toggle view"
                            className="bg-muted rounded-full p-1"
                            value={selectedView}
                            onValueChange={handleViewToggle}
                        >
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <span
                                    className={`px-4 py-2 rounded-full transition-colors ${selectedView === "doctors"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-primary-foreground/50 hover:bg-muted/50"
                                        }`}
                                    onClick={() => handleViewToggle("doctors")}
                                >
                                    Doctors
                                </span>
                                <span
                                    className={`px-4 py-2 rounded-full transition-colors ${selectedView === "departments"
                                        ? "bg-primary text-primary-foreground"
                                        : "text-primary-foreground/50 hover:bg-muted/50"
                                        }`}
                                    onClick={() => handleViewToggle("departments")}
                                >
                                    Departments
                                </span>
                            </div>
                        </Toggle>
                        <div className="bg-background rounded-lg p-6 w-64">
                            <h3 className="text-lg font-semibold mb-4">Sort by:</h3>
                            <div className="space-y-4">
                                <RadioGroup value={sortBy} onValueChange={handleSortChange} className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="rating-desc" id="rating-desc" className="peer sr-only" />
                                        <Label
                                            htmlFor="rating-desc"
                                            className="flex items-center justify-between w-full bg-muted rounded-md px-4 py-2 cursor-pointer peer-checked:bg-primary text-primary-foreground peer-checked:text-primary-foreground transition-colors"
                                        >
                                            <span>Rating (Highest to Lowest)</span>
                                            {sortBy === "rating-desc" && <CheckIcon className="w-5 h-5" />}
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="rating-asc" id="rating-asc" className="peer sr-only" />
                                        <Label
                                            htmlFor="rating-asc"
                                            className="flex items-center justify-between w-full bg-muted rounded-md px-4 py-2 cursor-pointer peer-checked:bg-primary text-primary-foreground peer-checked:text-primary-foreground transition-colors"
                                        >
                                            <span>Rating (Lowest to Highest)</span>
                                            {sortBy === "rating-asc" && <CheckIcon className="w-5 h-5" />}
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="appointments-desc" id="appointments-desc" className="peer sr-only" />
                                        <Label
                                            htmlFor="appointments-desc"
                                            className="flex items-center justify-between w-full bg-muted rounded-md px-4 py-2 cursor-pointer peer-checked:bg-primary text-primary-foreground peer-checked:text-primary-foreground transition-colors"
                                        >
                                            <span>Appointments (Highest to Lowest)</span>
                                            {sortBy === "appointments-desc" && <CheckIcon className="w-5 h-5" />}
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="appointments-asc" id="appointments-asc" className="peer sr-only" />
                                        <Label
                                            htmlFor="appointments-asc"
                                            className="flex items-center justify-between w-full bg-muted rounded-md px-4 py-2 cursor-pointer peer-checked:bg-primary text-primary-foreground peer-checked:text-primary-foreground transition-colors"
                                        >
                                            <span>Appointments (Lowest to Highest)</span>
                                            {sortBy === "appointments-asc" && <CheckIcon className="w-5 h-5" />}
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-4 sm:p-6">
                        <Card className="border-none shadow-md shadow-foreground">
                            <CardHeader>
                                <CardTitle>{selectedView === "doctors" ? "Doctors" : "Departments"}</CardTitle>
                                <CardDescription>{selectedView === "doctors" ? "Track doctor appointment stats and availability..." : "Filter doctors by department and view detailed appointment statistics for departments..."}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder={`Search ${selectedView}...`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>

                                {/* Departments View */}
                                {selectedView === "departments" && !selectedDepartment && (
                                    <div className="flex-1 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sortedDepartments.map((department) => (
                                            <div
                                                key={department.name}
                                                className="relative group"
                                                onClick={() => setSelectedDepartment(department.name)}
                                            >
                                                <Card className="h-full flex flex-col transition-all duration-300 hover:scale-105">
                                                    <img
                                                        src={department.image}
                                                        alt={department.name}
                                                        className="w-full h-40 object-cover rounded-t-xl"
                                                    />
                                                    <CardContent className="flex flex-col justify-between p-4">
                                                        <div>
                                                            <CardTitle className="text-lg font-bold">{department.name}</CardTitle>
                                                            <CardDescription className="text-sm text-neutral-500">
                                                                {department.description}
                                                            </CardDescription>
                                                        </div>
                                                        <div className="mt-4 flex items-center justify-between text-sm">
                                                            <span>Rating: {department.rating}</span>
                                                            <span>Appointments: {department.appointments}</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Doctors View or Department Detail */}
                                {selectedView === "doctors" || (selectedView === "departments" && selectedDepartment) ? (
                                    <div className="flex-1 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sortedDoctors.map((doctor) => (
                                            <div key={doctor.name} className="relative group">
                                                <Card className="h-full flex flex-col transition-all duration-300 hover:scale-105">
                                                    <img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="w-full h-40 object-cover rounded-t-xl"
                                                    />
                                                    <CardContent className="flex flex-col justify-between p-4">
                                                        <div>
                                                            <CardTitle className="text-lg font-bold">{doctor.name}</CardTitle>
                                                            <CardDescription className="text-sm text-neutral-500">
                                                                {doctor.specialty}
                                                            </CardDescription>
                                                            {selectedView === "departments" && (
                                                                <div className="mt-2 text-sm">
                                                                    <span>Department: {doctor.department}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="mt-4 flex items-center justify-between text-sm">
                                                            <span>Rating: {doctor.rating}</span>
                                                            <span>Appointments: {doctor.appointments}</span>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>

    )
}
function CheckIcon(props) {
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
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )
  }
