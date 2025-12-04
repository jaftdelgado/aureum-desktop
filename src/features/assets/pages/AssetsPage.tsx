// src/features/assets/pages/AssetsPage.tsx
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@core/components/Table";

const AssetsPage: React.FC = () => {
  const assets = [
    { id: 1, name: "Laptop", category: "Electronics", value: "$1200" },
    { id: 2, name: "Monitor", category: "Electronics", value: "$300" },
    { id: 3, name: "Chair", category: "Furniture", value: "$150" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Assets Page</h1>

      <Table className="border rounded-lg">
        <TableCaption>Lista de activos</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.id}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>{asset.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total activos</TableCell>
            <TableCell>{assets.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AssetsPage;
