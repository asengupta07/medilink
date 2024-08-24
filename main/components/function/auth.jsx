"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/_contexts/authContext"

export default function Auth() {
  const [open, setOpen] = useState(false)
  const isDesktop = true
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState("")
  const { token, login } = useAuth();
  const router = useRouter()

  if (token) {
    router.push('/dashboard')
  }

  useEffect(() => {
    setFormData({ ...formData, dob: dob })
  }, [dob])

  useEffect(() => {
    setFormData({ ...formData, gender: gender })
  }, [gender])


  const handleLogin = async (event) => {
    console.log("Logging in...")
    event.preventDefault()
    const formData = new FormData(event.target)
    const rawData = Object.fromEntries(formData)
    const { loginEmail, loginPassword } = rawData
    console.log(loginEmail, loginPassword)
    if (loginEmail && loginPassword) {
      const data = {
        email: loginEmail,
        password: loginPassword
      }
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const { token } = await response.json();
        console.log("Great Success!")
        console.log(token);
        login(token)
        router.push("/dashboard")
      } else {
        console.log("Error logging in")
        console.log(":'(")
      }
    }
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    phone: "",
    telephone: "",
    address: "",
    emergencyPhone1: "",
    emergencyPhone2: ""
  })
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (event) => {
    console.log("Registering...")
    event.preventDefault()
    console.log(formData);
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dob,
      gender,
      phone,
      telephone,
      address,
      emergencyPhone1,
      emergencyPhone2
    } = formData
    if (firstName && lastName && email && password && dob && phone && password === confirmPassword) {
      const data = {
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        phone,
        telephone,
        address,
        emergencyPhone1,
        emergencyPhone2
      }
      console.log(data);
      console.log(formData);
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        const { token } = await response.json();
        console.log("Great Success!")
        console.log(token);
        login(token)
        router.push("/dashboard")
      } else {
        console.log("Error registering")
        console.log(":'(")
      }
    }
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }
  if (isDesktop) {
    return (
      <Dialog className="placeholder-muted-foreground">
        <DialogTrigger asChild>
          <button className='font-bold text-primary hover:bg-primary hover:text-background hover:rounded-lg p-[0.4rem] transition-all duration-500 text-nowrap'>Get Started</button>
        </DialogTrigger>
        <DialogContent className="lg:w-[25rem] max-h-[calc(100vh-2rem)]">
          <DialogHeader>
            <div className="flex justify-between border-b border-muted pt-4 pb-1 gap-2">
              <Button
                variant={isLoginForm ? "default" : "outline"}
                onClick={() => setIsLoginForm(true)}
                className="w-1/2 px-3">
                Log In
              </Button>
              <Button
                variant={!isLoginForm ? "default" : "outline"}
                onClick={() => setIsLoginForm(false)}
                className="w-1/2 px-3">
                Sign Up
              </Button>
            </div>
          </DialogHeader>
          {isLoginForm ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="loginEmail"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="loginPassword"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="w-full">
                <Progress value={(currentStep / 3) * 100} />
              </div>
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full text-left">
                            {gender || "Select gender"}
                            <ChevronDownIcon className="ml-auto h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            value="male"
                            onClick={() => setGender("Male")}>
                            Male
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            value="female"
                            onClick={() => setGender("Female")}>
                            Female
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            value="other"
                            onClick={() => setGender("Other")}>
                            Other
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="dob"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dob && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            name="dob"
                            selected={dob}
                            onSelect={setDob}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter a password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Telephone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      name="telephone"
                      placeholder="Enter your telephone number"
                      value={formData.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone1">Emergency Phone 1</Label>
                    <Input
                      id="emergencyPhone1"
                      type="tel"
                      name="emergencyPhone1"
                      placeholder="Enter emergency phone number 1"
                      value={formData.emergencyPhone1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone2">Emergency Phone 2</Label>
                    <Input
                      id="emergencyPhone2"
                      type="tel"
                      name="emergencyPhone2"
                      placeholder="Enter emergency phone number 2"
                      value={formData.emergencyPhone2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              <div className={`flex ${currentStep == 1 ? "justify-end" : "justify-between"}`}>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNextStep}>Next</Button>
                ) : (
                  <div> </div>
                )}
              </div>
              {currentStep === 3 && (
                <div className="flex w-full">
                  <Button className="w-full" type="submit">Sign Up</Button>
                </div>
              )}

            </form>
          )}
        </DialogContent>
      </Dialog>);
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className='font-bold text-primary hover:bg-primary hover:text-background hover:rounded-lg p-[0.4rem] transition-all duration-500 text-nowrap'>Get Started</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <div className="flex justify-between border-b border-muted pt-4 pb-1 gap-2">
            <Button
              variant={isLoginForm ? "default" : "outline"}
              onClick={() => setIsLoginForm(true)}
              className="w-1/2 px-3">
              Log In
            </Button>
            <Button
              variant={!isLoginForm ? "default" : "outline"}
              onClick={() => setIsLoginForm(false)}
              className="w-1/2 px-3">
              Sign Up
            </Button>
          </div>
        </DrawerHeader>
        {isLoginForm ? (
          <form onSubmit={handleLogin} className="space-y-4 py-6 px-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="loginEmail"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="loginPassword"
                placeholder="Enter your password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 py-6 px-3">
            <div className="w-full">
              <Progress value={(currentStep / 3) * 100} />
            </div>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full text-left">
                          {gender || "Select gender"}
                          <ChevronDownIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          value="male"
                          onClick={() => setGender("Male")}>
                          Male
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          value="female"
                          onClick={() => setGender("Female")}>
                          Female
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          value="other"
                          onClick={() => setGender("Other")}>
                          Other
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dob"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dob && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          name="dob"
                          selected={dob}
                          onSelect={setDob}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    name="telephone"
                    placeholder="Enter your telephone number"
                    value={formData.telephone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone1">Emergency Phone 1</Label>
                  <Input
                    id="emergencyPhone1"
                    type="tel"
                    name="emergencyPhone1"
                    placeholder="Enter emergency phone number 1"
                    value={formData.emergencyPhone1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone2">Emergency Phone 2</Label>
                  <Input
                    id="emergencyPhone2"
                    type="tel"
                    name="emergencyPhone2"
                    placeholder="Enter emergency phone number 2"
                    value={formData.emergencyPhone2}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            <div className={`flex ${currentStep == 1 ? "justify-end" : "justify-between"}`}>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePreviousStep}>
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNextStep}>Next</Button>
              ) : (
                <div> </div>
              )}
            </div>
            {currentStep === 3 && (
              <div className="flex w-full">
                <Button className="w-full" type="submit">Sign Up</Button>
              </div>
            )}

          </form>
        )}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>)
  );
}
