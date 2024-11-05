import { styled } from '@mui/material';

export const ZoomingImage = styled('img')(() => ({
  // needed so image does not bleed out
  width: '100%',
  objectFit: 'cover',
  objectPosition: '50% 0',

  minHeight: '0px',
  minWidth: '0px',

  // add a small zoom effect
  transition: 'all cubic-bezier(.75,.1,.24,.94) 250ms',
  transform: 'scale(1)',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));
