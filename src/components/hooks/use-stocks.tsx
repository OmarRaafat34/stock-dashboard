import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStockPrice, buyStock, sellStock } from "../lib/api";
import type { Stock } from "../types/stock";
import { toast } from "sonner";
import { stockSymbols } from "../../constants/stockSymbols";

export function useStocks() {
  const queryClient = useQueryClient();

  const { data: stocks, isLoading } = useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: async () => {
      const stockPrices = await Promise.all(
        stockSymbols.map((symbol) => fetchStockPrice(symbol))
      );

      return stockPrices.map((stock) => ({
        symbol: stock.symbol,
        price: stock.price,
        change: stock.dailyChange,
        quantity: 0,
      }));
    },
    staleTime: 60000,
  });

  const buyStockMutation = useMutation({
    mutationFn: (params: { symbol: string; quantity: number }) =>
      buyStock(params.symbol, params.quantity),
    onSuccess: (newStock) => {
      queryClient.setQueryData<Stock[]>(["stocks"], (old) => {
        if (!old) return [newStock];
        return old.map((stock) =>
          stock.symbol === newStock.symbol
            ? { ...stock, quantity: stock.quantity + newStock.quantity }
            : stock
        );
      });
      toast("Purchase Successful");
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });

  const sellStockMutation = useMutation({
    mutationFn: (params: { symbol: string; quantity: number }) =>
      sellStock(params.symbol, params.quantity),
    onSuccess: (updatedStock) => {
      queryClient.setQueryData<Stock[]>(["stocks"], (old) => {
        if (!old) return [];
        return old.map((stock) =>
          stock.symbol === updatedStock.symbol
            ? { ...stock, quantity: stock.quantity - updatedStock.quantity }
            : stock
        );
      });
      toast("Stock sold successfully");
    },
    onError: (error: Error) => {
      toast(error.message);
    },
  });

  return {
    stocks,
    isLoading,
    buyStock: buyStockMutation.mutate,
    sellStock: sellStockMutation.mutate,
  };
}
