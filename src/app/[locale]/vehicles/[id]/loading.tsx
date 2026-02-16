import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-2">
            <Skeleton className="mb-4 aspect-16/10 w-full rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Right Column: Details & Booking Form */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <Skeleton className="mb-2 h-8 w-3/4" />
              <div className="mb-6 flex gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
              </div>

              <div className="mb-6 space-y-3 border-y border-border py-6">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>

              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <Skeleton className="mb-4 h-6 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
