import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { routes } from '../config/routes';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({ title: 'Хуудас олдсонгүй', noIndex: true });

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-4xl font-semibold">Хуудас олдсонгүй</h1>
      <p className="mt-4 max-w-md text-slate-600">Таны хайсан хуудас устсан, нэр нь өөрчлөгдсөн эсвэл түр ажиллахгүй байж магадгүй.</p>
      <Button to={routes.home} iconLeft={ArrowLeft} className="mt-8">
        Нүүр хуудас руу буцах
      </Button>
    </Container>
  );
}
