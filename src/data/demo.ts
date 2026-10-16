import type { ActivityEvent, Participant, PollOption, Submission } from '../types/domain';
import type { Localized } from '../i18n/types';

/**
 * demo.ts — Жишээ самбаруудын (нүүр хуудасны самбар, "Шууд хурал" хэсэг) ЖИШЭЭ өгөгдөл.
 *
 * Энэ нь жинхэнэ хэрэглэгчийн өгөгдөл биш, зөвхөн бүтээгдэхүүнийг харуулах зорилготой.
 * Сонголт, оролцогчдын `id` нь хэл бүрт ижил — ингэснээр хэл солиход
 * шууд явагдаж буй санал хураалтын төлөв хэвээр үлдэнэ.
 */

/** Нүүр хуудасны самбар дээр харагдах хурлын мэдээлэл. */
export interface HeroMeeting {
  label: string;
  title: string;
  type: string;
  time: string;
  elapsed: string;
  participants: number;
  pollNumber: number;
  question: string;
  passThreshold: number;
  counters: { questions: number; suggestions: number; requests: number };
}

/** Нэг хэл дээрх бүх жишээ өгөгдлийн бүтэц. */
export interface DemoContent {
  heroMeeting: HeroMeeting;
  /** 46 саналаас 36 / 7 / 3 → 78% / 15% / 7% */
  heroPollOptions: PollOption[];
  heroActivity: ActivityEvent[];
  heroAvatarNames: string[];
  showcaseTopic: string;
  showcaseQuestion: string;
  /** Эхэндээ 16 + 5 + 2 = 23 санал; загварчлал үргэлжлүүлэн нэмнэ. */
  showcasePollOptions: PollOption[];
  showcaseParticipants: Participant[];
  showcaseSubmissions: Submission[];
}

/** "Шууд хурал" хэсгийн санал өгөх эрхтэй хүний тоо (загварчлал энд хүрээд зогсоно). */
export const showcaseEligible = 34;
/** Загварчлалын санал аль сонголт руу орох магадлалын харьцаа: дэмжсэн 6 : эсэргүүцсэн 2 : түдгэлзсэн 1. */
export const showcaseVoteWeights = [6, 2, 1];

/** Хэлнээс хамаарахгүй тоон утгууд (хоёр хэлэнд хуваалцана). */
const meetingNumbers = {
  time: '10:00 – 11:30',
  elapsed: '00:42:18',
  participants: 48,
  pollNumber: 3,
  passThreshold: 50,
  counters: { questions: 12, suggestions: 9, requests: 4 },
};

