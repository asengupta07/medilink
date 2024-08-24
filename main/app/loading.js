// components/loader.js
"use client";
import { useState, useEffect } from 'react';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

const defaultLoadingStates = [
  { text: "Connecting to the hospital" },
  { text: "Scheduling your appointment" },
  { text: "Consulting with Dr. House" },
  { text: "Preparing medical records" },
  { text: "Checking medication availability" },
  { text: "Reviewing patient history" },
  { text: "Verifying insurance details" },
  { text: "Finalizing your visit" },
];

export default function Loader({ 
  loadingStates = defaultLoadingStates, 
  duration = 2000,
  height = '80vh',
  onLoadingComplete = () => {}
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, loadingStates.length * duration);

    return () => clearTimeout(timer);
  }, [duration, loadingStates.length, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className={`flex items-center justify-center h-[${height}]`}>
      <MultiStepLoader 
        loadingStates={loadingStates} 
        loading={true} 
        duration={duration} 
      />
    </div>
  );
}