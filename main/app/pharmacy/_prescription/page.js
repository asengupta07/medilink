'use client'

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Component() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, customer: "John Doe", date: "2023-05-15", type: "Antibiotic", file: "prescription1.pdf" },
    { id: 2, customer: "Jane Smith", date: "2023-05-16", type: "Pain Relief", file: "prescription2.pdf" },
  ]);

  const [history, setHistory] = useState([
    { id: 1, customer: "John Doe", date: "2023-05-15", type: "Antibiotic", status: "Active" },
    { id: 2, customer: "Jane Smith", date: "2023-05-16", type: "Pain Relief", status: "Expired" },
    { id: 3, customer: "John Doe", date: "2023-04-01", type: "Allergy", status: "Expired" },
  ]);

  function handleUpload(e) {
    e.preventDefault();
    {/* Implement file upload logic here */}
    alert("Prescription uploaded successfully!");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prescription Management</h1>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="upload"
            className={({ isSelected }) =>
              `py-2 px-4 text-center ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-primary-foreground'}`
            }
          >
            Upload & Manage Prescriptions
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className={({ isSelected }) =>
              `py-2 px-4 text-center ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-primary-foreground'}`
            }
          >
            Prescription History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Prescription</CardTitle>
              <CardDescription>Upload and manage customer prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Input id="customer" placeholder="Customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Prescription Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="pain-relief">Pain Relief</SelectItem>
                        <SelectItem value="allergy">Allergy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Prescription File</Label>
                    <Input id="file" type="file" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
                <Button type="submit">Upload Prescription</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Manage Prescriptions</CardTitle>
              <CardDescription>View and edit existing prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>File</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map(function(prescription) {
                    return (
                      <TableRow key={prescription.id}>
                        <TableCell>{prescription.customer}</TableCell>
                        <TableCell>{prescription.date}</TableCell>
                        <TableCell>{prescription.type}</TableCell>
                        <TableCell>{prescription.file}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Prescription History</CardTitle>
              <CardDescription>View the complete history of customer prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input placeholder="Search prescriptions" className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map(function(item) {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.customer}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}