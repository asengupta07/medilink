"use client"

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const departmentDescriptions = {
  "Cardiology": "Specialized in heart and cardiovascular health.",
  "Dermatology": "Focused on the diagnosis and treatment of skin conditions.",
  "Emergency Medicine": "Provides immediate care for acute illnesses and injuries.",
  "Gastroenterology": "Specializes in the digestive system and its disorders.",
  "Neurology": "Deals with disorders of the nervous system.",
  "Oncology": "Concerned with the diagnosis and treatment of cancer.",
  "Orthopedics": "Focuses on the musculoskeletal system, including bones and joints.",
  "Pediatrics": "Medical care for infants, children, and adolescents.",
  "Pulmonology": "Specializes in respiratory system disorders.",
  "Radiology": "Uses imaging techniques to diagnose and treat diseases.",
  "Surgery": "Involves surgical procedures to treat or repair conditions.",
  "Urology": "Focuses on urinary tract and male reproductive system disorders.",
  "Endocrinology": "Deals with hormone-related conditions and diseases.",
  "Rheumatology": "Specializes in autoimmune and inflammatory diseases.",
  "Ophthalmology": "Concerned with eye health and vision disorders.",
  "Gynecology": "Focuses on the female reproductive system.",
  "Internal Medicine": "Specializes in adult medicine and complex conditions.",
  "Nephrology": "Deals with kidney-related disorders.",
  "Plastic Surgery": "Involves reconstructive and aesthetic surgical procedures.",
  "General Practice": "Provides comprehensive care for a wide range of health issues."
};


export default function Searchdept() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const searchParams = useSearchParams();
  const providerId = searchParams.get("Id");

  useEffect(() => {
    if (providerId) {
      fetch('/api/getDepts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: providerId }),
      })
        .then((response) => response.json())
        .then((data) => setDepartments(data.departments))
        .catch((error) => console.error('Error fetching departments:', error));
    }
  }, [providerId]);

  const filteredDepartments = useMemo(() => {
    return departments.filter(
      (department) => department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, departments]);

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 md:px-6">
      <div className="grid gap-2 pb-6">
        <h2 className="text-2xl font-bold">Departments</h2>
        <p className="text-muted-foreground">Find the right department for your ailment.</p>
      </div>
      <div className="flex items-center mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for departments..."
            className="flex-1 rounded-md bg-background border pl-8 pr-4 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map((department) => (
          <Link key={department} href={`/department?dept=${department}&id=${providerId}`}>
            <Card
              key={department}
              className="flex items-center gap-4 p-4 rounded-md bg-background hover:bg-muted/50 h-full transition-all duration-300 transform hover:scale-105"
            >
              <ComponentIcon className="w-8 h-8 text-white" />
              <div>
                <h4 className="text-lg font-medium">{department}</h4>
                <p className="text-sm text-muted-foreground">{departmentDescriptions[department]}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}


function BabyIcon(props) {
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
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path
        d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </svg>)
  );
}


function BoneIcon(props) {
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
      <path
        d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>)
  );
}


function BrainIcon(props) {
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
      <path
        d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path
        d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>)
  );
}


function ComponentIcon(props) {
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
      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
    </svg>)
  );
}


function HeartIcon(props) {
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
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>)
  );
}


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
