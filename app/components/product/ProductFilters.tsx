import { useSearchParams } from "@remix-run/react";
import { cn } from "~/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categoria") || "";

  function handleFilter(slug: string) {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("categoria", slug);
    } else {
      params.delete("categoria");
    }
    setSearchParams(params);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter("")}
        className={cn(
          "px-4 py-2 text-sm font-heading font-medium rounded-full transition-colors",
          !activeCategory
            ? "bg-fire-600 text-white"
            : "bg-obsidian-800 text-obsidian-300 hover:bg-obsidian-700"
        )}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleFilter(cat.slug)}
          className={cn(
            "px-4 py-2 text-sm font-heading font-medium rounded-full transition-colors",
            activeCategory === cat.slug
              ? "bg-fire-600 text-white"
              : "bg-obsidian-800 text-obsidian-300 hover:bg-obsidian-700"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
