// maintenanceform.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const maintenanceSchema = z.object({
  equipmentId: z.string().min(1, "Equipment is required"),
  date: z.date().refine(date => date <= new Date(), "Date cannot be in the future"),
  type: z.enum(["Preventive", "Repair", "Emergency"]),
  technician: z.string().min(2, "Technician name must be at least 2 characters"),
  hoursSpent: z.number().min(1, "Hours must be at least 1").max(24, "Max 24 hours"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  completionStatus: z.enum(["Complete", "Incomplete", "Pending Parts"]),
});

export default function MaintenanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(maintenanceSchema),
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="equipmentId">Equipment</label>
        <select {...register("equipmentId")} id="equipmentId" className="border rounded p-2 w-full">
          <option value="">Select Equipment</option>
          <option value="1">Machine A</option>
          <option value="2">Machine B</option>
          <option value="3">Machine C</option>
        </select>
        {errors.equipmentId?.message && (
          <p className="text-red-500 text-sm">{errors.equipmentId.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          {...register("date")}
          id="date"
          className="border rounded p-2 w-full"
        />
        {errors.date?.message && (
          <p className="text-red-500 text-sm">{errors.date.message as string}</p>
        )}
      </div>

      <div>
        <label htmlFor="technician">Technician</label>
        <input
          {...register("technician")}
          placeholder="Technician"
          id="technician"
          className="border rounded p-2 w-full"
        />
        {errors.technician?.message && (
          <p className="text-red-500 text-sm">{errors.technician.message as string}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
