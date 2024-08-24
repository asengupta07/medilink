"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import React, { useEffect, useState } from 'react';
 import MapComponent from "./map";
import { useTheme } from "next-themes";
import { useSearchParams } from 'next/navigation';
import { LuParkingCircle } from "react-icons/lu";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import { MdFamilyRestroom } from "react-icons/md";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { HiMiniLanguage } from "react-icons/hi2";
import { GiMedicines } from "react-icons/gi";
import { IoCafe } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";
import { FaSyringe } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { MdNetworkWifi } from "react-icons/md";
import { RiBodyScanLine } from "react-icons/ri";
import { RiMentalHealthFill } from "react-icons/ri";
import { GiChemicalDrop } from "react-icons/gi";


// Feature Icons Map
const featureIcons = {
  "wheelchair accessible": AccessibilityIcon,
  "free wifi": WifiIcon,
  "open 24/7": ClockIcon,
  "parking available": LuParkingCircle,
  "pharmacy on-site": MdOutlineLocalPharmacy, 
  "emergency services": GoAlert,
  "family waiting area": MdFamilyRestroom,
  "children's play area": MdOutlineDirectionsRun, 
  "language assistance": HiMiniLanguage,
  "telemedicine available": GiMedicines,
  "laboratory services": GiChemicalDrop,
  "imaging services": RiBodyScanLine,
  "cafeteria or food services": IoCafe, 
  "ATM on-site": FaMoneyBillWave, 
  "specialist departments": FaUserDoctor, 
  "mental health services": RiMentalHealthFill, 
  "appointment booking online": MdNetworkWifi,
  "vaccination services": FaSyringe,
  "maternity services": MdOutlinePregnantWoman, 
  "blood donation center": BiDonateBlood,
};


