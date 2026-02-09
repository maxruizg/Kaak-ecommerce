import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import { prisma } from "~/lib/db.server";
import { formatCurrency } from "~/lib/utils";
import { Button } from "~/components/ui/Button";
import { Badge } from "~/components/ui/Badge";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("q") || "";

    const products = await prisma.product.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { sku: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      include: {
        category: { select: { name: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    });

    return json({ products, search });
  } catch (error) {
    console.error("admin.productos._index loader error:", error);
    return json({ products: [], search: "" });
  }
}

export default function AdminProductsIndex() {
  const { products, search } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-obsidian-900">
          Productos
        </h1>
        <Link to="/admin/productos/nuevo">
          <Button>+ Nuevo Producto</Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const q = formData.get("q") as string;
            if (q) {
              setSearchParams({ q });
            } else {
              setSearchParams({});
            }
          }}
        >
          <input
            name="q"
            defaultValue={search}
            placeholder="Buscar por nombre o SKU..."
            className="w-full max-w-md rounded-lg border border-obsidian-300 bg-white px-4 py-2.5 text-obsidian-900 placeholder:text-obsidian-400 focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/20"
          />
        </form>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-obsidian-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-obsidian-200 bg-obsidian-50">
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Producto</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">SKU</th>
                <th className="text-left px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Categoría</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Precio</th>
                <th className="text-center px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Estado</th>
                <th className="text-right px-6 py-3 text-xs font-heading font-semibold text-obsidian-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-obsidian-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-obsidian-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-obsidian-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.images[0] ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-obsidian-300 text-xs">N/A</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-obsidian-900">{product.name}</p>
                        {product.mayaName && <p className="text-xs text-obsidian-400 italic">{product.mayaName}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-obsidian-600">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-obsidian-600">{product.category.name}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium text-obsidian-900">{formatCurrency(product.basePrice)}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={product.isActive ? "jade" : "default"}>
                      {product.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/productos/${product.id}`}
                      className="text-sm text-fire-600 hover:text-fire-700 font-medium transition-colors"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="p-8 text-center text-obsidian-500">
            {search ? `No se encontraron productos para "${search}".` : "No hay productos."}
          </div>
        )}
      </div>
    </div>
  );
}
