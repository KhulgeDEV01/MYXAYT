import type { Testimonial } from '../types/content';
import type { Localized } from '../i18n/types';

/**
 * testimonials.ts — Хэрэглэгчдийн сэтгэгдэл.
 *
 * ЖИШЭЭ: Хүмүүс, байгууллагууд нь зохиомол. Сайтаа нийтлэхээс өмнө жинхэнэ,
 * зөвшөөрөл авсан харилцагчдын сэтгэгдлээр солино уу.
 * Текст засах: `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 */
export const testimonials: Localized<Testimonial[]> = {
  mn: [
    {
      id: 't1',
      quote: 'Манай хурлын үеэр өмнө нь олон санал хэлэгдэлгүй үлддэг байсан. Одоо хүн бүр санал, асуултаа шууд илэрхийлдэг болсон.',
      name: 'Б. Энхжаргал',
      role: 'Хүний нөөцийн захирал',
      organization: 'Демо Групп ХХК',
    },
    {
      id: 't2',
      quote: 'Гишүүдийн их хурлын санал хураалтыг өмнө нь гараар тоолоход цаг их ордог байсан. Одоо үр дүн шууд дэлгэцэнд гарч, маргаан гарахгүй болсон.',
      name: 'Д. Ганбаатар',
      role: 'Гүйцэтгэх захирал',
      organization: 'Жишээ Мэргэжлийн Холбоо',
    },
    {
      id: 't3',
      quote: 'Эрдмийн зөвлөлийн хурлын шийдвэр, санал хураалтын дүн бүгд нэг дор хадгалагддаг болсон нь тайлагнахад их хялбар болгосон.',
      name: 'С. Оюунчимэг',
      role: 'Сургалтын албаны дарга',
      organization: 'Туршилтын Их Сургууль',
    },
  ],
  en: [
    {
      id: 't1',
      quote: 'A lot of ideas used to go unsaid in our meetings. Now everyone shares their suggestions and questions directly.',
      name: 'B. Enkhjargal',
      role: 'HR Director',
      organization: 'Demo Group LLC',
    },
    {
      id: 't2',
      quote: 'Counting votes by hand at our general assembly used to take ages. Now results appear on screen instantly, and there are no disputes.',
      name: 'D. Ganbaatar',
      role: 'Executive Director',
      organization: 'Sample Professional Association',
    },
    {
      id: 't3',
      quote: 'Having every academic council decision and vote result stored in one place has made reporting much easier.',
      name: 'S. Oyunchimeg',
      role: 'Head of Academic Affairs',
      organization: 'Pilot University',
    },
  ],
};
