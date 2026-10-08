import { useMemo } from 'react';
import { CircleHelp, Hand, Lightbulb, Vote } from 'lucide-react';
import { demoContent, showcaseEligible, showcaseVoteWeights } from '../../data/demo';
import { useInView } from '../../hooks/useInView';
import { useLiveVotes } from '../../hooks/useLiveVotes';
import { useI18n } from '../../i18n/useI18n';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import Tabs from '../ui/Tabs';
import type { TabItem } from '../ui/Tabs';
import SubmissionList from './SubmissionList';
import VideoGrid from './VideoGrid';
import VotePanel from './VotePanel';

export default function MeetingShowcase() {
  const { locale, t } = useI18n();
  const demo = demoContent[locale];
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.25 });
  const live = useLiveVotes(demo.showcasePollOptions, {
    eligible: showcaseEligible,
    active: inView,
    weights: showcaseVoteWeights,
  });

  const groups = useMemo(() => {
    const byKind = (kind: 'question' | 'suggestion' | 'request') => demo.showcaseSubmissions.filter((s) => s.kind === kind);
    return { questions: byKind('question'), suggestions: byKind('suggestion'), requests: byKind('request') };
  }, [demo]);

  const tabs: TabItem[] = [
    { id: 'vote', label: t.showcase.tabs.vote, icon: Vote },
    { id: 'questions', label: t.showcase.tabs.questions, icon: CircleHelp, count: groups.questions.length },
    { id: 'suggestions', label: t.showcase.tabs.suggestions, icon: Lightbulb, count: groups.suggestions.length },
    { id: 'requests', label: t.showcase.tabs.requests, icon: Hand, count: groups.requests.length },
  ];

  return (
    <Section id="live-meeting" tone="dark" labelledBy="showcase-title" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative">
        <SectionHeading
          id="showcase-title"
          tone="dark"
          eyebrow={t.showcase.eyebrow}
          title={t.showcase.title}
          description={t.showcase.description}
        />

        <div ref={ref} className="mt-14 grid gap-4 xl:grid-cols-12">
          <div className="xl:col-span-7" aria-hidden="true">
            <VideoGrid topic={demo.showcaseTopic} participants={demo.showcaseParticipants} />
          </div>

          <div className="rounded-xl bg-white p-4 shadow-elevated sm:p-5 xl:col-span-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-navy-950">{t.showcase.panelTitle}</p>
              <span className="text-[11px] text-slate-500">{t.showcase.tryIt}</span>
            </div>
            <Tabs items={tabs} label={t.showcase.tabsLabel}>
              {(active) => {
                switch (active) {
                  case 'vote':
                    return (
                      <VotePanel
                        question={demo.showcaseQuestion}
                        options={live.options}
                        total={live.total}
                        eligible={live.eligible}
                        myVote={live.myVote}
                        onVote={live.castVote}
                      />
                    );
                  case 'questions':
                    return <SubmissionList items={groups.questions} />;
                  case 'suggestions':
                    return <SubmissionList items={groups.suggestions} />;
                  default:
                    return <SubmissionList items={groups.requests} showVotes={false} />;
                }
              }}
            </Tabs>
          </div>
        </div>
      </div>
    </Section>
  );
}
