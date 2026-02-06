export default function StatusBlock({ loading, error, onRetry }) {
  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error: {error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-black text-white rounded"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return null;
}
