"use client";

import { useEffect, useState } from "react";

import ContestCard from "@/components/dashboard/ContestCard";
import ContextCardSkeleton from "@/components/dashboard/ContextCardSkeleton";
import { Contest } from "@/types/contest";

function renderSkeletons() {
  return Array.from({ length: 10 }).map((_, i) => (
    <ContextCardSkeleton key={i} />
  ));
}

function renderContests(contests: Contest[]) {
  return contests.map((contest, i) => (
    <ContestCard key={i} contest={contest}></ContestCard>
  ));
}

export default function Dashboard() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/contests")
      .then((response) => response.json())
      .then((data) => {
        setContests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="
        container mx-auto py-4 px-4
        md:py-6 
        lg:grid lg:grid-cols-11 lg:gap-8 lg:p-10"
    >
      <div className="hidden lg:block col-span-4 rounded-lg border p-6 max-h-60 bg-white shadow-sm sticky top-10 z-10">
        Filters
      </div>
      <div
        className="
        space-y-4
        lg:space-y-8 lg:col-span-7"
      >
        {loading ? renderSkeletons() : renderContests(contests)}
      </div>
    </div>
  );
}
