import Button from "../components/ui/Button";
import Page from "../components/Page";

export default function StatusBlock({ loading, error, onRetry }) {
  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <Page>
      <div className="text-red-500">
        <p>Error: {error}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-black text-white rounded"
          >
            Retry
          </Button>
        )}
      </div>
      </Page>
    );
  }

  return null;
}
