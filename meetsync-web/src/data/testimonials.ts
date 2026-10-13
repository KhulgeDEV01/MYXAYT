import type { Testimonial } from '../types/content';

/**
 * DEMO testimonials — fictional people and organizations.
 * Replace with real, approved customer quotes before launch.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Манай хурлын үеэр өмнө нь олон санал хэлэгдэлгүй үлддэг байсан. Одоо хүн бүр санал, асуултаа шууд илэрхийлдэг болсон.',
    name: 'Б. Энхжаргал',
    role: 'Хүний нөөцийн захирал',
    organization: 'Демо Групп ХХК',
  },
  {
    id: 't2',
    quote:
      'Гишүүдийн их хурлын санал хураалтыг өмнө нь гараар тоолоход цаг их ордог байсан. Одоо үр дүн шууд дэлгэцэнд гарч, маргаан гарахгүй болсон.',
    name: 'Д. Ганбаатар',
    role: 'Гүйцэтгэх захирал',
    organization: 'Жишээ Мэргэжлийн Холбоо',
  },
  {
    id: 't3',
    quote:
      'Эрдмийн зөвлөлийн хурлын шийдвэр, санал хураалтын дүн бүгд нэг дор хадгалагддаг болсон нь тайлагнахад их хялбар болгосон.',
    name: 'С. Оюунчимэг',
    role: 'Сургалтын албаны дарга',
    organization: 'Туршилтын Их Сургууль',
  },
];
