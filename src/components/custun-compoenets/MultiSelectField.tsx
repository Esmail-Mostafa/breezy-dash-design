import { useField } from "formik";
import { Label } from "@/components/ui/label";

function MultiSelectField({ name, label, options = [] }: any) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    helpers.setValue(selectedValues);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <input
        type="text"
        value={field.value}
        className="mt-1 p-2 block w-full h-40 rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <select
        id={name}
        multiple={true}
        value={field.value}
        onChange={handleChange}
        className="mt-1 p-2 block w-full h-40 rounded-md border border-input bg-background text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MultiSelectField;
