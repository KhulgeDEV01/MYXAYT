/**
 * faq.ts — "Түгээмэл асуулт" (FAQ) хэсгийн асуулт, хариултууд.
 *
 * Текст засах: доорх `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 * Хоёр хэлэнд ижил `id`-тай байх ёстой.
 */
import type { FaqItem } from '../types/content';
import type { Localized } from '../i18n/types';

export const faqItems: Localized<FaqItem[]> = {
  mn: [
    {
      id: 'create-meeting',
      question: 'Онлайн хурал хэрхэн үүсгэх вэ?',
      answer: 'Бүртгэлдээ нэвтэрч “Шинэ хурал” товчийг дарна. Хурлын нэр, огноо, хэлэлцэх асуудал, материалаа оруулаад хадгалахад хурал бэлэн болно. Хэлэлцэх асуудал бүрт санал хураалтыг урьдчилан бэлдэж болно.',
    },
    {
      id: 'join',
      question: 'Оролцогчид хэрхэн нэгдэх вэ?',
      answer: 'Оролцогч имэйлээр ирсэн урилга эсвэл хурлын холбоосоор нэгдэнэ. Компьютер, гар утас, таблетын хөтчөөр шууд нэвтрэх боломжтой тул нэмэлт програм суулгах шаардлагагүй.',
    },
    {
      id: 'voting',
      question: 'Санал хураалтыг хэрхэн хийх вэ?',
      answer: 'Зохион байгуулагч хэлэлцэж буй асуудал дээр санал хураалт эхлүүлэхэд оролцогч бүрийн дэлгэцэнд сонголтууд гарч ирнэ. Оролцогч нэг товшилтоор санал өгөх ба санал хураалтыг ил эсвэл нууц горимоор явуулж болно.',
    },
    {
      id: 'results-visibility',
      question: 'Санал хураалтын үр дүнг хэн харах вэ?',
      answer: 'Үүнийг зохион байгуулагч тохируулна. Үр дүнг бүх оролцогчдод бодит цагт харуулах, санал хураалт дууссаны дараа нээх, эсвэл зөвхөн зохион байгуулагчид харуулах сонголттой.',
    },
    {
      id: 'capacity',
      question: 'Хуралд хэдэн хүн оролцож болох вэ?',
      answer: 'Оролцогчийн тоо сонгосон багцаас хамаарна: Free багцад 25, Pro-д 150, Business-д 500 хүртэл. Enterprise багцад оролцогчийн тоог байгууллагын хэрэгцээнд тохируулна.',
    },
    {
      id: 'opinions',
      question: 'Санал бодлоо хэрхэн илэрхийлэх вэ?',
      answer: 'Хурлын үеэр оролцогч асуулт, санал, хүсэлтээ тусгай самбараар бичиж илгээнэ. Бусад оролцогчдын асуултыг дэмжиж эрэмбэлэх боломжтой бөгөөд зохион байгуулагч зөвшөөрсөн бол нэрээ нууцлан бичиж болно.',
    },
    {
      id: 'storage',
      question: 'Хурлын мэдээлэл хадгалагдах уу?',
      answer: 'Тийм. Хурлын материал, санал хураалтын дүн, асуулт, хүсэлт, гарсан шийдвэрүүд хурлын түүхэнд хадгалагдана. Хадгалах хугацаа сонгосон багцаас хамаарна.',
    },
    {
      id: 'enterprise',
      question: 'Байгууллагад зориулсан багц бий юу?',
      answer: 'Business болон Enterprise багц нь олон баг, хэлтэстэй байгууллагад зориулагдсан. Эрхийн нарийвчилсан тохиргоо, тайлан, байгууллагын хяналтын самбар, хариуцсан менежерийн дэмжлэгтэй.',
    },
  ],
  en: [
    {
      id: 'create-meeting',
      question: 'How do I create an online meeting?',
      answer: 'Log in and click “New meeting”. Enter the title, date, agenda and materials, then save — your meeting is ready. You can prepare votes for each agenda item in advance.',
    },
    {
      id: 'join',
      question: 'How do participants join?',
      answer: 'Participants join through an email invitation or the meeting link. It works directly in the browser on a computer, phone or tablet, so there is nothing to install.',
    },
    {
      id: 'voting',
      question: 'How does voting work?',
      answer: 'When the organizer starts a vote on the current agenda item, the options appear on every participant’s screen. Participants vote with a single tap, and votes can be run as open or secret ballots.',
    },
    {
      id: 'results-visibility',
      question: 'Who can see the voting results?',
      answer: 'The organizer decides. Results can be shown to everyone in real time, revealed after the vote closes, or shown to organizers only.',
    },
    {
      id: 'capacity',
      question: 'How many people can join a meeting?',
      answer: 'It depends on your plan: up to 25 on Free, 150 on Pro and 500 on Business. On Enterprise, the participant limit is set to fit your organization.',
    },
    {
      id: 'opinions',
      question: 'How do participants share their views?',
      answer: 'During the meeting, participants submit questions, suggestions and requests from a dedicated panel. They can upvote others’ questions, and post anonymously if the organizer allows it.',
    },
    {
      id: 'storage',
      question: 'Is meeting information saved?',
      answer: 'Yes. Materials, voting results, questions, requests and decisions are kept in the meeting history. How long they are kept depends on your plan.',
    },
    {
      id: 'enterprise',
      question: 'Do you have plans for organizations?',
      answer: 'The Business and Enterprise plans are built for organizations with many teams and departments. They include advanced permissions, reports, an organization dashboard and support from a dedicated manager.',
    },
  ],
};
