import React from "react";
import type { HistoryItem } from "../hooks/types";

interface Props {
  assetName: string;
  assetSymbol: string;
  movements: HistoryItem[];
  onClose: () => void;
}

export const AssetMovementsList: React.FC<Props> = ({ assetName, assetSymbol, movements, onClose }) => {
  return (
    <div className="mt-6 bg-surface-1 rounded-lg border border-border p-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
        <div>
          <h3 className="text-lg font-bold text-text-primary">
            Historial de {assetSymbol}
          </h3>
          <p className="text-sm text-text-secondary">{assetName}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          Cerrar ✕
        </button>
      </div>

      {movements.length === 0 ? (
        <p className="text-text-secondary text-sm">No hay movimientos registrados para este activo.</p>
      ) : (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {movements.map((mov) => (
            <div 
              key={mov.movementId} 
              className="flex flex-col p-3 rounded bg-background border border-border hover:border-primaryBtn/50 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  mov.type === 'Compra' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {mov.type.toUpperCase()}
                </span>
                <span className="text-xs text-text-secondary">
                  {new Date(mov.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-text-secondary">Precio</div>
                  <div className="font-mono text-sm">${mov.price.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-secondary">Cantidad</div>
                  <div className="font-mono text-sm font-semibold">{mov.quantity}</div>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-dashed border-border flex justify-between">
                <span className="text-xs text-text-secondary">Total Operación:</span>
                <span className="text-xs font-bold">${mov.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};