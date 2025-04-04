import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import type { Stock } from "../types/stock";
import { BuySellModal } from "../BuySellModal";

interface StockTableProps {
  stocks?: Stock[];
  isLoading: boolean;
  error?: Error;
}

export function StockTable({ stocks }: StockTableProps) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [action, setAction] = useState<"buy" | "sell">("buy");

  return (
    <div className="rounded-md border border-[#f1f3f5]">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f8fafc]">
            <TableHead>Symbol</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Daily Change</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks ? (
            stocks?.map((stock) => (
              <TableRow
                key={stock.symbol}
                className="hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer border border-[#f1f3f5]"
              >
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>${stock?.price?.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    (stock.change ?? 0) >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {(stock.change ?? 0) >= 0 ? "+" : ""}
                  {(stock.change ?? 0).toFixed(2)}%
                </TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => {
                        setSelectedStock(stock);
                        setAction("buy");
                      }}
                    >
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedStock(stock);
                        setAction("sell");
                      }}
                      disabled={stock.quantity <= 0}
                    >
                      Sell
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Problem with the API please refresh the page
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedStock && (
        <BuySellModal
          stock={selectedStock}
          action={action}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
}
