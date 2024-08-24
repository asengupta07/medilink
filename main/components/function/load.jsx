// components/loader.js
"use client";
import { useState, useEffect } from 'react';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';

const defaultLoadingStates = [
    { text: "Fetching patient records" },
    { text: "Loading medical history" },
    { text: "Retrieving test results" },
    { text: "Updating treatment plans" },
    { text: "Consulting with specialists" },
    { text: "Processing appointment requests" },
    { text: "Validating insurance information" },
    { text: "Synchronizing with hospital database" },
  ];

export default function Loader2({ 
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

