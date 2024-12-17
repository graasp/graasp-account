import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { IconButton } from '@mui/material';

import { Navigation } from '@graasp/ui';

import { useNavigate } from '@tanstack/react-router';

import { hooks } from '@/config/queryClient';

import {
  BREADCRUMBS_NAVIGATOR_ID,
  buildBreadcrumbsItemLink,
  buildMenuItemId,
  buildNavigationDropDownId,
} from './config/selectors';
import { NAVIGATOR_BACKGROUND_COLOR } from './constants';

const { useItem, useParents, useCurrentMember, useChildren } = hooks;

export function Navigator({
  itemId,
}: Readonly<{ itemId: string }>): JSX.Element | null {
  const { data: currentMember } = useCurrentMember();
  const { data: item, isLoading: isItemLoading } = useItem(itemId);

  const navigate = useNavigate();

  const { data: parents, isLoading: areParentsLoading } = useParents({
    id: itemId,
  });

  if (isItemLoading || areParentsLoading) {
    return null;
  }

  const renderRoot = () => {
    // no root access if signed out
    if (!currentMember) {
      return null;
    }

    return (
      <>
        <IconButton onClick={() => navigate({ to: '/analytics' })}>
          <HomeOutlinedIcon />
        </IconButton>
        <ArrowForwardIosIcon sx={{ m: 2 }} fontSize="inherit" />
      </>
    );
  };

  return (
    <Navigation
      id={BREADCRUMBS_NAVIGATOR_ID}
      sx={{ paddingLeft: 2 }}
      item={item}
      buildToItemPath={(id) => `/analytics/items/${id}`}
      parents={parents}
      renderRoot={renderRoot}
      backgroundColor={NAVIGATOR_BACKGROUND_COLOR}
      buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLink}
      buildMenuItemId={buildMenuItemId}
      useChildren={useChildren as any}
      buildIconId={buildNavigationDropDownId}
    />
  );
}
