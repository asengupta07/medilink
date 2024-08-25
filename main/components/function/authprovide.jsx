"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function Authprovide() {
  const [isLogin, setIsLogin] = useState(true)
  const [registerStep, setRegisterStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isLogin) {
      console.log("Login form submitted")
    } else if (registerStep === 2) {
      console.log("Registration form submitted")
    }
    setIsOpen(false)
  }

  const handleNextStep = () => {
    setRegisterStep(2)
  }

  const handlePrevStep = () => {
    setRegisterStep(1)
  }

  return (
    <div className="bg-transparent ml-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen} className='bg-transparent'>
        <DialogTrigger asChild>
          <Button variant="outline" className='text-white bg-black hover:bg-gray-800' ml-2>Are you a provider?</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Card className="w-full border-0 shadow-none">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl">{isLogin ? "Login" : `Register - Step ${registerStep}`}</CardTitle>
              <CardDescription>
                {isLogin ? "Enter your credentials to login" : "Create a new account"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <CardContent className="space-y-4 px-0">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="form-type"
                    checked={isLogin}
                    onCheckedChange={(checked) => {
                      setIsLogin(checked)
                      setRegisterStep(1)
                    }}
                  />
                  <Label htmlFor="form-type">{isLogin ? "Login" : "Register"}</Label>
                </div>

                {isLogin ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" placeholder="Enter your password" required />
                    </div>
                  </>
                ) : registerStep === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" required />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="personal-chamber">Personal Chamber</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input id="latitude" type="number" step="any" placeholder="Enter latitude" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input id="longitude" type="number" step="any" placeholder="Enter longitude" required />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="px-0 pb-0">
                {isLogin ? (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                ) : registerStep === 1 ? (
                  <Button type="button" onClick={handleNextStep} className="w-full">
                    Next
                  </Button>
                ) : (
                  <div className="flex w-full space-x-2">
                    <Button type="button" onClick={handlePrevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Register
                    </Button>
                  </div>
                )}
              </CardFooter>
            </form>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  )
}
