/**
 * domain.ts — Бүтээгдэхүүний үндсэн ойлголтуудын өгөгдлийн загвар.
 *
 * Маркетингийн сайт эдгээрийг зөвхөн жишээ (demo) самбаруудад ашигладаг ч,
 * ирээдүйн SaaS аппын backend-ийн объектуудтай (хурал, санал хураалт, санал,
 * асуулт…) ижил бүтэцтэй. Иймээс жинхэнэ API холбох үед дахин ашиглах боломжтой.
 */

/** Объектын давтагдашгүй таних дугаар. */
export type ID = string;

/** Хурлын төлөв: ноорог, товлогдсон, явагдаж буй, дууссан, архивлагдсан. */
export type MeetingStatus = 'draft' | 'scheduled' | 'live' | 'ended' | 'archived';
/** Оролцогчийн үүрэг: эзэмшигч, зохион байгуулагч, оролцогч, ажиглагч. */
export type ParticipantRole = 'owner' | 'organizer' | 'participant' | 'observer';
/** Саналын сонголтын өнгө: дэмжсэн (ногоон), эсэргүүцсэн (улаан), түдгэлзсэн (саарал). */
export type VoteTone = 'positive' | 'negative' | 'neutral';
/** Санал хураалт ил эсвэл нууц эсэх. */
export type PollVisibility = 'open' | 'secret';
/** Оролцогчийн илгээх зүйлийн төрөл: асуулт, санал, хүсэлт. */
export type SubmissionKind = 'question' | 'suggestion' | 'request';
/** Илгээсэн зүйлийн төлөв: хүлээгдэж буй, хэлэлцэж буй, хариулсан, шийдвэрлэсэн. */
export type SubmissionStatus = 'pending' | 'discussing' | 'answered' | 'resolved';

/** Байгууллага (хэрэглэгч компани). */
export interface Organization {
  id: ID;
  name: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
}

/** Хуралд оролцогч хүн. */
export interface Participant {
  id: ID;
  name: string;
  role: ParticipantRole;
  title?: string;
  /** Одоо ярьж байгаа эсэх (видео дээр хүрээ тодорно). */
  isSpeaking?: boolean;
  /** Микрофон хаалттай эсэх. */
  isMuted?: boolean;
}

/** Хурал. */
export interface Meeting {
  id: ID;
  organizationId: ID;
  title: string;
  type: string;
  status: MeetingStatus;
  startsAt: string;
  endsAt?: string;
  participantCount: number;
}

/** Санал хураалтын нэг сонголт ба түүнд өгсөн саналын тоо. */
export interface PollOption {
  id: ID;
  label: string;
  votes: number;
  tone: VoteTone;
}

/** Санал хураалт. */
export interface Poll {
  id: ID;
  meetingId: ID;
  question: string;
  visibility: PollVisibility;
  options: PollOption[];
  /** Санал өгөх эрхтэй хүний тоо. */
  eligibleVoters: number;
  /** Шийдвэр батлагдахад шаардлагатай саналын хувь (0–1; 0.5 = 50%). */
  passThreshold: number;
}

/** Оролцогчийн илгээсэн асуулт / санал / хүсэлт. */
export interface Submission {
  id: ID;
  meetingId: ID;
  kind: SubmissionKind;
  authorName: string;
  body: string;
  /** Бусад оролцогчдын дэмжсэн тоо. */
  upvotes: number;
  status: SubmissionStatus;
  createdAt: string;
}

/** Хурлын үеийн үйл явдлын төрөл. */
export type ActivityType = 'vote' | 'question' | 'suggestion' | 'request' | 'join';

/** "Шууд үйл явдал" жагсаалтын нэг мөр (жишээ нь "Б.Сараа санал өглөө"). */
export interface ActivityEvent {
  id: ID;
  type: ActivityType;
  actorName: string;
  message: string;
  timeLabel: string;
}
