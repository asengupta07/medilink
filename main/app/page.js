'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import { FlipWords } from "@/components/ui/flip-words";
import './page.css'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher'
import Auth from '@/components/function/auth'
import dynamic from "next/dynamic"
import { useTheme } from 'next-themes'
import Authprovide from '@/components/function/authprovide';
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
})

export default function Landingpage() {
  const testimonials = [
    {
      quote: "MediLink has transformed the way I manage my health. The platform is user-friendly and the care I receive is exceptional.",
      name: "Prayas Pal",
      title: "Patient",
    },
    {
      quote: "As a healthcare provider, MediLink allows me to provide better care for my patients through seamless communication and access to their medical records.",
      name: "Dr. Chandraditya Roy",
      title: "Healthcare Provider",
    },
    {
      quote: "The convenience of scheduling appointments and accessing my medical history through MediLink has made managing my health so much easier.",
      name: "Sarah Johnson",
      title: "Patient",
    },
    {
      quote: "MediLink's integrated approach has significantly improved our ability to coordinate care across different specialties.",
      name: "Dr. Emily Chen",
      title: "Specialist",
    },
    {
      quote: "As a caregiver, MediLink gives me peace of mind knowing I can easily track and manage my loved one's health information.",
      name: "Michael Thompson",
      title: "Caregiver",
    },
  ];
  const words = ["Technology", "Innovation", "Automation"];
  const { theme, setTheme } = useTheme()

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const globeConfigDarkMode = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }
  const globeConfig = globeConfigDarkMode

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"]

  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -3.119028,
      startLng: -60.021731,
      endLat: 12.9716,
      endLng: 77.5946,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 19.076,
      endLng: 72.8777,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 59.9343,
      endLng: 30.3351,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 23.6345,
      endLng: -102.5528,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 15,
      startLat: 13.7563,
      startLng: 100.5018,
      endLat: -1.2921,
      endLng: 36.8219,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 16,
      startLat: 51.1657,
      startLng: 10.4515,
      endLat: 37.9838,
      endLng: 23.7275,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 16,
      startLat: 35.6895,
      startLng: 139.6917,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 16,
      startLat: -23.5505,
      startLng: -46.6333,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.6,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 17,
      startLat: 37.7749,
      startLng: -122.4194,
      endLat: 55.7558,
      endLng: 37.6173,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 17,
      startLat: -6.2000,
      startLng: 106.8167,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 17,
      startLat: 13.7563,
      startLng: 100.5018,
      endLat: 51.5074,
      endLng: -0.1278,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 18,
      startLat: -1.2921,
      startLng: 36.8219,
      endLat: 19.076,
      endLng: 72.8777,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 18,
      startLat: 59.9343,
      startLng: 30.3351,
      endLat: 55.7558,
      endLng: 37.6173,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 18,
      startLat: -3.119028,
      startLng: -60.021731,
      endLat: 13.7563,
      endLng: 100.5018,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 19,
      startLat: 22.3964,
      startLng: 114.1095,
      endLat: 13.7563,
      endLng: 100.5018,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 19,
      startLat: 52.2297,
      startLng: 21.0122,
      endLat: 50.0755,
      endLng: 14.4378,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 19,
      startLat: -6.1751,
      startLng: 106.865,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 20,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: -1.2921,
      endLng: 36.8219,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 20,
      startLat: 35.6895,
      startLng: 139.6917,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 20,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 55.7558,
      endLng: 37.6173,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    }
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="text-primary-foreground py-4 lg:px-6 shadow-md backdrop-blur-lg bg-opacity-30 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" onClick={handleScrollToTop}>
            <span className="flex items-center gap-2 text-primary-foreground">
              <HospitalIcon className="h-6 w-6 sm:h-8 sm:w-8 text-black dark:text-white" />
              <span className="text-lg sm:text-xl text-black dark:text-white font-bold relative">
                MEDiLiNK
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSwitcher />
            <Auth />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full pt-20 sm:pt-24 px-4 sm:px-10 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-background text-primary-foreground min-h-[100vh]">
          <div className="container mt-4 sm:mt-10 grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
            <div className="text-primary-foreground space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold lg:text-left text-center" style={{ animationDelay: '0.4s' }}>
                Revolutionizing Healthcare with <FlipWords words={words} />
              </h1>
              <p className="max-w-[600px] text-sm sm:text-md md:text-lg lg:text-left text-center" style={{ animationDelay: '0.4s' }}>
                Experience the future of medical care with our cutting-edge technology and personalized solutions.
              </p>
              <div className="flex text-base sm:text-lg lg:justify-start justify-center" style={{ animationDelay: '0.4s' }}>
                <button className='underline-animation' variant="outline">Learn More</button>
                <Authprovide />
              </div>
            </div>
            <div className="mx-auto overflow-hidden rounded-xl object-cover h-64 sm:h-72 md:h-96 z-10" style={{ bottom: '-30px' }}>
              <World data={sampleArcs} globeConfig={globeConfig} intense={theme == 'dark' ? 1 : 10} />
            </div>
          </div>
        </section>

        <section className="w-full px-4 sm:px-10 py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:items-center" style={{ animationDelay: '0.4s' }}>
            <img
              src={theme == 'dark' ? "/landing2.jpeg" : "landing4.jpg"}
              width="500"
              height="500"
              alt="Features Image"
              className="aspect-square overflow-hidden rounded-xl object-cover"
            />
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter" style={{ animationDelay: '0.5s' }}>
                Innovative Features for Better Healthcare
              </h2>
              <p className="max-w-[600px] text-base sm:text-lg md:text-xl" style={{ animationDelay: '0.5s' }}>
                Our platform offers a wide range of features to enhance your medical experience, from telemedicine to
                personalized treatment plans.
              </p>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <HospitalIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold" style={{ animationDelay: '0.6s' }}>Telemedicine</h3>
                    <p className="text-sm sm:text-base text-muted" style={{ animationDelay: '0.6s' }}>
                      Connect with healthcare professionals remotely for convenient and accessible care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4" style={{ animationDelay: '0.4s' }}>
                  <EraserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Electronic Medical Records</h3>
                    <p className="text-sm sm:text-base text-muted">
                      Securely manage and access your medical history and records.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4" style={{ animationDelay: '0.4s' }}>
                  <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Personalized Care</h3>
                    <p className="text-sm sm:text-base text-muted">
                      Receive tailored treatment plans and recommendations based on your unique health profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 sm:px-10 py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter" style={{ animationDelay: '0.4s' }}>
                Trusted by Patients and Providers
              </h2>
              <p className="max-w-[600px] text-base sm:text-lg md:text-xl" style={{ animationDelay: '0.4s' }}>
                Our platform has been trusted by thousands of patients and healthcare providers to deliver exceptional
                care and experiences.
              </p>
              <div className="grid grid-cols-2 gap-4" style={{ animationDelay: '0.4s' }}>
                <div className="flex flex-col items-center gap-2">
                  <HospitalIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold">10,000+</span>
                  <p className="text-sm sm:text-base text-muted">Patients Served</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <UsersIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold">500+</span>
                  <p className="text-sm sm:text-base text-muted">Healthcare Providers</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RatioIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold">4.9/5</span>
                  <p className="text-sm sm:text-base text-muted">Average Rating</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AwardIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold">15+</span>
                  <p className="text-sm sm:text-base text-muted">Industry Awards</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="/landing3.jpeg"
                width="500"
                height="500"
                alt="Testimonials"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">What Our Users Say</h2>
            <div className="relative w-full">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                className="py-4 md:py-8"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-primary to-background text-primary-foreground py-4 px-4 sm:px-6" style={{ animationDelay: '0.4s' }}>
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs sm:text-sm text-primary-foreground mb-2 sm:mb-0">
            &copy; 2023 MediLink. All rights reserved.
          </p>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/">
              <span className="text-xs sm:text-sm font-medium text-muted hover:underline">Privacy Policy</span>
            </Link>
            <Link href="/">
              <span className="text-xs sm:text-sm font-medium text-muted hover:underline">Terms of Service</span>
            </Link>
            <Link href="/">
              <span className="text-xs sm:text-sm font-medium text-muted hover:underline">Contact Us</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

// Icon components remain unchanged

function AwardIcon(props) {
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
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  )
}


function EraserIcon(props) {
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
      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
      <path d="M22 21H7" />
      <path d="m5 11 9 9" />
    </svg>
  )
}

function HospitalIcon(props) {
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
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  )
}


function RatioIcon(props) {
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
      <rect width="12" height="20" x="6" y="2" rx="2" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
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


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}