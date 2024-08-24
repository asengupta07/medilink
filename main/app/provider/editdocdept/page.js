
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/function/navbar"

export default function Edit() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Emergency", description: "Providing immediate care for critical situations." },
    { id: 2, name: "Pediatrics", description: "Specialized care for infants, children, and adolescents." },
    { id: 3, name: "Oncology", description: "Comprehensive cancer treatment and support." },
  ])
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrician" },
    { id: 3, name: "Dr. Michael Johnson", specialty: "Oncologist" },
  ])
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false)
  const [showDoctorDialog, setShowDoctorDialog] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [editingDoctor, setEditingDoctor] = useState(null)
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    description: "",
  })
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
  })
  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }
  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id))
  }
  const handleAddDepartment = () => {
    setEditingDepartment(null)
    setShowDepartmentDialog(true)
  }
  const handleEditDepartment = (department) => {
    setEditingDepartment(department)
    setNewDepartment({ name: department.name, description: department.description })
    setShowDepartmentDialog(true)
  }
  const handleAddDoctor = () => {
    setEditingDoctor(null)
    setShowDoctorDialog(true)
  }
  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor)
    setNewDoctor({ name: doctor.name, specialty: doctor.specialty })
    setShowDoctorDialog(true)
  }
  const handleSaveDepartment = () => {
    if (editingDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartment.id
            ? { ...dept, name: newDepartment.name, description: newDepartment.description }
            : dept,
        ),
      )
    } else {
      setDepartments([...departments, { id: departments.length + 1, ...newDepartment }])
    }
    setShowDepartmentDialog(false)
    setNewDepartment({ name: "", description: "" })
    setEditingDepartment(null)
  }
  const handleSaveDoctor = () => {
    if (editingDoctor) {
      setDoctors(
        doctors.map((doc) =>
          doc.id === editingDoctor.id ? { ...doc, name: newDoctor.name, specialty: newDoctor.specialty } : doc,
        ),
      )
    } else {
      setDoctors([...doctors, { id: doctors.length + 1, ...newDoctor }])
    }
    setShowDoctorDialog(false)
    setNewDoctor({ name: "", specialty: "" })
    setEditingDoctor(null)
  }
  return (
    <div>
        <Header />
    <div className="flex flex-col gap-8 p-6 md:p-10">
      <div>
        <h2 className="text-2xl font-bold">Departments</h2>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={handleAddDepartment}>
            Add Department
          </Button>
          <Button size="sm" variant="outline">
            More
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Card key={dept.id}>
              <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                <h3 className="text-lg font-medium">{dept.name}</h3>
                <p className="text-muted-foreground">{dept.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditDepartment(dept)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteDepartment(dept.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Doctors</h2>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={handleAddDoctor}>
            Add Doctor
          </Button>
          <Button size="sm" variant="outline">
            More
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
                <img
                  src="/placeholder.svg"
                  width={64}
                  height={64}
                  alt={doc.name}
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <h3 className="text-lg font-medium">{doc.name}</h3>
                <p className="text-muted-foreground">{doc.specialty}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditDoctor(doc)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteDoctor(doc.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={showDepartmentDialog} onOpenChange={setShowDepartmentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDepartment ? "Edit Department" : "Add Department"}</DialogTitle>
            <DialogDescription>
              {editingDepartment
                ? "Update the details for the department."
                : "Fill in the details for the new department."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newDepartment.description}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveDepartment}>
              Save
            </Button>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showDoctorDialog} onOpenChange={setShowDoctorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
            <DialogDescription>
              {editingDoctor ? "Update the details for the doctor." : "Fill in the details for the new doctor."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="specialty" className="text-right">
                Specialty
              </Label>
              <Input
                id="specialty"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveDoctor}>
              Save
            </Button>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}