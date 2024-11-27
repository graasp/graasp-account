import { useTranslation } from 'react-i18next';

import { Alert } from '@mui/material';

import { ItemType } from '@graasp/sdk';
import { MainMenu } from '@graasp/ui';

import { getRouteApi, useNavigate } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext.tsx';
import { NS } from '@/config/constants.ts';
import { axios, hooks } from '@/config/queryClient';
import { MAIN_MENU_ID, TREE_VIEW_ID } from '@/config/selectors';

import { LoadingTree } from './tree/LoadingTree.tsx';
import { TreeView } from './tree/TreeView.tsx';
import { combineUuids, shuffleAllButLastItemInArray } from './utils/shuffle.ts';

const { useItem, useDescendants } = hooks;
const playerRoute = getRouteApi('/player/$rootId/$itemId');

const DrawerNavigation = (): JSX.Element | null => {
  const { rootId, itemId } = playerRoute.useParams();
  const search = playerRoute.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

  // TODO: see if we still need this hack
  // const [prevRootId, setPrevRootId] = useState(rootId);

  // useEffect(() => {
  //   setPrevRootId(rootId);
  // }, [rootId]);

  const { shuffle } = search;

  const { t } = useTranslation(NS.Common);

  const { data: descendants, isLoading: isLoadingTree } = useDescendants({
    id: rootId ?? '',
    types: [ItemType.FOLDER],
    // remove hidden
    showHidden: false,
  });

  const { data: rootItem, isLoading, isError, error } = useItem(rootId);
  const handleNavigationOnClick = (newItemId: string) => {
    navigate({
      to: '/player/$rootId/$itemId',
      params: {
        rootId,
        itemId: newItemId,
      },
      search,
    });
  };

  // on root change, we need to destroy the tree
  // since it keeps the same data on reload despite prop changes
  // we cannot rely on isLoading because the data is taken from the cache
  // bc of our query client optimization
  // if (prevRootId !== rootId) {
  //   return <LoadingTree />;
  // }

  let shuffledDescendants = [...(descendants || [])];
  if (shuffle) {
    const baseId = rootId ?? '';
    const memberId = user?.id ?? '';
    const combinedUuids = combineUuids(baseId, memberId);
    shuffledDescendants = shuffleAllButLastItemInArray(
      shuffledDescendants,
      combinedUuids,
    );
  }

  if (rootItem) {
    if (descendants) {
      return (
        <MainMenu id={MAIN_MENU_ID}>
          <TreeView
            key={rootId}
            id={TREE_VIEW_ID}
            rootItems={[rootItem]}
            items={[rootItem, ...shuffledDescendants]}
            firstLevelStyle={{ fontWeight: 'bold' }}
            onTreeItemSelect={handleNavigationOnClick}
            itemId={itemId}
          />
        </MainMenu>
      );
    }
    if (isLoadingTree) {
      return <LoadingTree />;
    }
  }

  if (isLoading) {
    return <LoadingTree />;
  }

  if (isError) {
    // this is an expected error that can occur if user does not have access to the item
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return null;
    }
    return <Alert severity="error">{t('ERRORS.UNEXPECTED')}</Alert>;
  }

  return null;
};

export default DrawerNavigation;
