/**
 * Core product domain models.
 *
 * The marketing site only uses these for demo/mock UI, but they mirror the
 * entities of the future SaaS backend (meetings, polls, votes, questions…)
 * so the same types can be reused when real API integration starts.
 */

export type ID = string;

export type MeetingStatus = 'draft' | 'scheduled' | 'live' | 'ended' | 'archived';
export type ParticipantRole = 'owner' | 'organizer' | 'participant' | 'observer';
export type VoteTone = 'positive' | 'negative' | 'neutral';
export type PollVisibility = 'open' | 'secret';
export type SubmissionKind = 'question' | 'suggestion' | 'request';
export type SubmissionStatus = 'pending' | 'discussing' | 'answered' | 'resolved';

export interface Organization {
  id: ID;
  name: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
}

export interface Participant {
  id: ID;
  name: string;
  role: ParticipantRole;
  title?: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
}

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

export interface PollOption {
  id: ID;
  label: string;
  votes: number;
  tone: VoteTone;
}

export interface Poll {
  id: ID;
  meetingId: ID;
  question: string;
  visibility: PollVisibility;
  options: PollOption[];
  eligibleVoters: number;
  /** Fraction (0–1) of eligible votes required for the decision to pass. */
  passThreshold: number;
}

export interface Submission {
  id: ID;
  meetingId: ID;
  kind: SubmissionKind;
  authorName: string;
  body: string;
  upvotes: number;
  status: SubmissionStatus;
  createdAt: string;
}

export type ActivityType = 'vote' | 'question' | 'suggestion' | 'request' | 'join';

export interface ActivityEvent {
  id: ID;
  type: ActivityType;
  actorName: string;
  message: string;
  timeLabel: string;
}
