import type { ActivityEvent, Participant, PollOption, Submission } from '../types/domain';

/**
 * DEMO data for product mockups on the marketing site (hero dashboard,
 * meeting showcase, participation panel). Not real user data.
 */

export const heroMeeting = {
  label: 'ХУРАЛ',
  title: '2026 оны 10-р сарын стратегийн хурал',
  type: 'Удирдлагын хурал',
  time: '10:00 – 11:30',
  elapsed: '00:42:18',
  participants: 48,
  pollNumber: 3,
  question: 'Шинэ төслийг эхлүүлэхийг дэмжиж байна уу?',
  passThreshold: 50,
  counters: { questions: 12, suggestions: 9, requests: 4 },
};

/** 36 / 7 / 3 of 46 votes → 78% / 15% / 7% */
export const heroPollOptions: PollOption[] = [
  { id: 'yes', label: 'Дэмжиж байна', votes: 36, tone: 'positive' },
  { id: 'no', label: 'Татгалзаж байна', votes: 7, tone: 'negative' },
  { id: 'abstain', label: 'Түдгэлзсэн', votes: 3, tone: 'neutral' },
];

export const heroActivity: ActivityEvent[] = [
  { id: 'a1', type: 'vote', actorName: 'Б.Анужин', message: 'санал өглөө', timeLabel: 'дөнгөж сая' },
  {
    id: 'a2',
    type: 'question',
    actorName: 'Г.Тэмүүлэн',
    message: 'асуулт илгээв: “Төсвийг хэдэн үе шаттай хуваарилах вэ?”',
    timeLabel: '8 сек',
  },
  { id: 'a3', type: 'suggestion', actorName: 'Д.Солонго', message: 'санал оруулав', timeLabel: '21 сек' },
  { id: 'a4', type: 'join', actorName: 'Э.Батзориг', message: 'хуралд нэгдлээ', timeLabel: '35 сек' },
  { id: 'a5', type: 'request', actorName: 'Н.Мөнхзул', message: 'үг хэлэх хүсэлт илгээв', timeLabel: '48 сек' },
  { id: 'a6', type: 'vote', actorName: 'О.Хулан', message: 'санал өглөө', timeLabel: '1 мин' },
  {
    id: 'a7',
    type: 'question',
    actorName: 'П.Ариунболд',
    message: 'асуулт илгээв: “Хэрэгжүүлэх баг хэзээ бүрдэх вэ?”',
    timeLabel: '1 мин',
  },
];

export const showcaseTopic = 'Шинэ салбар нээх асуудал';
export const showcaseQuestion = 'Шинэ салбар нээх саналыг дэмжиж байна уу?';
export const showcaseEligible = 34;

/** 16 + 5 + 2 = 23 votes at start; the simulation keeps adding. */
export const showcasePollOptions: PollOption[] = [
  { id: 'support', label: 'Дэмжиж байна', votes: 16, tone: 'positive' },
  { id: 'oppose', label: 'Дэмжихгүй', votes: 5, tone: 'negative' },
  { id: 'abstain', label: 'Түдгэлзсэн', votes: 2, tone: 'neutral' },
];
export const showcaseVoteWeights = [6, 2, 1];

export const showcaseParticipants: Participant[] = [
  { id: 'p1', name: 'Ганзориг Бат', role: 'organizer', title: 'Гүйцэтгэх захирал', isSpeaking: true },
  { id: 'p2', name: 'Оюун Дорж', role: 'participant', title: 'Санхүүгийн захирал' },
  { id: 'p3', name: 'Тэмүүжин Энх', role: 'participant', title: 'Борлуулалт', isMuted: true },
  { id: 'p4', name: 'Сарангэрэл Б', role: 'participant', title: 'Хүний нөөц' },
  { id: 'p5', name: 'Мөнх-Эрдэнэ Г', role: 'participant', title: 'Үйл ажиллагаа', isMuted: true },
  { id: 'p6', name: 'Нандин Цэрэн', role: 'observer', title: 'Хуулийн зөвлөх', isMuted: true },
];

export const showcaseSubmissions: Submission[] = [
  {
    id: 'q1',
    meetingId: 'demo',
    kind: 'question',
    authorName: 'Оюун Дорж',
    body: 'Шинэ салбарын эхний жилийн зардлыг ямар эх үүсвэрээс санхүүжүүлэх вэ?',
    upvotes: 14,
    status: 'discussing',
    createdAt: '10:24',
  },
  {
    id: 'q2',
    meetingId: 'demo',
    kind: 'question',
    authorName: 'Нэрээ нууцалсан',
    body: 'Одоогийн ажилтнуудаас шилжин ажиллах хүмүүсийг хэрхэн сонгох вэ?',
    upvotes: 9,
    status: 'pending',
    createdAt: '10:27',
  },
  {
    id: 'q3',
    meetingId: 'demo',
    kind: 'question',
    authorName: 'Тэмүүжин Энх',
    body: 'Байршлын судалгааг хэн хийсэн бэ?',
    upvotes: 4,
    status: 'answered',
    createdAt: '10:19',
  },
  {
    id: 's1',
    meetingId: 'demo',
    kind: 'suggestion',
    authorName: 'Сарангэрэл Б',
    body: 'Эхний 6 сард туршилтын горимоор ажиллуулж, дараа нь бүрэн нээвэл эрсдэл бага байна.',
    upvotes: 11,
    status: 'pending',
    createdAt: '10:26',
  },
  {
    id: 's2',
    meetingId: 'demo',
    kind: 'suggestion',
    authorName: 'Мөнх-Эрдэнэ Г',
    body: 'Салбарын менежерийг дотоодоос сонгон шалгаруулах нь зүйтэй.',
    upvotes: 6,
    status: 'pending',
    createdAt: '10:29',
  },
  {
    id: 'r1',
    meetingId: 'demo',
    kind: 'request',
    authorName: 'Нандин Цэрэн',
    body: 'Түрээсийн гэрээний төслийг хурлын материалд нэмж өгнө үү.',
    upvotes: 0,
    status: 'resolved',
    createdAt: '10:15',
  },
  {
    id: 'r2',
    meetingId: 'demo',
    kind: 'request',
    authorName: 'Оюун Дорж',
    body: 'Санхүүгийн тооцооны талаар 3 минут үг хэлэх хүсэлтэй байна.',
    upvotes: 0,
    status: 'pending',
    createdAt: '10:30',
  },
];
