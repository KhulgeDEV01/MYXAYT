export default function PageLoader() {
  return (
    <div role="status" className="flex min-h-[60vh] items-center justify-center">
      <span className="size-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" aria-hidden="true" />
      <span className="sr-only">Ачаалж байна…</span>
    </div>
  );
}
