import { useEffect, useState } from "react";
import { useForm } from "react-hook-form" 
import { api } from "./api";
import type { CreateActivityRequest } from "./types";

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  onActivityCreated?: () => void,
}

interface ActivityFormValues {
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  maxParticipants: number;
  description?: string;
  lat?: number;
  lng?: number;
}

const CreateActivityModal = ({ isOpen, onClose, title, onActivityCreated }: ModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormValues>();

  const [locationLoaded, setLocationLoaded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitHandler = async (data: ActivityFormValues) => {
    try {
      setSubmitError(null);
      
      // Validate location
      if (!data.lat || !data.lng) {
        setSubmitError("Please set your location");
        return;
      }

      const createRequest: CreateActivityRequest = {
        title: data.title,
        category: data.category,
        location: data.location,
        date: data.date,
        time: data.time,
        maxParticipants: parseInt(data.maxParticipants.toString()),
        description: data.description,
        lat: data.lat,
        lng: data.lng,
      };

      await api.activities.create(createRequest);
      reset();
      setLocationLoaded(false);
      onActivityCreated?.();
    } catch (err) {
      setSubmitError((err as Error).message);
    }
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("lat", position.coords.latitude);
        setValue("lng", position.coords.longitude);
        setLocationLoaded(true);
      },
      (error) => {
        setSubmitError("Failed to get location: " + error.message);
      }
    );
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl mx-4 bg-brand-soft-white rounded-2xl shadow-xl transform transition-all duration-200 scale-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 ">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-brand-dark hover:text-brand-dark/80 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-lg mx-auto p-6 rounded-xl space-y-4"
        >
          <h2 className="text-xl font-semibold">Create Activity</h2>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Activity Title"
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{typeof errors.title.message == "string" ? errors.title.message : "Error"}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="Sport">Sport</option>
              <option value="Kultur">Kultur</option>
              <option value="Mat och dryck">Mat och dryck</option>
              <option value="Utomhus">Utomhus</option>
              <option value="Socialt">Socialt</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Location Name */}
          <div>
            <input
              {...register("location", { required: "Location name is required" })}
              placeholder="Location Name (e.g., Vasaparken, Stockholm)"
              className="w-full border p-2 rounded"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* GPS Location */}
          <div>
            <input type="hidden" {...register("lat")} />
            <input type="hidden" {...register("lng")} />    
            <button
              type="button"
              onClick={getLocation}
              className={`w-full text-brand-soft-white py-2 rounded transition-colors ${
                locationLoaded 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-brand-dark hover:bg-brand-dark/80"
              }`}
            >
              {locationLoaded ? "✓ Location Saved" : "Use My Current Location"}
            </button>          
          </div>

          {/* Date */}
          <div>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              className="w-full border p-2 rounded"
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>

          {/* Max Participants */}
          <div>
            <input
              type="number"
              {...register("maxParticipants", {
                required: "Max participants required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              placeholder="Max Participants"
              className="w-full border p-2 rounded"
            />
            {errors.maxParticipants && (
              <p className="text-red-500 text-sm">
                {errors.maxParticipants.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div className="flex w-full justify-center gap-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 bg-brand-dark text-brand-lighter py-2 rounded hover:bg-brand-dark/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Activity"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-brand-light hover:bg-brand-light/50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateActivityModal