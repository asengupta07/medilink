"use client";

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Navbar from "@/components/function/navbar2";

export default function provider() {
  return (
    (<div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 place-content-center">
        <div className="flex-1 mx-auto pb-8 grid grid-cols-1  lg:grid-cols-3 gap-8">
          <Link
            href="#"
            prefetch={false}>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Appointments</CardTitle>
                <CardDescription className="text-sm sm:text-base">View and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">24</div>
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
              <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                  View Appointments
              </CardFooter>
            </Card>
          </Link>
          <Link
            href="#"
            prefetch={false}>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Analytics</CardTitle>
                <CardDescription className="text-sm sm:text-base">Insights and data about your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">$12,345</div>
                  <BarChartIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
              <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                  View Analytics
              </CardFooter>
            </Card>
          </Link>
          <Link
            href="#"
            prefetch={false}>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Manage Services</CardTitle>
                <CardDescription className="text-sm sm:text-base">Add, edit, and remove services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">15</div>
                  <SettingsIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
              <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                  Manage Services
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="w-full col-span-1 md:col-span-2 grid md:grid-cols-2 gap-8">
          <Link
            href="#"
            prefetch={false}>
            <Card className="md:col-span-1 transition-all duration-300 hover:scale-105 hover:shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Feedback</CardTitle>
                <CardDescription className="text-sm sm:text-base">Browse and respond to user feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">42</div>
                  <MessageCircleIcon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
              <CardFooter className="text-primary hover:text-accent text-sm sm:text-base max-w-fit">
                  View Feedback
              </CardFooter>
            </Card>
          </Link>

          <Card className="md:col-span-1 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">Institution Info</CardTitle>
              <CardDescription className="text-sm sm:text-base">Details about your institution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Name:</span>
                  <span className="text-sm sm:text-base">Acme University</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Address:</span>
                  <span className="text-sm sm:text-base">123 Main St, Anytown USA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Phone:</span>
                  <span className="text-sm sm:text-base">(123) 456-7890</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm sm:text-base">Email:</span>
                  <span className="text-sm sm:text-base">info@acme.edu</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>)
  );
}

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
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


function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>)
  );
}


function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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
