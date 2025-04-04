import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "../../components/layout/PageHeader";
import { StockTable } from "../../components/Table";
import { useStocks } from "../../components/hooks/use-stocks";
import { Skeleton } from "../../components/ui/skeleton";

export const Route = createFileRoute("/stocks/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { stocks, isLoading } = useStocks();

  return (
    <div className="h-screen flex flex-col">
      <PageHeader header={{ title: "Stocks" }} />
      {isLoading ? (
        <Skeleton className="h-96 w-full bg-gray-200" />
      ) : (
        <StockTable stocks={stocks} isLoading={isLoading} />
      )}
    </div>
  );
}
