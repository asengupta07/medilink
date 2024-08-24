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
    return (
        (<div>
            <Header isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50"
                    onClick={handleOverlayClick}
                ></div>
            )}
            <div className="flex min-h-screen w-full bg-background">
                <aside className="hidden w-64 flex-col bg-background p-6 lg:flex">
                    <div className="mb-6">
                        <Link
                            href="#"
                            className="flex items-center gap-2 font-semibold"
                            prefetch={false}>
                            <UserIcon className="h-6 w-6" />
                            <span>Your Profile</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveSection("personal")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "personal" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <UserIcon className="h-5 w-5" />
                            <span>Personal Info</span>
                        </button>
                        <button
                            onClick={() => setActiveSection("medical")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "medical" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <HospitalIcon className="h-5 w-5" />
                            <span>Medical Info</span>
                        </button>
                        <button
                            onClick={() => setActiveSection("emergency")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "emergency" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <AmbulanceIcon className="h-5 w-5" />
                            <span>Emergency Contact</span>
                        </button>
                        <button
                            onClick={() => setActiveSection("appointments")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "appointments" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <CalendarIcon className="h-5 w-5" />
                            <span>Appointment History</span>
                        </button>
                        <button
                            onClick={() => setActiveSection("documents")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "documents" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <FileIcon className="h-5 w-5" />
                            <span>Documents</span>
                        </button>
                        <button
                            onClick={() => setActiveSection("settings")}
                            className={`flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${activeSection === "settings" ? "bg-accent text-accent-foreground" : ""
                                }`}>
                            <SettingsIcon className="h-5 w-5" />
                            <span>Settings</span>
                        </button>
                    </nav>
                </aside>
                <div className="flex flex-1 flex-col">
                    <div className="lg:hidden w-full p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    <span>Your Profile</span>
                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {navigationItems.map((item) => (
                                    <DropdownMenuItem
                                        key={item.section}
                                        onSelect={() => setActiveSection(item.section)}
                                        className={`flex items-center gap-2 ${activeSection === item.section ? "bg-accent text-accent-foreground" : ""
                                            }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <main className="flex-1 p-4 sm:p-6">
                        {activeSection === "personal" && (
                            <Card className="border-none shadow-md shadow-foreground">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="profilePicture">Profile Picture</Label>
                                        {isEditing ? (
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-16 w-16 border">
                                                    <AvatarImage src="/placeholder-user.jpg" />
                                                    <AvatarFallback>JP</AvatarFallback>
                                                </Avatar>
                                                <Input id="profilePicture" type="file" accept="image/*" onChange={handleProfilePictureChange} />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-16 w-16 border">
                                                    <AvatarImage src="/placeholder-user.jpg" />
                                                    <AvatarFallback>JP</AvatarFallback>
                                                </Avatar>
                                                <div className="font-medium">Profile Picture</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <div className="font-medium"> {userData?.name?.split(' ')[0]}</div>

                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <div className="font-medium">{userData?.name?.split(' ')[1]}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="dob">Date of Birth</Label>
                                            <div className="font-medium">{userData?.userInfo.dateofbirth?.split('T')[0]}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            {isEditing ? (
                                                <Select id="gender">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Male</SelectItem>
                                                        <SelectItem value="female">Female</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <div className="font-medium">{userData?.userInfo.gender}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            {isEditing ? (
                                                <Input id="phone" placeholder="+1 (555) 555-5555" />
                                            ) : (
                                                <div className="font-medium">{userData?.userContact.phone}</div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Telephone Number</Label>
                                            {isEditing ? (
                                                <Input id="telephone" placeholder="+1 (555) 555-5555" />
                                            ) : (
                                                <div className="font-medium">{userData?.userContact.telephone}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        {isEditing ? (
                                            <Input id="email" type="email" placeholder="john@example.com" />
                                        ) : (
                                            <div className="font-medium">{userData?.email}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        {isEditing ? (
                                            <Textarea id="address" placeholder="123 Main St, Anytown USA" />
                                        ) : (
                                            <div className="font-medium">{userData?.userContact.address}</div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    {isEditing ? (
                                        <Button onClick={() => setIsEditing(false)}>Save</Button>
                                    ) : (
                                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                                    )}
                                </CardFooter>
                            </Card>
                        )}
                        {activeSection === "medical" && (
                            <Card className="border-none shadow-md shadow-foreground">
                                <CardHeader>
                                    <CardTitle>Medical Information</CardTitle>
                                    <CardDescription>Update your medical information to ensure your records are accurate.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="blood-type">Blood Type</Label>
                                            {isEditingMed ? <Input id="blood-type" defaultValue="O+" /> : <p className="font-medium">O+</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="allergies">Allergies</Label>
                                            {isEditingMed ? <Textarea id="allergies" defaultValue="Peanuts, Penicillin" /> : <p className="font-medium">Peanuts, Penicillin</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="medications">Current Medications</Label>
                                            {isEditingMed ? <Textarea id="medications" defaultValue="Aspirin, Metformin" /> : <p className="font-medium">Aspirin, Metformin</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="conditions">Chronic Conditions</Label>
                                            {isEditingMed ? (
                                                <Textarea id="conditions" defaultValue="Diabetes, Hypertension" />
                                            ) : (
                                                <p className="font-medium">Diabetes, Hypertension</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="surgeries">Previous Surgeries</Label>
                                            {isEditingMed ? (
                                                <Textarea id="surgeries" defaultValue="Appendectomy, Knee Replacement" />
                                            ) : (
                                                <p className="font-medium">Appendectomy, Knee Replacement</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vaccinations">Vaccination Records</Label>
                                            {isEditingMed ? (
                                                <Textarea id="vaccinations" defaultValue="COVID-19, Flu, Tetanus" />
                                            ) : (
                                                <p className="font-medium">COVID-19, Flu, Tetanus</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="family-history">Family Medical History</Label>
                                            {isEditingMed ? (
                                                <Textarea id="family-history" defaultValue="Heart disease, Cancer" />
                                            ) : (
                                                <p className="font-medium">Heart disease, Cancer</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="heart-disease">Heart Disease</Label>
                                            {isEditingMed ? <Input id="heart-disease" type="date" defaultValue="2020-01-01" /> : <p className="font-medium">2020-01-01</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cancer">Cancer</Label>
                                            {isEditingMed ? (
                                                <Select id="cancer" defaultValue="no">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="font-medium">No</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="substance-abuse">Alcohol/Drug Abuse</Label>
                                            {isEditingMed ? (
                                                <Select id="substance-abuse" defaultValue="no">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <p className="font-medium">No</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    {isEditingMed ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
                                </CardFooter>
                            </Card>
                        )}
                        {activeSection === "emergency" && (
                            <Card className="border-none shadow-md shadow-foreground">
                                <CardHeader>
                                    <CardTitle>Emergency Contacts</CardTitle>
                                    <CardDescription>Add and manage your emergency contacts here.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {emergencyContacts.map((contact, index) => (
                                            <div key={index} className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between border-b pb-2">
                                                <div className="space-y-1 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 flex-grow">
                                                    <div className="font-medium">{contact.name}</div>
                                                    <div>{contact.relation}</div>
                                                    <div>{contact.phone}</div>
                                                    <div className="hidden md:block">{contact.email}</div>
                                                </div>
                                                <Button variant="outline" size="sm" onClick={() => handleRemoveContact(contact._id)} className="self-start sm:self-center mt-2 sm:mt-0">
                                                    Remove
                                                </Button>
                                            </div>
                                        ))}
                                        {showAddForm && (
                                            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
                                                <Input name="name" placeholder="Name" value={newContact.name} onChange={handleInputChange} />
                                                <Input name="relation" placeholder="Relationship" value={newContact.relation} onChange={handleInputChange} />
                                                <Input name="phone" placeholder="Phone" value={newContact.phone} onChange={handleInputChange} />
                                                <Input name="email" placeholder="Email" value={newContact.email} onChange={handleInputChange} />
                                                <Button onClick={handleAddContact} className="w-full sm:w-auto">Add</Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" onClick={() => setShowAddForm(!showAddForm)} className="w-full sm:w-auto">
                                        {showAddForm ? "Cancel" : "Add Emergency Contact"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                        {activeSection === "appointments" && (
                            <Card className="border-none shadow-md shadow-foreground w-full">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="text-xl sm:text-2xl">Appointment History</CardTitle>
                                    <CardDescription className="text-sm sm:text-base">View your past appointments and doctors&apos; notes.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <ul className="grid gap-4 sm:gap-6">
                                        {appointments.map((appointment, index) => (
                                            <li key={index} className="grid gap-2 sm:gap-4 p-3 sm:p-4 bg-background shadow-sm shadow-foreground rounded-md relative">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="text-xs sm:text-sm text-muted-foreground">{appointment.date}</div>
                                                    <div className="text-sm sm:text-base font-medium">{appointment.doctorName}</div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                                                    {editingIndex === index ? (
                                                        <Input
                                                            defaultValue={appointment.purpose}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handlePurposeEdit(index, e.target.value)
                                                                }
                                                            }}
                                                            onBlur={(e) => handlePurposeEdit(index, e.target.value)}
                                                            className="flex-1 text-sm sm:text-base"
                                                        />
                                                    ) : (
                                                        <div className="flex-1 flex items-center justify-between sm:justify-start">
                                                            <span className="text-sm sm:text-base">{appointment.purpose}</span>
                                                            <Button variant="ghost" size="sm" onClick={() => setEditingIndex(index)} className="ml-2 sm:ml-4 text-xs sm:text-sm">
                                                                Edit
                                                            </Button>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col items-start sm:items-end gap-2 mt-2 sm:mt-0">
                                                        <div className="text-xs sm:text-sm text-muted-foreground">
                                                            {appointment.documents.map((doc, i) => (
                                                                <span key={i}>
                                                                    {doc}
                                                                    {i < appointment.documents.length - 1 ? ", " : ""}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs sm:text-sm">
                                                            <FileIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                            Add/Change Document
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-xs sm:text-sm text-muted-foreground">{appointment.notes}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                        {activeSection === "documents" && (
                            <Card className="border-none shadow-md shadow-foreground w-full">
                                <CardHeader className="p-4 sm:p-6">
                                    <CardTitle className="text-xl sm:text-2xl">Documents</CardTitle>
                                    <CardDescription className="text-sm sm:text-base">Upload and manage your medical documents.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <Tabs defaultValue="medical" value={activeTab} onValueChange={handleTabChange} className="w-full">
                                        <TabsList className="w-full bg-slate-200 dark:bg-slate-900 mb-4">
                                            <TabsTrigger value="medical" className="flex-1 text-xs sm:text-sm">Medical Reports</TabsTrigger>
                                            <TabsTrigger value="scans" className="flex-1 text-xs sm:text-sm">Scans/X-rays</TabsTrigger>
                                            <TabsTrigger value="lab" className="flex-1 text-xs sm:text-sm">Lab Results</TabsTrigger>
                                        </TabsList>
                                        {["medical", "scans", "lab"].map((tabValue) => (
                                            <TabsContent key={tabValue} value={tabValue}>
                                                <div className="grid gap-4">
                                                    {documents[tabValue].map((doc, index) => (
                                                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-background shadow-sm shadow-foreground rounded-md p-3 sm:p-4">
                                                            <div className="mb-2 sm:mb-0">
                                                                <div className="font-medium text-sm sm:text-base">{doc.name}</div>
                                                                <div className="text-xs sm:text-sm text-muted-foreground">{doc.date}</div>
                                                                {doc.remarks && <div className="text-xs sm:text-sm text-muted-foreground">{doc.remarks}</div>}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                                                <Button variant="ghost" size="sm" onClick={() => handleRemoveDocument(tabValue, index)} className="text-xs sm:text-sm">Remove</Button>
                                                                <Button variant="ghost" size="sm" onClick={() => { }} className="text-xs sm:text-sm">Download</Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                    <div className="mt-4 sm:mt-6">
                                        {showFileInput && (
                                            <div className="grid gap-3 sm:gap-4 bg-background shadow-sm shadow-foreground p-3 sm:p-4 rounded-md">
                                                <div className="grid gap-1 sm:gap-2">
                                                    <Label htmlFor="file" className="text-sm sm:text-base">File</Label>
                                                    <Input id="file" type="file" onChange={handleFileChange} className="w-full text-sm sm:text-base" />
                                                </div>
                                                <div className="grid gap-1 sm:gap-2">
                                                    <Label htmlFor="type" className="text-sm sm:text-base">Type</Label>
                                                    <Select id="type" value={newFile.type} onValueChange={handleTypeChange}>
                                                        <SelectTrigger className="w-full text-sm sm:text-base">
                                                            <SelectValue placeholder="Select file type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="medical">Medical Reports</SelectItem>
                                                            <SelectItem value="scans">Scans/X-rays</SelectItem>
                                                            <SelectItem value="lab">Lab Results</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-1 sm:gap-2">
                                                    <Label htmlFor="remarks" className="text-sm sm:text-base">Remarks</Label>
                                                    <Textarea id="remarks" value={newFile.remarks} onChange={handleRemarksChange} className="w-full text-sm sm:text-base" />
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
                                                    <Button variant="outline" size="sm" onClick={() => setShowFileInput(false)} className="w-full sm:w-auto text-xs sm:text-sm">Cancel</Button>
                                                    <Button size="sm" onClick={handleSaveFile} className="w-full sm:w-auto text-xs sm:text-sm">Save</Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 sm:p-6">
                                    <Button variant="outline" size="sm" onClick={() => setShowFileInput(true)} className="w-full sm:w-auto text-xs sm:text-sm">Add Document</Button>
                                </CardFooter>
                            </Card>

                        )}
                        {activeSection === "settings" && (
                            <Card className="border-none shadow-md shadow-foreground">
                                <CardHeader>
                                    <CardTitle>Settings</CardTitle>
                                    <CardDescription>Manage your notification preferences and privacy settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-muted-foreground text-sm">Receive updates and alerts via email.</p>
                                            </div>
                                            <Switch id="email-notifications" defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div>
                                                <p className="font-medium">SMS Notifications</p>
                                                <p className="text-muted-foreground text-sm">Receive important updates via text message.</p>
                                            </div>
                                            <Switch id="sms-notifications" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Data Sharing Preferences</p>
                                                <p className="text-muted-foreground text-sm">Control how your data is shared.</p>
                                            </div>
                                            <Select defaultValue="share-publicly">
                                                <SelectTrigger className="w-48">
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="share-publicly">Share Publicly</SelectItem>
                                                    <SelectItem value="share-connections">Share with Connections</SelectItem>
                                                    <SelectItem value="share-selected">Share with Selected Contacts</SelectItem>
                                                    <SelectItem value="do-not-share">Do Not Share</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </main>
                </div>
            </div>
        </div>)
    );
}

function AmbulanceIcon(props) {
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
            <path d="M10 10H6" />
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path
                d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
            <path d="M8 8v4" />
            <path d="M9 18h6" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
        </svg>)
    );
}


function CalendarIcon(props) {
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
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>)
    );
}


function FileIcon(props) {
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>)
    );
}


function HospitalIcon(props) {
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
            <path d="M12 6v4" />
            <path d="M14 14h-4" />
            <path d="M14 18h-4" />
            <path d="M14 8h-4" />
            <path
                d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
            <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
        </svg>)
    );
}


function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>)
    );
}


function SettingsIcon(props) {
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
            <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>)
    );
}


function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>)
    );
}


function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>)
    );
}