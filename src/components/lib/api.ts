import type { Stock } from "../types/stock";
import axios from "axios";

const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
const baseUrl = import.meta.env.VITE_POLYGON_BASE_URL;

export async function fetchStockPrice(symbol: string) {
  const url = `${baseUrl}/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`;

  try {
    const { data } = await axios.get(url);

    if (!data.results || data.results.length === 0) {
      throw new Error("No stock data found");
    }

    const stock = data.results[0];
    const dailyChange = ((stock.c - stock.o) / stock.o) * 100;

    return {
      symbol,
      price: stock.c,
      dailyChange,
      quantity: 0,
    };
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
}

export async function buyStock(
  symbol: string,
  quantity: number
): Promise<Stock> {
  const stock = await fetchStockPrice(symbol);
  return {
    ...stock,
    quantity,
  };
}

export async function sellStock(
  symbol: string,
  quantity: number
): Promise<Stock> {
  const stock = await fetchStockPrice(symbol);
  return {
    ...stock,
    quantity,
  };
}
