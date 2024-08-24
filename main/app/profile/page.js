"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/function/navbar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "../_contexts/authContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

const navigationItems = [
    { name: "Personal Info", icon: UserIcon, section: "personal" },
    { name: "Medical Info", icon: HospitalIcon, section: "medical" },
    { name: "Emergency Contact", icon: AmbulanceIcon, section: "emergency" },
    { name: "Appointment History", icon: CalendarIcon, section: "appointments" },
    { name: "Documents", icon: FileIcon, section: "documents" },
    { name: "Settings", icon: SettingsIcon, section: "settings" },
]
export default function Profile() {
    const [activeSection, setActiveSection] = useState("personal")
    const [isEditing, setIsEditing] = useState(false)
    const [isEditingMed, setIsEditingMed] = useState(false)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const [emergencyContacts, setEmergencyContacts] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [newContact, setNewContact] = useState({
        name: "",
        relation: "",
        phone: "",
        email: "",
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/getUser', {
                    headers: {
                        'Authorization': token // Assuming you store the token in localStorage
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
                setLoading(false);
                setEmergencyContacts(data.userEmergencyContacts)
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditingMed(true)
    }
    const handleSave = () => {
        setIsEditingMed(false)
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleRemoveContact = async (contactId) => {
        const updatedContacts = emergencyContacts.filter(contact => contact._id !== contactId);
        setEmergencyContacts(updatedContacts);

        try {
            const response = await fetch('/api/removeEmergencyContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token, // Replace with actual user ID
                    contactId: contactId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const handleAddContact = async () => {
        setEmergencyContacts([...emergencyContacts, newContact])
        setNewContact({
            name: "",
            relation: "",
            phone: "",
            email: "",
        })
        setShowAddForm(false)

        try {
            const response = await fetch('/api/addEmergencyContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token, // Replace with actual user ID
                    name: newContact.name,
                    relation: newContact.relation,
                    phone: newContact.phone,
                    email: newContact.email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                // Reset form or show success message
            } else {
                console.error(data.message);
                // Show error message
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const handleInputChange = (e) => {
        setNewContact({
            ...newContact,
            [e.target.name]: e.target.value,
        })
    }
    const [appointments, setAppointments] = useState([
        {
            date: "2023-06-15",
            doctorName: "Dr. Jane Smith",
            purpose: "Annual checkup",
            notes: "Prescribed vitamins, no concerns",
            documents: ["Checkup Report.pdf"],
        },
        {
            date: "2023-04-20",
            doctorName: "Dr. John Doe",
            purpose: "Sinus infection",
            notes: "Antibiotics prescribed, follow up in 2 weeks",
            documents: ["Prescription.pdf"],
        },
        {
            date: "2023-02-10",
            doctorName: "Dr. Sarah Lee",
            purpose: "Routine physical",
            notes: "All tests normal, no issues",
            documents: ["Physical Report.pdf"],
        },
    ])
    const [editingIndex, setEditingIndex] = useState(-1)
    const handlePurposeEdit = (index, newPurpose) => {
        setAppointments(
            appointments.map((appointment, i) => {
                if (i === index) {
                    return { ...appointment, purpose: newPurpose }
                }
                return appointment
            }),
        )
        setEditingIndex(-1)
    }
    const [activeTab, setActiveTab] = useState("medical");
    const [documents, setDocuments] = useState({
        medical: [
            {
                name: "Annual Checkup Report",
                date: "2023-04-15",
                remarks: "Routine checkup, all tests normal",
            },
            {
                name: "Allergy Test Results",
                date: "2023-03-01",
                remarks: "Positive for dust mites",
            },
        ],
        scans: [
            {
                name: "Chest X-ray",
                date: "2023-02-20",
                remarks: "No abnormalities detected",
            },
            {
                name: "MRI Scan",
                date: "2023-01-10",
                remarks: "Slight disc bulge in L4-L5",
            },
        ],
        lab: [
            {
                name: "Comprehensive Metabolic Panel",
                date: "2023-05-01",
                remarks: "All values within normal range",
            },
            {
                name: "Lipid Panel",
                date: "2023-04-01",
                remarks: "Cholesterol slightly elevated",
            },
        ],
    });

    const [newFile, setNewFile] = useState({
        file: null,
        type: "medical",
        date: "",
        remarks: "",
    });
    const [showFileInput, setShowFileInput] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRemoveDocument = (category, index) => {
        const updatedDocuments = { ...documents };
        updatedDocuments[category].splice(index, 1);
        setDocuments(updatedDocuments);
    };

    const handleFileChange = (e) => {
        setNewFile({
            ...newFile,
            file: e.target.files[0],
            date: new Date().toISOString().slice(0, 10),
        });
    };

    const handleTypeChange = (value) => {
        setNewFile({
            ...newFile,
            type: value,
        });
    };

    const handleRemarksChange = (e) => {
        setNewFile({
            ...newFile,
            remarks: e.target.value,
        });
    };

    const splitName = (fullName) => {
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        return { firstName, lastName };
    };

    const handleSaveFile = () => {
        const { file, type, date, remarks } = newFile;
        if (file) {
            const newDocument = {
                name: file.name,
                date: date,
                remarks: remarks,
            };
            setDocuments({
                ...documents,
                [type]: [...documents[type], newDocument],
            });
            setNewFile({
                file: null,
                type: "medical",
                date: "",
                remarks: "",
            });
            setShowFileInput(false);
        }
    };
    const [profilePicture, setProfilePicture] = useState("/plaeholder-user.jpg")
    const handleProfilePictureChange = (event) => {
        setProfilePicture(URL.createObjectURL(event.target.files[0]))
    }

    const handleOverlayClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
}