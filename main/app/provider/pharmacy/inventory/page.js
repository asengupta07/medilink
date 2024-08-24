'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Edit, Trash2, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Component from '@/components/function/navbar3'

export default function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Aspirin", description: "Pain reliever", price: 5.99, quantity: 100, expirationDate: "2024-12-31" },
    { id: 2, name: "Amoxicillin", description: "Antibiotic", price: 12.99, quantity: 50, expirationDate: "2024-06-30" },
    { id: 3, name: "Lisinopril", description: "Blood pressure medication", price: 8.99, quantity: 75, expirationDate: "2025-03-31" },
  ])

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    expirationDate: '',
  })

  const [editingId, setEditingId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMedicine(prev => ({ ...prev, [name]: name === 'price' || name === 'quantity' ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setInventory(inventory.map(item => item.id === editingId ? { ...newMedicine, id: editingId } : item))
      setEditingId(null)
    } else {
      setInventory([...inventory, { ...newMedicine, id: Date.now() }])
    }
    setNewMedicine({ name: '', description: '', price: 0, quantity: 0, expirationDate: '' })
    setIsDialogOpen(false)
  }

  const handleEdit = (medicine) => {
    setNewMedicine(medicine)
    setEditingId(medicine.id)
    setIsDialogOpen(true)
  }

  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id))
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    if (editingId) {
      setEditingId(null)
      setNewMedicine({ name: '', description: '', price: 0, quantity: 0, expirationDate: '' })
    }
  }

  return (
    <div>
      <Component />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingId(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Medicine
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={newMedicine.name} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" value={newMedicine.description} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" step="0.01" value={newMedicine.price} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" name="quantity" type="number" value={newMedicine.quantity} onChange={handleInputChange} required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="expirationDate">Expiration Date</Label>
                    <Input id="expirationDate" name="expirationDate" type="date" value={newMedicine.expirationDate} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>Cancel</Button>
                  <Button type="submit">{editingId ? 'Update' : 'Add'} Medicine</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.description}</TableCell>
                    <TableCell>${medicine.price.toFixed(2)}</TableCell>
                    <TableCell className="relative">
                      {medicine.quantity}
                      {medicine.quantity < 10 && (
                        <AlertCircle className="h-4 w-4 text-red-500 absolute top-1/2 -translate-y-1/2 ml-2" />
                      )}
                    </TableCell>
                    <TableCell>{medicine.expirationDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(medicine)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit {medicine.name}</span>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(medicine.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {medicine.name}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}