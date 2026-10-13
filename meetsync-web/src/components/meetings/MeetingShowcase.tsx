import { CircleHelp, Hand, Lightbulb, Vote } from 'lucide-react';
import {
  showcaseEligible,
  showcaseParticipants,
  showcasePollOptions,
  showcaseQuestion,
  showcaseSubmissions,
  showcaseTopic,
  showcaseVoteWeights,
} from '../../data/demo';
import { useInView } from '../../hooks/useInView';
import { useLiveVotes } from '../../hooks/useLiveVotes';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Tabs from '../ui/Tabs';
import type { TabItem } from '../ui/Tabs';
import SubmissionList from './SubmissionList';
import VideoGrid from './VideoGrid';
import VotePanel from './VotePanel';

const byKind = (kind: 'question' | 'suggestion' | 'request') => showcaseSubmissions.filter((s) => s.kind === kind);
const questions = byKind('question');
const suggestions = byKind('suggestion');
const requests = byKind('request');

const tabs: TabItem[] = [
  { id: 'vote', label: 'Санал хураалт', icon: Vote },
  { id: 'questions', label: 'Асуулт', icon: CircleHelp, count: questions.length },
  { id: 'suggestions', label: 'Санал', icon: Lightbulb, count: suggestions.length },
  { id: 'requests', label: 'Хүсэлт', icon: Hand, count: requests.length },
];

export default function MeetingShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.25 });
  const live = useLiveVotes(showcasePollOptions, {
    eligible: showcaseEligible,
    active: inView,
    weights: showcaseVoteWeights,
  });

  return (
    <Section id="live-meeting" tone="dark" labelledBy="showcase-title" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative">
        <SectionHeading
          id="showcase-title"
          tone="dark"
          eyebrow="Бодит цагийн хурал"
          title="Хэлэлцүүлэг, санал хураалт нэг дэлгэцэнд"
          description="Оролцогчид хурлаа үзэнгээ асуулт тавьж, санал оруулж, нэг товшилтоор санал өгнө. Үр дүн хүн бүрийн дэлгэцэнд шууд шинэчлэгдэнэ."
        />

        <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7" aria-hidden="true">
            <VideoGrid topic={showcaseTopic} participants={showcaseParticipants} />
          </div>

          <div className="rounded-xl bg-white p-4 shadow-elevated sm:p-5 lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-navy-950">Оролцооны самбар</p>
              <span className="text-[11px] text-slate-500">Туршиж үзэх боломжтой жишээ</span>
            </div>
            <Tabs items={tabs} label="Хурлын оролцооны самбар">
              {(active) => {
                switch (active) {
                  case 'vote':
                    return (
                      <VotePanel
                        question={showcaseQuestion}
                        options={live.options}
                        total={live.total}
                        eligible={live.eligible}
                        myVote={live.myVote}
                        onVote={live.castVote}
                      />
                    );
                  case 'questions':
                    return <SubmissionList items={questions} />;
                  case 'suggestions':
                    return <SubmissionList items={suggestions} />;
                  default:
                    return <SubmissionList items={requests} showVotes={false} />;
                }
              }}
            </Tabs>
          </div>
        </div>
      </div>
    </Section>
  );
}
