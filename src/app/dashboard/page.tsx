"use client";

import { useEffect, useState } from "react";

import ContestCard from "@/components/dashboard/ContestCard";
import ContextCardSkeleton from "@/components/dashboard/ContextCardSkeleton";
import { Contest } from "@/types/contest";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      className="relative 
        container mx-auto py-4 px-4
        md:py-6 
        lg:grid lg:grid-cols-10 lg:gap-8 lg:p-10
        xl:grid-cols-11"
    >
      <div
        className="
        hidden 
        rounded-lg border p-6 max-h-60 bg-white shadow-sm sticky top-10 z-10
        lg:block lg:col-span-3 
        xl:col-span-4
        "
      >
        Filtros, Ordenar por
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            className="sticky top-4 md:top-6 lg:hidden rounded-full"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Filtros, Ordenar por</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div
        className="
        space-y-4
        mt-[-36px]
        lg:mt-0
        lg:col-span-7 lg:space-y-8 
        xl:col-span-7"
      >
        {loading ? renderSkeletons() : renderContests(contests)}
      </div>
    </div>
  );
}
