"use client";
import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarIcon, GraduationCapIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/function/navbar'
import { useSearchParams } from 'next/navigation'
import Loader2 from '@/components/function/load'
import Link from 'next/link';

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const dept = searchParams.get("dept") || "All";  // Default to "All" if no department in URL
  const [doctors, setDoctors] = useState([])
  const [sortBy, setSortBy] = useState("rating")
  const [sortOrder, setSortOrder] = useState("desc")
  const [department, setDepartment] = useState(dept)
  const [depts, setDepts] = useState([])
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true)
  const [isLoadingDepts, setIsLoadingDepts] = useState(true)

  useEffect(() => {
    setIsLoadingDoctors(true);
    setIsLoadingDepts(true);
  
    // Fetch doctors
    fetch("/api/getDocs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setIsLoadingDoctors(false);
      })
      .catch(error => {
        console.error("Error fetching doctors", error);
        setIsLoadingDoctors(false);
      });
  
    // Fetch departments
    fetch("/api/getDepts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        setDepts(data.departments);
        if (!data.departments.includes(dept)) {
          setDepartment("All");
        }
        setIsLoadingDepts(false);
      })
      .catch(error => {
        console.error("Error fetching departments", error);
        setIsLoadingDepts(false);
      });
  }, [id, dept]);

  const filteredAndSortedDoctors = useMemo(() => {
    return doctors
      .filter(doctor => department === "All" || doctor.department === department)
      .sort((a, b) => {
        if (sortBy === "rating") {
          return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
        } else if (sortBy === "fee") {
          return sortOrder === "desc" ? b.fee - a.fee : a.fee - b.fee
        } else {
          return sortOrder === "desc" ? b.experience - a.experience : a.experience - b.experience
        }
      })
  }, [department, sortBy, sortOrder, doctors])

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 px-10">
        <h1 className="text-2xl font-bold mb-6">Find a Doctor</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <Label htmlFor="department">Filter by Department</Label>
            <Select onValueChange={setDepartment} value={department}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {depts.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/3">
            <Label htmlFor="sortBy">Sort By</Label>
            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Select Sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/3">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Select onValueChange={setSortOrder} value={sortOrder}>
              <SelectTrigger id="sortOrder">
                <SelectValue placeholder="Select Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoadingDoctors || isLoadingDepts ? (
          <Loader2 /> // Display loader while data is being fetched
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDoctors.map(doctor => (
              <Card key={doctor.id} className="flex flex-col">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={150}
                      height={150}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center">{doctor.name}</h2>
                  <p className="text-muted-foreground mb-2 text-center">{doctor.department}</p>
                  <div className="flex items-center justify-center mb-2">
                    <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                    <span>{doctor.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center text-center justify-center mb-2 text-sm">
                    <GraduationCapIcon className="w-4 h-4 mr-1" />
                    <span>{doctor.qualifications}</span>
                  </div>
                  <p className="text-sm text-center mb-2">{doctor.experience} years of experience</p>
                  <div className="flex items-center justify-center mb-2 text-sm">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{doctor.availability.join(", ")}</span>
                  </div>
                  <p className="text-lg font-bold text-center mb-4">${doctor.fee}</p>
                  <Link href={`/appointment?id=${doctor.id}`}>
                  <Button className="w-full">Book Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
