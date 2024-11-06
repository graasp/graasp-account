import { ReactNode } from 'react';

import { Link, Stack, styled } from '@mui/material';

import { ExternalLinkIcon } from 'lucide-react';

const StyledLink = styled(Link)({
  backgroundColor: 'transparent',
  transition: 'all linear 100ms',
  color: 'inherit',
  '&:hover': {
    backgroundColor: 'rgb(var(--accent-dark), 20%)',
  },
});

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function ExternalLink({
  href,
  children,
}: ExternalLinkProps): JSX.Element {
  return (
    <StyledLink href={href} p={1}>
      <Stack direction="row" gap={1} alignItems="center">
        {children}
        <ExternalLinkIcon size={'18px'} />
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          ></path>
        </svg> */}
      </Stack>
    </StyledLink>
  );
}

type SocialLinkProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
};
export function SocialLink({
  icon,
  children,
  href,
}: SocialLinkProps): JSX.Element {
  return (
    <StyledLink href={href} p={1}>
      <Stack direction="row" gap={4}>
        {icon}
        {children}
      </Stack>
    </StyledLink>
  );
}
