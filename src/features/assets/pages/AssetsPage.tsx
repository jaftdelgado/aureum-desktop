import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { Chip } from "@core/ui/Chip";
import DataTable from "@core/components/table/DataTable";
import type { Column } from "@core/components/table/DataTable";
import { useAssetsList } from "../hooks/useAssetsList";
import { useAssetsFilters } from "../hooks/useAssetsFilters";
import { useDebounce } from "../hooks/useDebounce";
import type { Asset } from "@domain/entities/Asset";

export default function AssetsPage() {
  const { t } = useTranslation("assets");
  const navigate = useNavigate();

  const { page, perPage, setPage, setSearch } = useAssetsFilters();
  const { data, isLoading, error } = useAssetsList();
  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 400);

  // 🔹 Actualizar búsqueda cuando cambie el input
  useEffect(() => {
    if (debouncedInput.length >= 2 || debouncedInput.length === 0) {
      setSearch(debouncedInput);
      setPage(1); // Reinicia a la primera página al buscar
    }
  }, [debouncedInput, setSearch, setPage]);

  const columns: Column<Asset>[] = [
    {
      key: "assetName",
      header: "Activo",
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.assetPicUrl && (
            <img
              src={row.assetPicUrl}
              alt={row.assetName}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span>{row.assetName}</span>
        </div>
      ),
    },
    { key: "assetSymbol", header: "Símbolo", sortable: true },
    {
      key: "assetType",
      header: "Tipo / Categoría",
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          {row.category && (
            <Chip variant="default">{t(`assetType.${row.assetType}`)}</Chip>
          )}
          <Chip variant="secondary">
            {row.category ? t(`assetCategory.${row.category.name}`) : "-"}
          </Chip>
        </div>
      ),
    },
    { key: "basePrice", header: "Precio", sortable: true },
  ];

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <PageHeader
        title="Assets"
        description="Lista de todos los assets disponibles"
        actions={
          <Button
            variant="default"
            icon="lucide:plus"
            className="px-4 py-2"
            onClick={() => navigate("/dashboard/assets/register")}
          >
            Nuevo Asset
          </Button>
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          Error al cargar los assets
        </div>
      )}

      <div className="flex flex-1 w-full flex-col md:flex-row min-h-0">
        {/* Sidebar vacío */}
        <div className="w-full md:w-[30%] flex items-center justify-center border-r border-outline"></div>

        {/* Tabla */}
        <div className="w-full md:w-[70%] flex flex-col h-full min-h-0">
          <div className="flex-1 overflow-x-hidden">
            <DataTable<Asset>
              data={data?.data}
              columns={columns}
              pagination
              page={page}
              perPage={perPage}
              onPageChange={setPage}
              search
              loading={isLoading}
              onRowClick={(row) => console.log("Fila clickeada:", row)}
              onQueryChange={setInput}
              total={data?.meta.totalItems ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
