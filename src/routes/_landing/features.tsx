import { createFileRoute } from '@tanstack/react-router';

import { BlendedLearningSection } from '~landing/features/BlendedLearningSection';
import { BlogSection } from '~landing/features/BlogSection';
import { GraaspFeaturesSection } from '~landing/features/GraaspFeaturesSection';
import { PlatformOverviewSection } from '~landing/features/PlatformOverviewSection';
import { PricingPlansSection } from '~landing/features/PricingPlansSection';
import { TitleSection } from '~landing/features/TitleSection';

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
      <BlogSection />
    </>
  );
}
