"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  createVehicleAction,
  updateVehicleAction,
} from "@/app/[locale]/admin/vehicles/actions";
import { type VehicleFormData, vehicleSchema } from "@/schemas/vehicle";
import type { Vehicle } from "@/types/database";

interface VehicleFormProps {
  vehicle?: Vehicle;
}

export function VehicleForm({ vehicle }: Readonly<VehicleFormProps>) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    // @ts-expect-error - zod resolver type mismatch
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: vehicle?.name || "",
      type: vehicle?.type || "car",
      brand: vehicle?.brand || "",
      model: vehicle?.model || "",
      year: vehicle?.year || new Date().getFullYear(),
      price_per_day: vehicle?.price_per_day || 0,
      description: vehicle?.description || "",
      image_url: vehicle?.image_url || "",
      is_available: vehicle?.is_available ?? true,
      transmission: vehicle?.transmission || "automatic",
      seats: vehicle?.seats || 4,
      engine_cc: vehicle?.engine_cc || 1500,
      features: vehicle?.features || [],
    },
  });

  const onSubmit = (data: VehicleFormData) => {
    setError(null);
    startTransition(async () => {
      if (vehicle) {
        const result = await updateVehicleAction(vehicle.id, data);
        if (result.error) {
          setError(result.error);
        } else {
          router.push("/admin/vehicles");
          router.refresh();
        }
      } else {
        const result = await createVehicleAction(data);
        if (result.error) {
          setError(result.error);
        } else {
          router.push("/admin/vehicles");
          router.refresh();
        }
      }
    });
  };

  return (
    // @ts-expect-error - react-hook-form type compatibility
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.name && (
            <p className="text-xs text-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Type
          </label>
          <select
            id="type"
            {...register("type")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
          {errors.type && (
            <p className="text-xs text-error">{errors.type.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="brand" className="text-sm font-medium">
            Brand
          </label>
          <input
            id="brand"
            {...register("brand")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.brand && (
            <p className="text-xs text-error">{errors.brand.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="model" className="text-sm font-medium">
            Model
          </label>
          <input
            id="model"
            {...register("model")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.model && (
            <p className="text-xs text-error">{errors.model.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="text-sm font-medium">
            Year
          </label>
          <input
            id="year"
            type="number"
            {...register("year")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.year && (
            <p className="text-xs text-error">{errors.year.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="price_per_day" className="text-sm font-medium">
            Price Per Day
          </label>
          <input
            id="price_per_day"
            type="number"
            {...register("price_per_day")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.price_per_day && (
            <p className="text-xs text-error">{errors.price_per_day.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="transmission" className="text-sm font-medium">
            Transmission
          </label>
          <select
            id="transmission"
            {...register("transmission")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          {errors.transmission && (
            <p className="text-xs text-error">{errors.transmission.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="image_url" className="text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            {...register("image_url")}
            placeholder="https://..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.image_url && (
            <p className="text-xs text-error">{errors.image_url.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="seats" className="text-sm font-medium">
            Seats
          </label>
          <input
            id="seats"
            type="number"
            {...register("seats")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.seats && (
            <p className="text-xs text-error">{errors.seats.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="engine_cc" className="text-sm font-medium">
            Engine CC
          </label>
          <input
            id="engine_cc"
            type="number"
            {...register("engine_cc")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          {errors.engine_cc && (
            <p className="text-xs text-error">{errors.engine_cc.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm min-h-[100px]"
        />
        {errors.description && (
          <p className="text-xs text-error">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_available"
          {...register("is_available")}
          className="h-4 w-4 rounded border-border"
        />
        <label htmlFor="is_available" className="text-sm font-medium">
          Available for booking
        </label>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {vehicle ? "Update Vehicle" : "Create Vehicle"}
        </button>
      </div>
    </form>
  );
}
