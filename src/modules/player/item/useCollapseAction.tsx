import { ActionTriggers } from '@graasp/sdk';

import { mutations } from '@/config/queryClient';

export function useCollapseAction(itemId: string) {
  const { mutate: triggerAction } = mutations.usePostItemAction();

  const onCollapse = (c: boolean) => {
    triggerAction({
      itemId,
      payload: {
        type: c ? ActionTriggers.CollapseItem : ActionTriggers.UnCollapseItem,
      },
    });
  };
  return { triggerAction, onCollapse };
}
