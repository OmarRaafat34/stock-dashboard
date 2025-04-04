import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStocks } from "../hooks/use-stocks";
import { Label } from "../ui/label";
import type { Stock } from "../types/stock";
import { toast } from "sonner";

interface BuySellModalProps {
  stock: Stock;
  action: "buy" | "sell";
  onClose: () => void;
}

export function BuySellModal({ stock, action, onClose }: BuySellModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { buyStock, sellStock, stocks } = useStocks();

  const latestStock = stocks?.find((s) => s.symbol === stock.symbol) ?? stock;

  const handleSubmit = () => {
    if (quantity <= 0) return;

    if (action === "buy") {
      buyStock({ symbol: latestStock.symbol, quantity });
    } else {
      if (quantity > latestStock.quantity) {
        toast(
          `You can't sell more shares than you own (${latestStock.quantity})`
        );
        return;
      }
      sellStock({ symbol: latestStock.symbol, quantity });
    }

    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "buy" ? "Buy" : "Sell"} {latestStock.symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label>Current Price</Label>
            <p>${latestStock.price.toFixed(2)}</p>
          </div>

          {action === "sell" && (
            <div className="grid gap-2">
              <Label>Available Shares</Label>
              <p>{latestStock.quantity}</p>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              min="1"
              max={action === "sell" ? latestStock.quantity : undefined}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            />
          </div>

          <div className="grid gap-2">
            <Label>Total Value</Label>
            <p>${(latestStock.price * quantity).toFixed(2)}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={handleSubmit}>
              {" "}
              {action === "buy" ? "Buy" : "Sell"}{" "}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
