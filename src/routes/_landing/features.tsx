import { createFileRoute } from '@tanstack/react-router';

import { BlendedLearningSection } from '~landing/features/BlendedLearningSection';
import { GraaspFeaturesSection } from '~landing/features/GraaspFeaturesSection';
import { PlatformOverviewSection } from '~landing/features/PlatformOverviewSection';
import { PricingPlansSection } from '~landing/features/PricingPlansSection';
import { TitleSection } from '~landing/features/TitleSection';
import { NewsLetter } from '~landing/home/NewsLetter';

export const Route = createFileRoute('/_landing/features')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TitleSection />
      <PlatformOverviewSection />
      <BlendedLearningSection />
      <GraaspFeaturesSection />
      <PricingPlansSection />
      {/* <BlogSection /> */}
      <NewsLetter />
    </>
  );
}
