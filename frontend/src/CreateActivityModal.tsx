import { useEffect, useState } from "react";
import { useForm } from "react-hook-form" 

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
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

const CreateActivityModal = ({ isOpen, onClose, title,  }: ModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ActivityFormValues>();

  const [locationLoaded, setLocationLoaded] = useState(false);

  const submitHandler = (data: ActivityFormValues) => {
    console.log("Form Data:", data);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setValue("lat", position.coords.latitude);
      setValue("lng", position.coords.longitude);
    });
    setLocationLoaded(true)
    console.log("Localtion saved")
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
      <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-2xl shadow-xl transform transition-all duration-200 scale-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="max-w-lg mx-auto p-6 bg-white rounded-xl space-y-4"
          >
            <h2 className="text-xl font-semibold">Create Activity</h2>

            {/* Title */}
            <div>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Activity Title"
                className="w-full border p-2 rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{typeof errors.title.message == "string" ? errors.title.message : "An"}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <input
                {...register("category", { required: "Category is required" })}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <input type="hidden" {...register("lat")} />
              <input type="hidden" {...register("lng")} />    
              <button
                type="button"
                onClick={getLocation}
                className={`w-full bg-gray-200 py-2 rounded ${locationLoaded ? "bg-green-400" : "bg-gray-200"}`}
              >
                Use My Current Location
              </button>          
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location.message}</p>
              )}
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
              />
            </div>

            <div className="flex w-full justify-center gap-5">
              <button
                type="submit"
                className="px-5 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Create Activity
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
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