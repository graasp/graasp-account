import { ReactNode } from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

import { SECONDARY_COLOR } from '@graasp/ui';

import { ButtonLink } from '@/components/ui/ButtonLink';

const InvertingStack = styled(Stack)(({ theme }) => ({
  // common styles
  alignItems: 'center',
  // base style for "normal direction"
  flexDirection: 'column',
  maxWidth: '60ch',
  '& img': {
    maxWidth: '20rem',
  },

  // larger screens
  [theme.breakpoints.up('md')]: {
    '& img': {
      maxWidth: 'unset',
    },
    maxWidth: 'unset',
    // space elements
    justifyContent: 'space-between',

    // default should be row on large screen
    flexDirection: 'row',
    // text should flow in this direction
    textAlign: 'right',

    // style the first children
    '& > .MuiStack-root': {
      alignItems: 'flex-end',
    },

    // override for "inverted" child
    '&:nth-child(even)': {
      // reverse the direction
      flexDirection: 'row-reverse',
      // invert text alignment
      textAlign: 'left',
      // style the first children
      '& > .MuiStack-root': {
        alignItems: 'flex-start',
      },
    },
  },
}));

type UserStoryProps = {
  caption: string;
  title: string;
  href: string;
  buttonText: string;
  children: ReactNode;
  image: ReactNode;
  imageAttribution?: ReactNode;
};
export function UserStory({
  caption,
  title,
  href,
  buttonText,
  children,
  image,
  imageAttribution,
}: UserStoryProps): JSX.Element {
  return (
    <InvertingStack gap={5}>
      <Stack flex={1} gap={2}>
        <Stack
          borderRadius={6}
          overflow="hidden"
          boxShadow={`20px 20px 0px ${SECONDARY_COLOR}`}
        >
          {image}
        </Stack>
        {imageAttribution}
      </Stack>
      <Stack gap={2} flex={2}>
        <Box>
          <Typography variant="note">{caption}</Typography>
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
        </Box>

        {children}

        <ButtonLink
          to={href}
          sx={{
            // make button take only needed space
            width: 'fit-content',
          }}
          color="primary"
          variant="contained"
        >
          {buttonText}
        </ButtonLink>
      </Stack>
    </InvertingStack>
  );
}
