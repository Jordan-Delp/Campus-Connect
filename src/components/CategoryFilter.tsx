'use client';

const categories = ['Books', 'Furniture', 'Clothing', 'Electronics', 'Housing', 'Other'];

export default function CategoryFilter({
  selected,
  onChange,
  onReset,
}: {
  selected: string;
  onChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm md:text-base text-gray-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="" className="text-gray-700">
          All Categories
        </option>
        {categories.map((cat) => (
          <option
            key={cat}
            value={cat}
            className="text-gray-800 hover:bg-gray-100"
          >
            {cat}
          </option>
        ))}
      </select>

      {selected && (
        <button
          onClick={onReset}
          className="text-sm text-purple-600 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}
