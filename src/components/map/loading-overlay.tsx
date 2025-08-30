interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({
  message = 'Updating location...',
}: LoadingOverlayProps) {
  return (
    <div className="absolute left-4 top-4 z-10 rounded-md bg-white px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-light-gray border-t-primary" />
        <span>{message}</span>
      </div>
    </div>
  );
}
