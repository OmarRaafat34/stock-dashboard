import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const PageHeader = ({
  header,
  action,
  refresh,
  onRefetch,
}: {
  header: {
    title: string;
    description?: string;
  };
  refresh?: boolean;
  action?: React.ReactNode;
  onRefetch?: () => void;
}) => {
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      const time = new Date();
      setLastUpdate(
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  }, [isLoading]);

  const refreshClickHandler = () => {
    setIsLoading(true);
    onRefetch?.();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex justify-between items-center mt-4 mb-10">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold">{header.title}</h3>
        {header.description && (
          <p className="text-md text-muted-foreground">{header.description}</p>
        )}
      </div>
      {refresh && (
        <button
          onClick={refreshClickHandler}
          disabled={isLoading}
          className="flex items-center gap-2"
          type="button"
        >
          <div className={`${isLoading ? "animate-spin" : ""}`}>
            <RefreshCcw color="#5541ec" size={24} />
          </div>
          {isLoading ? (
            <span className="text-xs text-black">Getting latest update...</span>
          ) : (
            <div className="flex flex-col">
              <span className="text-xs text-black">{`Last update at: ${lastUpdate}`}</span>
              <span className="text-xs text-gray-500 hover:text-gray-700 text-left">
                Tap to refresh
              </span>
            </div>
          )}
        </button>
      )}
      {action}
    </div>
  );
};

export default PageHeader;
