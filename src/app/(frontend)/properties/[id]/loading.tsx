import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function PropertyLoadingPage() {
  return (
    <div className="max-w-screen p-12 flex justify-center bg-accent text-sm">
      <div className="w-full max-w-lg grid gap-4">
        <Card>
          <CardHeader>
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {/* Address skeleton */}
            <div className="flex flex-row gap-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="flex flex-row gap-3">
              {/* Features heading skeleton */}
              <Skeleton className="h-5 w-16" />

              {/* Features list skeleton */}
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* JSON data placeholder skeleton */}
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