export default function HospitalDetails() {
  const { theme } = useTheme();
  const [coords, setCoords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const hospitalId = searchParams.get('Id');
    if (hospitalId) {
      fetch('/api/getHospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: hospitalId }),
      })
        .then(response => response.json())
        .then(data => {
          const hospitalCoords = {
            longitude: data.longitude,
            latitude: data.latitude,
          };
          setRating(data.rating);
          setReviews(data.reviews);
          setFeatures(data.features || []);
          setDescription(data.description);
          setName(data.name);
          setAddress(data.address);
          setPhone(data.phone);
          navigator.geolocation.getCurrentPosition((position) => {
            const userCoords = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            };
            setCoords([userCoords, hospitalCoords]);
            setLoading(false);
          });
        })
        .catch(error => {
          console.error("Error fetching hospital details:", error);
          setLoading(false);
        });
    }
  }, [searchParams]);

  return (
    <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-14 md:p-8 md:px-20">
      <div className="grid gap-6 md:gap-8">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <img
                  src="/hospital1.jpg"
                  alt="Hospital Image"
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 md:h-80"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hospital2.jpg"
                  alt="Hospital Image"
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 md:h-80"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/pp.png"
                  alt="Hospital Image"
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 md:h-80"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/hospital4.jpg"
                  alt="Hospital Image"
                  width={800}
                  height={500}
                  className="object-cover w-full h-64 md:h-80"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="h-64 md:h-80 z-50">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading map...</div>
            ) : (
              <MapComponent className="h-64 md:h-80 w-full" theme={theme} coords={coords} />
            )}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span>{rating}</span>
            <StarIcon className="w-4 h-4 fill-primary" />
            <span>·</span>
            <span>{reviews} reviews</span>
          </div>
          <p className="mt-4 text-muted-foreground text-justify">
            {description}
          </p>
        </div>
        <div className={`grid gap-3 ${features.length > 3 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
          <div className={`flex items-center gap-4 ${features.length > 3 ? 'col-span-1' : 'col-span-2'}`}>
            <MapPinIcon className="w-6 h-6 text-primary" />
            <div>
              <p>{address}</p>
              <p className="text-sm text-muted-foreground">{phone}</p>
            </div>
          </div>
          {features.map((feature) => {
            const IconComponent = featureIcons[feature] || XIcon;
            const featureDescription = getFeatureDescription(feature);
            const formattedFeature = formatFeatureName(feature);
            return (
              <div key={feature} className={`flex items-center gap-4 ${features.length > 3 ? 'col-span-1' : 'col-span-2'}`}>
                <IconComponent className="w-6 h-6 text-primary" />
                <div>
                  <p>{formattedFeature}</p>
                  <p className="text-sm text-muted-foreground">{featureDescription}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
const formatFeatureName = (feature) => {
  return feature
    .split(' ')
    .map((word, index) => {
      if (index > 0 && word.includes("'")) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

function getFeatureDescription(feature) {
  const descriptions = {
    "wheelchair accessible": "Elevators and ramps available",
    "free wifi": "High-speed internet access",
    "open 24/7": "Available around the clock",
    "parking available": "Ample parking space for patients and visitors",
    "pharmacy on-site": "In-house pharmacy for your convenience",
    "emergency services": "24/7 emergency room and trauma care",
    "family waiting area": "Designated space for families to wait comfortably",
    "children’s play area": "Play area designed for children",
    "language assistance": "Translation and language support services",
    "telemedicine available": "Consult doctors remotely from home",
    "laboratory services": "On-site lab for fast and accurate tests",
    "imaging services": "X-ray, MRI, and other imaging services",
    "cafeteria or food services": "Healthy food options available on-site",
    "ATM on-site": "ATM machine for easy access to cash",
    "specialist departments": "Departments offering specialized medical care",
    "mental health services": "Counseling and psychiatric support",
    "appointment booking online": "Book appointments online at your convenience",
    "vaccination services": "Vaccination and immunization services available",
    "maternity services": "Comprehensive care for expecting mothers",
    "blood donation center": "Blood donation and storage services"
  };
  return descriptions[feature] || "Description not available";
}


function AccessibilityIcon(props) {
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
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>)
  );
}


function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>)
  );
}


function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
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


function WifiIcon(props) {
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
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
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
function ParkingIcon(props) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10h5a2 2 0 0 1 2 2v5h-7v-5a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function PharmacyIcon(props) {
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
      <path d="M4 4h16v16H4z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}
function EmergencyIcon(props) {
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
      <path d="M12 2a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h6z" />
      <path d="M12 13v-2m0 0V7m0 6h-2m2 0h2" />
    </svg>
  );
}
function FamilyAreaIcon(props) {
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
      <circle cx="12" cy="6" r="3" />
      <path d="M9 13h6v5H9z" />
      <path d="M7 18h10v2H7z" />
    </svg>
  );
}
function ChildrensPlayIcon(props) {
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
      <circle cx="12" cy="6" r="3" />
      <path d="M5 18h14v2H5z" />
      <path d="M12 6v12" />
    </svg>
  );
}
function LanguageIcon(props) {
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
      <path d="M3 6h18v12H3z" />
      <path d="M5 8h14v2H5zM5 12h14v2H5zM5 16h14v2H5z" />
    </svg>
  );
}
function TelemedicineIcon(props) {
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
      <path d="M3 8h18v12H3z" />
      <path d="M6 16h12v2H6z" />
      <path d="M9 8h6v2H9z" />
    </svg>
  );
}
function LaboratoryIcon(props) {
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
      <path d="M6 6v12l6 6 6-6V6H6z" />
      <path d="M12 6v12" />
    </svg>
  );
}
function ImagingIcon(props) {
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 7h18v10H3z" />
      <path d="M3 10h18" />
    </svg>
  );
}
function CafeteriaIcon(props) {
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
      <rect x="4" y="4" width="16" height="16" />
      <path d="M4 12h16" />
    </svg>
  );
}
function ATMIcon(props) {
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
      <rect x="3" y="3" width="18" height="18" />
      <path d="M7 7h10v10H7z" />
      <path d="M7 11h10" />
    </svg>
  );
}
function SpecialistIcon(props) {
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
      <path d="M12 2a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h6z" />
      <path d="M12 6v12" />
      <path d="M6 12h12" />
    </svg>
  );
}
function MentalHealthIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l4 2" />
    </svg>
  );
}
function BookingIcon(props) {
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
      <path d="M6 2h12v4H6z" />
      <path d="M3 8h18v12H3z" />
      <path d="M12 8v12" />
    </svg>
  );
}
function VaccinationIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l4 4 4-4" />
    </svg>
  );
}
function MaternityIcon(props) {
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
      <path d="M12 2a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h6z" />
      <path d="M12 6v12" />
      <path d="M6 12h12" />
    </svg>
  );
}
function BloodDonationIcon(props) {
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
      <path d="M12 2a6 6 0 0 1 6 6v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h6z" />
      <path d="M12 6v12" />
      <path d="M6 12h12" />
    </svg>
  );
}
