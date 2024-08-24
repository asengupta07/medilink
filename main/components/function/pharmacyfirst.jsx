"use client"

// import { Card, CardContent } from "@/components/ui/card"
// import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import MapComponent from "./map"
import { useTheme } from "next-themes";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
// import { FaPhoneAlt } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";

export default function Pharmacyfirst() {
  const { theme } = useTheme();
  const [coords, setCoords] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState(0);
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [features, setFeatures] = useState([])

  const searchParams = useSearchParams();

  useEffect(() => {
    const pharmacyId = searchParams.get('id');
    if (pharmacyId) {
      fetch('/api/getHospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: pharmacyId }),
      })
        .then(response => response.json())
        .then(data => {
          const pharmacyCoords = {
            longitude: data.longitude,
            latitude: data.latitude,
          };
          setDesc(data.description);
          setPhone(data.phone);
          setRating(data.rating);
          setName(data.name);
          setAddress(data.address);
          setFeatures(data.features);
          navigator.geolocation.getCurrentPosition((position) => {
            const userCoords = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            };
            setCoords([
              userCoords,
              pharmacyCoords,
            ]);
            setLoading(false);
          });
        })
        .catch(error => {
          console.error("Error fetching pharmacy coordinates:", error);
          setLoading(false);
        });
    }
  }, [searchParams]);

  return (
    (<div
      className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start p-4 md:p-8 px-4 mx-auto py-6">
      <div className="grid gap-6">
        <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
          <img
            src="/landing3.jpeg"
            alt="Pharmacy Image"
            width={600}
            height={450}
            className="object-cover w-full h-full" />
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="h-64 md:h-80 z-50">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading map...</div>
            ) : (
              <MapComponent className='h-64 md:h-80 w-full' theme={theme} coords={coords} />
            )}
          </div>
        </div>

      </div>
      <div className="grid gap-6">
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{desc}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "fill-primary" : ""}`} />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">({rating} / 5)</div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-semibold">Opening Hours</div>
              <div className="text-muted-foreground">Mon-Fri: 9am - 9pm, Sat-Sun: 10am - 6pm</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-semibold">Address</div>
              <div className="text-muted-foreground">{address}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LuPhone className="w-5 h-5 text-muted-foreground" />
            <div>
              <div className="font-semibold">Phone</div>
              <div className="text-muted-foreground">{phone}</div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="font-semibold">Amenities</div>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature) => {
              const IconComponent = PillIcon;
              const formattedFeature = formatFeatureName(feature);
              return (
                <div key={feature} className={`flex items-center gap-2 ${features.length > 3 ? 'col-span-1' : 'col-span-2'}`}>
                  <IconComponent className="w-6 h-6 text-primary" />
                  <div className="text-muted-foreground">{formattedFeature}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>)
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

function AmbulanceIcon(props) {
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
      <path d="M10 10H6" />
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path
        d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
      <path d="M8 8v4" />
      <path d="M9 18h6" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>)
  );
}


function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
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


function MapIcon(props) {
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
        d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
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


function PillIcon(props) {
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
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
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


function VoteIcon(props) {
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
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
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
