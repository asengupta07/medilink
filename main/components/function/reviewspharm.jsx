"use client"

import { useState,  useEffect } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

export default function Reviewspharm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/api/getReviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);


  // const reviews = [
  //   {
  //       "id": 1,
  //       "name": "Dr. John Doe",
  //       "date": "2023-05-15",
  //       "rating": 4,
  //       "comment": "Great pharmacy, highly recommended!"
  //   },
  //   {
  //       "id": 2,
  //       "name": "Nurse Jane Smith",
  //       "date": "2023-04-20",
  //       "rating": 5,
  //       "comment": "Exceeded my expectations, amazing service!"
  //   },
  //   {
  //       "id": 3,
  //       "name": "Michael Johnson",
  //       "date": "2023-03-01",
  //       "rating": 3,
  //       "comment": "Decent pharmacy, but could be better."
  //   },
  //   {
  //       "id": 4,
  //       "name": "Emily Brown",
  //       "date": "2023-06-10",
  //       "rating": 4,
  //       "comment": "I love this pharmacy, it has made my life so much easier!"
  //   },
  //   {
  //       "id": 5,
  //       "name": "Dr. David Lee",
  //       "date": "2023-02-28",
  //       "rating": 5,
  //       "comment": "This is the best pharmacy I have ever been to, highly recommended!"
  //   },
  //   {
  //       "id": 6,
  //       "name": "Nurse Sarah Davis",
  //       "date": "2023-01-15",
  //       "rating": 4,
  //       "comment": "Great value for the service, I am very satisfied."
  //   },
  //   {
  //       "id": 7,
  //       "name": "Tom Wilson",
  //       "date": "2023-05-01",
  //       "rating": 3,
  //       "comment": "It works, but I expected more from this pharmacy."
  //   },
  //   {
  //       "id": 8,
  //       "name": "Dr. Olivia Thompson",
  //       "date": "2023-04-05",
  //       "rating": 5,
  //       "comment": "This pharmacy has changed my life, I can't live without it!"
  //   }
  // ]
  const [sortBy, setSortBy] = useState("date")
  const [filterRating, setFilterRating] = useState(0)
  const handleSortChange = (value) => {
    setSortBy(value)
  }
  const handleFilterChange = (value) => {
    setFilterRating(value)
  }
  const filteredReviews = reviews.filter((review) => review.rating >= filterRating)
  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  })
  const lowRatedReviews = reviews.filter((review) => review.rating < 3)
  const sortedLowRatedReviews = lowRatedReviews.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "rating") {
      return a.rating - b.rating
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  })
  return (
    <section>
      <div className="mx-auto px-4 pt-4 md:px-6 max-w-6xl grid gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Pharmacy Reviews</h2>
            <p className="text-muted-foreground">See what our buyers are saying about our pharmacy.</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ListOrderedIcon className="w-4 h-4" />
                  <span>Sort by</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                  <DropdownMenuRadioItem value="date">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  <span>Filter by rating</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={filterRating} onValueChange={handleFilterChange}>
                  <DropdownMenuRadioItem value={0}>All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={4}>4 stars and above</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={5}>5 stars</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={3}>3 stars and lower</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filterRating === 3
            ? sortedLowRatedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-background border rounded-lg p-4 flex flex-col gap-4 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            ))
            : sortedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-background border rounded-lg p-4 flex flex-col gap-4 sm:hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{review.name}</div>
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 " />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
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


function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>)
  );
}


function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>)
  );
}


function StarIcon(props) {
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
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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