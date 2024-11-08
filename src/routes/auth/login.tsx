import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

const loginSearchSchema = z.object({
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: zodSearchValidator(loginSearchSchema),
});
