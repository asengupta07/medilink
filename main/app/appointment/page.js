'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Header from "@/components/function/navbar"
import { useAuth } from "../_contexts/authContext"
import { useSearchParams } from "next/navigation"
import { IoLanguage } from "react-icons/io5"
import { FaAward } from "react-icons/fa6"
import { RiMoneyRupeeCircleFill } from "react-icons/ri"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"



// Mock data for available time slots

const initialReviews = [
  { id: 1, name: "John D.", rating: 5, comment: "Dr. Doe is incredibly knowledgeable and caring. Highly recommend!" },
  { id: 2, name: "Sarah M.", rating: 4, comment: "Very professional and thorough in his examination." },
  { id: 3, name: "Robert L.", rating: 5, comment: "Excellent bedside manner. Made me feel at ease during the entire visit." },
]

export default function Appointment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id")
  const [isForSelf, setIsForSelf] = useState(false)
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [availableSlots, setAvailableSlots] = useState({
    Monday: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"],
    Tuesday: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "4:00 PM"],
    Wednesday: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"],
    Thursday: ["10:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "5:00 PM"],
    Friday: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  })
  const [selectedDay, setSelectedDay] = useState(Object.keys(availableSlots)[0])
  const [timeSlots, setTimeSlots] = useState(availableSlots[selectedDay])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const { token } = useAuth()
  const [age, setAge] = useState(null)
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState(null)
  const [address, setAddress] = useState(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState(initialReviews)
  const [isWritingReview, setIsWritingReview] = useState(false)

  const [formData, setFormData] = useState({
    presentingComplaints: '',
    history: '',
    clinicalFindings: '',
    medicalHistory: '',
    medicalConditions: [],
  })
  const [docData, setDocData] = useState({
    id: '',
    name: '',
    specialization: '',
    providerId: '',
    rating: '',
    fee: '',
    timings: '',
    contactInfo: '',
    experience: '',
    education: '',
    languages: '',
    bio: '',
    awards: '',
    createdAt: '',
    updatedAt: '',
    reviews: [],
    numRev: '',
  })
  function roundUpToNearestHour(date) {
    const roundedDate = new Date(date);
    if (date.getMinutes() > 0 || date.getSeconds() > 0) {
      roundedDate.setHours(date.getHours() + 1);
    }
    roundedDate.setMinutes(0);
    roundedDate.setSeconds(0);
    roundedDate.setMilliseconds(0);
    return roundedDate;
  }

  function convertTimingsToSlots(timings) {
    const availableSlots = {};
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    timings.forEach(timing => {
      const { day, startTime, endTime } = timing;

      // Ensure day is included in availableSlots
      if (!availableSlots[day]) {
        availableSlots[day] = [];
      }

      // Convert times to Date objects for comparison
      const [startHour, startMinute] = startTime.split(/[:\s]/);
      const [endHour, endMinute] = endTime.split(/[:\s]/);

      const startDate = new Date();
      startDate.setHours(startHour % 12 + (startTime.includes('PM') ? 12 : 0));
      startDate.setMinutes(startMinute);

      const endDate = new Date();
      endDate.setHours(endHour % 12 + (endTime.includes('PM') ? 12 : 0));
      endDate.setMinutes(endMinute);

      // Round up start time and end time to nearest hour
      const roundedStartDate = roundUpToNearestHour(startDate);
      const roundedEndDate = roundUpToNearestHour(endDate);

      // Handle cases where the end time is the next day
      let currentTime = roundedStartDate;
      while (currentTime < roundedEndDate || roundedEndDate < roundedStartDate) {
        const hours = currentTime.getHours();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHour = hours % 12 || 12;

        availableSlots[day].push(`${formattedHour}:00 ${period}`);

        currentTime.setHours(currentTime.getHours() + 1);

        // If current time passes midnight, break loop and handle next day
        if (currentTime.getHours() === 0 && roundedEndDate < roundedStartDate) {
          break;
        }
      }
      availableSlots[day] = Array.from(new Set(availableSlots[day]));
    });


    return availableSlots;
  }



  const handleSubmitReview = (newReview) => {
    const reviewWithId = { ...newReview, id: reviews.length + 1 }
    setReviews([reviewWithId, ...reviews])
    setIsWritingReview(false)
  }

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot === selectedTimeSlot ? null : timeSlot)
  }

  const handleDayChange = (day) => {
    setSelectedDay(day)
    setTimeSlots(availableSlots[day])
    setSelectedTimeSlot(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (condition) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter(c => c !== condition)
        : [...prev.medicalConditions, condition]
    }))
  }

  const fetchData = async (token) => {
    try {
      const res = await fetch("/api/getUser", {
        method: "GET",
        headers: { Authorization: token }
      })
      if (!res.ok) throw new Error("Failed to fetch user data")
      const data = await res.json()
      setUserName(data.name)
      setUserEmail(data.email)
      setAge(data.userInfo.age)
      setGender(data.userInfo.gender)
      setPhone(data.userContact.phone)
      setAddress(data.userContact.address)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchDocData = async (token) => {
    try {
        const res = await fetch("/api/getDoc", {
            method: "POST",
            headers: { Authorization: token },
            body: JSON.stringify({ id: id })
        });
        if (!res.ok) throw new Error("Failed to fetch doctor data");
        const data = await res.json();
        setDocData(data);
        setReviews(data.reviews);
        const timings = convertTimingsToSlots(data.timings);
        setAvailableSlots(timings);
        setSelectedDay(Object.keys(timings)[0]);
        setTimeSlots(timings[Object.keys(timings)[0]]);
    }
    catch (err) {
        console.log(err);
    }
}


  useEffect(() => {
    if (token) {
      fetchData(token)
      fetchDocData(token)
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const appointmentData = {
      isForSelf,
      patientName: isForSelf ? userName : e.target.name.value,
      patientAge: isForSelf ? age.toString() : e.target.age.value,
      patientGender: isForSelf ? gender : e.target.gender.value,
      patientPhone: isForSelf ? phone : e.target.mobile.value,
      patientEmail: isForSelf ? userEmail : e.target.email.value,
      appointmentDay: selectedDay,
      appointmentTime: selectedTimeSlot,
      medicalHistory: isForSelf ? "Hypertension, previous heart attack" : e.target.medicalHistory.value,
      docId: docData.id,
      ...formData
    }

    try {
      const response = await fetch('/api/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(appointmentData)
      })

      if (!response.ok) throw new Error('Failed to book appointment')

      const result = await response.json()

      if (response.ok)
        alert('Appointment booked successfully!')
      
    } catch (error) {
      console.error('Error booking appointment:', error)
    }
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-8 p-6 md:p-10">
        <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <img
              src="pp.png"
              width={150}
              height={150}
              alt="Doctor"
              className="rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">Dr. {docData.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4 fill-primary" />
                <StarIcon className="h-4 w-4" />
                <span>{docData.rating} ({docData.numRev} reviews)</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              <span>{docData.specialization}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5" />
              <span>{docData.education}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <span>{docData.experience} years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLanguage className="h-5 w-5" />
              <span>{docData.languages}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaAward className="h-5 w-5" />
              <span>{docData.awards}</span>
            </div>
            <div className="flex items-center gap-2">
              <RiMoneyRupeeCircleFill className="h-5 w-5" />
              <span>{docData.fee}/-</span>
            </div>

            <Separator />
            <div className="prose">
              {docData.bio}
            </div>
          </div>
          <Separator />
          <div className="md:hidden">
            <Collapsible
              open={isReviewsOpen}
              onOpenChange={setIsReviewsOpen}
              className="space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h3 className="text-lg font-semibold">Patient Reviews</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronDownIcon 
                      className="h-4 w-4 transition-transform duration-500 ease-in-out" 
                      style={{ transform: isReviewsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent 
                className="overflow-hidden"
                style={{
                  transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  maxHeight: isReviewsOpen ? '1000px' : '0',
                  opacity: isReviewsOpen ? 1 : 0,
                }}
              >
                <div 
                  className="rounded-md px-4 py-3 text-sm"
                  style={{
                    animation: isReviewsOpen ? 'slideDown 0.5s ease-in-out' : 'none',
                  }}
                >
                  {isWritingReview ? (
                    <WriteReviewForm
                      onSubmit={handleSubmitReview}
                      onCancel={() => setIsWritingReview(false)}
                    />
                  ) : (
                    <>
                      <Button onClick={() => setIsWritingReview(true)} className="mb-4">
                        Write a Review
                      </Button>
                      {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Desktop view: Always expanded reviews */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Patient Reviews</h3>
              <Button onClick={() => setIsWritingReview(!isWritingReview)}>
                {isWritingReview ? "Cancel" : "Write a Review"}
              </Button>
            </div>
            {isWritingReview ? (
              <WriteReviewForm
                onSubmit={handleSubmitReview}
                onCancel={() => setIsWritingReview(false)}
              />
            ) : (
              reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Is this appointment for you?</h3>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={isForSelf ? "primary" : "outline"}
                onClick={() => setIsForSelf(true)}
                className={`border ${isForSelf ? "bg-primary text-primary-foreground" : ""}`}>
                Yes
              </Button>
              <Button
                type="button"
                variant={!isForSelf ? "primary" : "outline"}
                onClick={() => setIsForSelf(false)}
                className={`border ${!isForSelf ? "bg-primary text-primary-foreground" : ""}`}>
                No
              </Button>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Patient Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name of Patient</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  disabled={isForSelf}
                  defaultValue={userName} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter age"
                  disabled={isForSelf}
                  defaultValue={age} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  value={gender.toLowerCase()}
                  onValueChange={(value) => setGender(value)}
                  disabled={isForSelf}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mobile">Mobile No.</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="Enter mobile number"
                  disabled={isForSelf}
                  defaultValue={phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  disabled={isForSelf}
                  defaultValue={userEmail} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="presenting-complaints">Presenting Complaints</Label>
              <Textarea
                id="presenting-complaints"
                name="presentingComplaints"
                placeholder="Enter presenting complaints"
                onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="history">History & Duration of Presenting Complaints</Label>
              <Textarea
                id="history"
                name="history"
                placeholder="Enter history and duration"
                onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clinical-findings">Relevant Clinical Findings</Label>
              <Textarea
                id="clinical-findings"
                name="clinicalFindings"
                placeholder="Enter relevant clinical findings"
                onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="medical-history">Past Medical or Surgical History</Label>
              <Textarea
                id="medical-history"
                name="medicalHistory"
                placeholder="Enter past medical or surgical history"
                disabled={isForSelf}
                defaultValue="Hypertension, previous heart attack"
                onChange={handleInputChange} />
            </div>
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Medical Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Hypertension", "Ischemic Heart Disease", "Osteoarthritis", "COPD / Bronchial Asthma", "Any other Chronic Disorder", "Diabetes", "Heart Diseases", "Cancer"].map((condition) => (
                  <div key={condition} className="flex items-center gap-2">
                    <Checkbox
                      id={condition.toLowerCase().replace(/\s+/g, '-')}
                      checked={formData.medicalConditions.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange(condition)}
                    />
                    <Label htmlFor={condition.toLowerCase().replace(/\s+/g, '-')}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Appointment Day</h3>
            <Select value={selectedDay} onValueChange={handleDayChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(availableSlots).map((day) => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Time Slots</h3>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={selectedTimeSlot === slot ? "primary" : "outline"}
                  onClick={() => handleTimeSlotClick(slot)}
                  className={selectedTimeSlot === slot ? "bg-primary text-primary-foreground" : ""}>
                  {slot}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Book Appointment</Button>
          </div>
        </form>
      </div>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translateY(-10%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

const ReviewCard = ({ review }) => (
  <Card className="mb-4">
    <CardContent className="pt-4">
      <div className="flex items-center mb-2">
        <h4 className="font-semibold mr-2">{review.name}</h4>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary" : ""}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{review.comment}</p>
    </CardContent>
  </Card>
)

const WriteReviewForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && comment) {
      onSubmit({ name, rating, comment })
      setName("")
      setRating(5)
      setComment("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Select value={rating} onValueChange={(value) => setRating(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value} {value === 1 ? "Star" : "Stars"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>
      <div>
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit Review</Button>
      </div>
    </form>
  )
}

function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}

function ClockIcon(props) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function GraduationCapIcon(props) {
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}