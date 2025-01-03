import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Equipment } from "../app/types/types";

const equipmentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  location: z.string(),
  department: z.enum(["Machining", "Assembly", "Packaging", "Shipping"]),
  model: z.string(),
  serialNumber: z.string().regex(/^[a-zA-Z0-9]+$/, "Must be alphanumeric"),
  installDate: z.date().max(new Date(), "Install date cannot be in the future"),
  status: z.enum(["Operational", "Down", "Maintenance", "Retired"]),
});

const EquipmentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Equipment>({
    resolver: zodResolver(equipmentSchema),
  });

  const onSubmit = (data: Equipment) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name")}
          placeholder="Name"
          className="border rounded p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          {...register("location")}
          placeholder="Location"
          className="border rounded p-2 w-full"
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
      </div>

      <div>
        <label htmlFor="department">Department</label>
        <select
          id="department"
          {...register("department")}
          className="border rounded p-2 w-full"
        >
          <option value="">Select department</option>
          <option value="Machining">Machining</option>
          <option value="Assembly">Assembly</option>
          <option value="Packaging">Packaging</option>
          <option value="Shipping">Shipping</option>
        </select>
        {errors.department && <p className="text-red-500">{errors.department.message}</p>}
      </div>

      <div>
        <label htmlFor="model">Model</label>
        <input
          id="model"
          {...register("model")}
          placeholder="Model"
          className="border rounded p-2 w-full"
        />
        {errors.model && <p className="text-red-500">{errors.model.message}</p>}
      </div>

      <div>
        <label htmlFor="serialNumber">Serial Number</label>
        <input
          id="serialNumber"
          {...register("serialNumber")}
          placeholder="Serial Number"
          className="border rounded p-2 w-full"
        />
        {errors.serialNumber && (
          <p className="text-red-500">{errors.serialNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="installDate">Install Date</label>
        <input
          id="installDate"
          type="date"
          {...register("installDate")}
          className="border rounded p-2 w-full"
        />
        {errors.installDate && (
          <p className="text-red-500">{errors.installDate.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          {...register("status")}
          className="border rounded p-2 w-full"
        >
          <option value="">Select status</option>
          <option value="Operational">Operational</option>
          <option value="Down">Down</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Retired">Retired</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default EquipmentForm;
