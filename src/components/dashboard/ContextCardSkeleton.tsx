"use client";

import "./styles.css";

import { Skeleton } from "@/components/ui/skeleton";

export default function ContextCardSkeleton() {
  return (
    <div className="card-base">
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
}
