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
  ]
}