/** Хэл бүрийн жишээ өгөгдөл. */
export const demoContent: Localized<DemoContent> = {
  mn: {
    heroMeeting: {
      ...meetingNumbers,
      label: 'ХУРАЛ',
      title: '2026 оны 10-р сарын стратегийн хурал',
      type: 'Удирдлагын хурал',
      question: 'Шинэ төслийг эхлүүлэхийг дэмжиж байна уу?',
    },
    heroPollOptions: [
      { id: 'yes', label: 'Дэмжиж байна', votes: 36, tone: 'positive' },
      { id: 'no', label: 'Татгалзаж байна', votes: 7, tone: 'negative' },
      { id: 'abstain', label: 'Түдгэлзсэн', votes: 3, tone: 'neutral' },
    ],
    heroActivity: [
      { id: 'a1', type: 'vote', actorName: 'Б.Анужин', message: 'санал өглөө', timeLabel: 'дөнгөж сая' },
      { id: 'a2', type: 'question', actorName: 'Г.Тэмүүлэн', message: 'асуулт илгээв: “Төсвийг хэдэн үе шаттай хуваарилах вэ?”', timeLabel: '8 сек' },
      { id: 'a3', type: 'suggestion', actorName: 'Д.Солонго', message: 'санал оруулав', timeLabel: '21 сек' },
      { id: 'a4', type: 'join', actorName: 'Э.Батзориг', message: 'хуралд нэгдлээ', timeLabel: '35 сек' },
      { id: 'a5', type: 'request', actorName: 'Н.Мөнхзул', message: 'үг хэлэх хүсэлт илгээв', timeLabel: '48 сек' },
      { id: 'a6', type: 'vote', actorName: 'О.Хулан', message: 'санал өглөө', timeLabel: '1 мин' },
      { id: 'a7', type: 'question', actorName: 'П.Ариунболд', message: 'асуулт илгээв: “Хэрэгжүүлэх баг хэзээ бүрдэх вэ?”', timeLabel: '1 мин' },
    ],
    heroAvatarNames: ['Бат Ганзориг', 'Оюун Дорж', 'Сараа Бат', 'Тэмүүжин Энх'],
    showcaseTopic: 'Шинэ салбар нээх асуудал',
    showcaseQuestion: 'Шинэ салбар нээх саналыг дэмжиж байна уу?',
    showcasePollOptions: [
      { id: 'support', label: 'Дэмжиж байна', votes: 16, tone: 'positive' },
      { id: 'oppose', label: 'Дэмжихгүй', votes: 5, tone: 'negative' },
      { id: 'abstain', label: 'Түдгэлзсэн', votes: 2, tone: 'neutral' },
    ],
    showcaseParticipants: [
      { id: 'p1', name: 'Ганзориг Бат', role: 'organizer', title: 'Гүйцэтгэх захирал', isSpeaking: true },
      { id: 'p2', name: 'Оюун Дорж', role: 'participant', title: 'Санхүүгийн захирал' },
      { id: 'p3', name: 'Тэмүүжин Энх', role: 'participant', title: 'Борлуулалт', isMuted: true },
      { id: 'p4', name: 'Сарангэрэл Б', role: 'participant', title: 'Хүний нөөц' },
      { id: 'p5', name: 'Мөнх-Эрдэнэ Г', role: 'participant', title: 'Үйл ажиллагаа', isMuted: true },
      { id: 'p6', name: 'Нандин Цэрэн', role: 'observer', title: 'Хуулийн зөвлөх', isMuted: true },
    ],
    showcaseSubmissions: [
      { id: 'q1', meetingId: 'demo', kind: 'question', authorName: 'Оюун Дорж', body: 'Шинэ салбарын эхний жилийн зардлыг ямар эх үүсвэрээс санхүүжүүлэх вэ?', upvotes: 14, status: 'discussing', createdAt: '10:24' },
      { id: 'q2', meetingId: 'demo', kind: 'question', authorName: 'Нэрээ нууцалсан', body: 'Одоогийн ажилтнуудаас шилжин ажиллах хүмүүсийг хэрхэн сонгох вэ?', upvotes: 9, status: 'pending', createdAt: '10:27' },
      { id: 'q3', meetingId: 'demo', kind: 'question', authorName: 'Тэмүүжин Энх', body: 'Байршлын судалгааг хэн хийсэн бэ?', upvotes: 4, status: 'answered', createdAt: '10:19' },
      { id: 's1', meetingId: 'demo', kind: 'suggestion', authorName: 'Сарангэрэл Б', body: 'Эхний 6 сард туршилтын горимоор ажиллуулж, дараа нь бүрэн нээвэл эрсдэл бага байна.', upvotes: 11, status: 'pending', createdAt: '10:26' },
      { id: 's2', meetingId: 'demo', kind: 'suggestion', authorName: 'Мөнх-Эрдэнэ Г', body: 'Салбарын менежерийг дотоодоос сонгон шалгаруулах нь зүйтэй.', upvotes: 6, status: 'pending', createdAt: '10:29' },
      { id: 'r1', meetingId: 'demo', kind: 'request', authorName: 'Нандин Цэрэн', body: 'Түрээсийн гэрээний төслийг хурлын материалд нэмж өгнө үү.', upvotes: 0, status: 'resolved', createdAt: '10:15' },
      { id: 'r2', meetingId: 'demo', kind: 'request', authorName: 'Оюун Дорж', body: 'Санхүүгийн тооцооны талаар 3 минут үг хэлэх хүсэлтэй байна.', upvotes: 0, status: 'pending', createdAt: '10:30' },
    ],
  },
  en: {
    heroMeeting: {
      ...meetingNumbers,
      label: 'MEETING',
      title: 'October 2026 Strategy Meeting',
      type: 'Management meeting',
      question: 'Do you support launching the new project?',
    },
    heroPollOptions: [
      { id: 'yes', label: 'In favor', votes: 36, tone: 'positive' },
      { id: 'no', label: 'Against', votes: 7, tone: 'negative' },
      { id: 'abstain', label: 'Abstain', votes: 3, tone: 'neutral' },
    ],
    heroActivity: [
      { id: 'a1', type: 'vote', actorName: 'B. Anujin', message: 'cast a vote', timeLabel: 'just now' },
      { id: 'a2', type: 'question', actorName: 'G. Temuulen', message: 'asked: “How many phases will the budget be split into?”', timeLabel: '8 sec' },
      { id: 'a3', type: 'suggestion', actorName: 'D. Solongo', message: 'added a suggestion', timeLabel: '21 sec' },
      { id: 'a4', type: 'join', actorName: 'E. Batzorig', message: 'joined the meeting', timeLabel: '35 sec' },
      { id: 'a5', type: 'request', actorName: 'N. Munkhzul', message: 'requested the floor', timeLabel: '48 sec' },
      { id: 'a6', type: 'vote', actorName: 'O. Khulan', message: 'cast a vote', timeLabel: '1 min' },
      { id: 'a7', type: 'question', actorName: 'P. Ariunbold', message: 'asked: “When will the delivery team be formed?”', timeLabel: '1 min' },
    ],
    heroAvatarNames: ['Bat Ganzorig', 'Oyun Dorj', 'Saraa Bat', 'Temuujin Enkh'],
    showcaseTopic: 'Opening a new branch',
    showcaseQuestion: 'Do you support the proposal to open a new branch?',
    showcasePollOptions: [
      { id: 'support', label: 'Support', votes: 16, tone: 'positive' },
      { id: 'oppose', label: 'Oppose', votes: 5, tone: 'negative' },
      { id: 'abstain', label: 'Abstain', votes: 2, tone: 'neutral' },
    ],
    showcaseParticipants: [
      { id: 'p1', name: 'Ganzorig Bat', role: 'organizer', title: 'CEO', isSpeaking: true },
      { id: 'p2', name: 'Oyun Dorj', role: 'participant', title: 'CFO' },
      { id: 'p3', name: 'Temuujin Enkh', role: 'participant', title: 'Sales', isMuted: true },
      { id: 'p4', name: 'Sarangerel B', role: 'participant', title: 'HR' },
      { id: 'p5', name: 'Munkh-Erdene G', role: 'participant', title: 'Operations', isMuted: true },
      { id: 'p6', name: 'Nandin Tseren', role: 'observer', title: 'Legal counsel', isMuted: true },
    ],
    showcaseSubmissions: [
      { id: 'q1', meetingId: 'demo', kind: 'question', authorName: 'Oyun Dorj', body: 'Which funding source will cover the new branch’s first-year costs?', upvotes: 14, status: 'discussing', createdAt: '10:24' },
      { id: 'q2', meetingId: 'demo', kind: 'question', authorName: 'Anonymous', body: 'How will we choose which current employees transfer to the branch?', upvotes: 9, status: 'pending', createdAt: '10:27' },
      { id: 'q3', meetingId: 'demo', kind: 'question', authorName: 'Temuujin Enkh', body: 'Who carried out the location study?', upvotes: 4, status: 'answered', createdAt: '10:19' },
      { id: 's1', meetingId: 'demo', kind: 'suggestion', authorName: 'Sarangerel B', body: 'Running it as a pilot for the first 6 months before a full launch would reduce the risk.', upvotes: 11, status: 'pending', createdAt: '10:26' },
      { id: 's2', meetingId: 'demo', kind: 'suggestion', authorName: 'Munkh-Erdene G', body: 'The branch manager should be selected internally.', upvotes: 6, status: 'pending', createdAt: '10:29' },
      { id: 'r1', meetingId: 'demo', kind: 'request', authorName: 'Nandin Tseren', body: 'Please add the draft lease agreement to the meeting materials.', upvotes: 0, status: 'resolved', createdAt: '10:15' },
      { id: 'r2', meetingId: 'demo', kind: 'request', authorName: 'Oyun Dorj', body: 'I’d like 3 minutes to speak about the financial projections.', upvotes: 0, status: 'pending', createdAt: '10:30' },
    ],
  },
};
