import { useI18n } from '../../i18n/useI18n';

export default function PageLoader() {
  const { t } = useI18n();
  return (
    <div role="status" className="flex min-h-[60vh] items-center justify-center">
      <span className="size-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" aria-hidden="true" />
      <span className="sr-only">{t.common.loading}</span>
    </div>
  );
}
