"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Header from "@/components/function/navbar"
import { FaBars } from "react-icons/fa" // Import the bars icon

export default function Patient() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: {
        name: "John Doe",
        email: "john@example.com",
        phone: "555-1234",
      },
      time: "10:00 AM",
      checked: false,
    },
    {
      id: 2,
      patient: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "555-5678",
      },
      time: "11:30 AM",
      checked: false,
    },
    {
      id: 3,
      patient: {
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "555-9012",
      },
      time: "2:00 PM",
      checked: false,
    },
    {
      id: 4,
      patient: {
        name: "Alice Brown",
        email: "alice@example.com",
        phone: "555-3456",
      },
      time: "3:30 PM",
      checked: false,
    },
    {
      id: 5,
      patient: {
        name: "Charlie Davis",
        email: "charlie@example.com",
        phone: "555-7890",
      },
      time: "4:30 PM",
      checked: false,
    },
    {
      id: 6,
      patient: {
        name: "Eve White",
        email: "eve@example.com",
        phone: "555-6789",
      },
      time: "5:00 PM",
      checked: false,
    },
  ])

  const [newAppointment, setNewAppointment] = useState({
    patient: {
      name: "",
      email: "",
      phone: "",
    },
    time: "",
  })

  const [showAddAppointment, setShowAddAppointment] = useState(false) // State to toggle visibility

  const handleCheckboxChange = (id) => {
    setAppointments(appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, checked: !appointment.checked } : appointment))
  }

  const handleCheckAllChange = (checked) => {
    setAppointments(appointments.map((appointment) => ({
      ...appointment,
      checked: checked,
    })))
  }

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  const handleSendInfo = (appointment) => {
    console.log("Sending appointment info to:", appointment.patient.email)
  }

  const handleNewAppointmentChange = (field, value) => {
    setNewAppointment({
      ...newAppointment,
      [field]: value,
    })
  }

  const handleAddAppointment = () => {
    setAppointments([
      ...appointments,
      {
        id: appointments.length + 1,
        patient: {
          name: newAppointment.patient.name,
          email: newAppointment.patient.email,
          phone: newAppointment.patient.phone,
        },
        time: newAppointment.time,
        checked: false,
      },
    ])
    setNewAppointment({
      patient: {
        name: "",
        email: "",
        phone: "",
      },
      time: "",
    })
    setShowAddAppointment(false) // Close the section after adding
  }

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className={`flex-1 p-8 transition-all duration-300 ease-in-out ${showAddAppointment ? "mr-[400px]" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <FaBars
            className="cursor-pointer text-2xl"
            onClick={() => setShowAddAppointment(!showAddAppointment)}
          />
        </div>
        <div className="overflow-auto rounded-lg border">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    onCheckedChange={(checked) => handleCheckAllChange(checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left text-black">Patient</th>
                <th className="px-4 py-3 text-left text-black">Time</th>
                <th className="px-4 py-3 text-right text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className={`border-b ${appointment.checked ? "line-through text-muted-foreground" : ""}`}>
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={appointment.checked}
                      onCheckedChange={() => handleCheckboxChange(appointment.id)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{appointment.patient.name}</span>
                      <span className="text-sm text-muted-foreground">{appointment.patient.email}</span>
                      <span className="text-sm text-muted-foreground">{appointment.patient.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{appointment.time}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.id)}>
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleSendInfo(appointment)}>
                      Send Info
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Section */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-muted p-8 transition-transform duration-300 ease-in-out transform ${
          showAddAppointment ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="mb-6 text-xl font-bold text-black">Add Appointment</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black">Patient Name</Label>
            <Input
              id="name"
              value={newAppointment.patient.name}
              onChange={(e) => handleNewAppointmentChange("patient.name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">Patient Email</Label>
            <Input
              id="email"
              type="email"
              value={newAppointment.patient.email}
              onChange={(e) => handleNewAppointmentChange("patient.email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">Patient Phone</Label>
            <Input
              id="phone"
              value={newAppointment.patient.phone}
              onChange={(e) => handleNewAppointmentChange("patient.phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time" className="text-black">Appointment Time</Label>
            <Input
              id="time"
              value={newAppointment.time}
              onChange={(e) => handleNewAppointmentChange("time", e.target.value)} />
          </div>
          <Button onClick={handleAddAppointment}>Add Appointment</Button>
        </div>
      </div>
    </div>
  );
}
