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
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-white/10 bg-[#151515] px-5 py-3 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition [color-scheme:dark] focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
      >
        <option value="" className="bg-[#151515] text-white">
          All Categories
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-[#151515] text-white">
            {cat}
          </option>
        ))}
      </select>

      {selected && (
        <button
          onClick={onReset}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:border-violet-400/25 hover:bg-violet-500/10 hover:text-white"
        >
          Reset
        </button>
      )}
    </div>
  );
}
