import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="border-b border-border bg-surface/50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="mb-2 h-10 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>
      </section>

      {/* Search & Filters Skeleton */}
      <section className="sticky top-16 z-30 border-b border-border bg-surface/80 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-20 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </section>

      {/* Results Grid Skeleton */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <Skeleton className="aspect-16/10 w-full" />
                <div className="p-4">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-4 h-4 w-1/2" />
                  <div className="mb-4 flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
