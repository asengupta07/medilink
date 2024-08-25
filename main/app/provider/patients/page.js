"use client"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Header from "@/components/function/navbar";
import { FaBars } from "react-icons/fa";

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
    // Additional appointments...
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patient: {
      name: "",
      email: "",
      phone: "",
    },
    time: "",
  });

  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [tempTime, setTempTime] = useState(""); // Temporary state for editing time

  const handleCheckboxChange = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, checked: !appointment.checked }
          : appointment
      )
    );
  };

  const handleCheckAllChange = (checked) => {
    setAppointments(
      appointments.map((appointment) => ({
        ...appointment,
        checked: checked,
      }))
    );
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleSendInfo = (appointment) => {
    console.log("Sending appointment info to:", appointment.patient.email);
  };

  const handleNewAppointmentChange = (field, value) => {
    const [mainField, subField] = field.split(".");
    setNewAppointment((prev) => ({
      ...prev,
      [mainField]: {
        ...prev[mainField],
        [subField]: value,
      },
    }));
  };

  const handleEditTimeClick = (id, newTime) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, time: newTime } : appointment
      )
    );
    setEditAppointmentId(null); // Clear the edit state after updating the time
    setTempTime(""); // Clear tempTime after updating
  };

  const handleAddAppointment = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(newAppointment.patient.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(newAppointment.patient.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const newId = appointments.length ? Math.max(...appointments.map(a => a.id)) + 1 : 1;

    setAppointments([
      ...appointments,
      {
        id: newId,
        patient: {
          name: newAppointment.patient.name,
          email: newAppointment.patient.email,
          phone: newAppointment.patient.phone,
        },
        time: newAppointment.time,
        checked: false,
      },
    ]);
    setNewAppointment({
      patient: {
        name: "",
        email: "",
        phone: "",
      },
      time: "",
    });
    setShowAddAppointment(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          showAddAppointment ? "mr-[400px]" : ""
        }`}
      >
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
                  className={`border-b ${
                    appointment.checked ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={appointment.checked}
                      onCheckedChange={() => handleCheckboxChange(appointment.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{appointment.patient.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {appointment.patient.email}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {appointment.patient.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {editAppointmentId === appointment.id ? (
                      <div>
                        <select
                          value={tempTime || appointment.time}
                          onChange={(e) => setTempTime(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:30 PM">3:30 PM</option>
                          <option value="4:30 PM">4:30 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => handleEditTimeClick(appointment.id, tempTime)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      appointment.time
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleSendInfo(appointment)}
                    >
                      Send Info
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() =>
                        setEditAppointmentId(
                          editAppointmentId === appointment.id ? null : appointment.id
                        )
                      }
                    >
                      Edit Time
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
            <Label htmlFor="name" className="text-black">
              Patient Name
            </Label>
            <Input
              id="name"
              value={newAppointment.patient.name}
              onChange={(e) => handleNewAppointmentChange("patient.name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Patient Email
            </Label>
            <Input
              id="email"
              type="email"
              value={newAppointment.patient.email}
              onChange={(e) => handleNewAppointmentChange("patient.email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">
              Patient Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={newAppointment.patient.phone}
              onChange={(e) => handleNewAppointmentChange("patient.phone", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time" className="text-black">
              Appointment Time
            </Label>
            <select
              id="time"
              value={newAppointment.time}
              onChange={(e) => handleNewAppointmentChange("time", e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a time</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:30 PM">3:30 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
          </div>
          <Button onClick={handleAddAppointment}>Add Appointment</Button>
        </div>
      </div>
    </div>
  );
}
