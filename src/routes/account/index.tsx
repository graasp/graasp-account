import { Grid2 as Grid } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { StorageBar } from '@/components/account/StorageBar';
import GraaspIcons from '@/components/main/GraaspIcons';
import MemberCard from '@/components/main/MemberCard';
import PersonalizationNotificationCard from '@/components/main/PersonalizationNotificationCard';

export const Route = createFileRoute('/account/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <MemberCard />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <StorageBar />
      </Grid>
      <PersonalizationNotificationCard />
      <GraaspIcons />
    </Grid>
  );
}
