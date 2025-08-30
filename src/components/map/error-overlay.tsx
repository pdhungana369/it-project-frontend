interface ErrorOverlayProps {
  message: string;
}

export function ErrorOverlay({ message }: ErrorOverlayProps) {
  return (
    <div className="absolute left-4 top-4 z-10 rounded-md bg-danger px-3 py-2 text-white">
      {message}
    </div>
  );
}
