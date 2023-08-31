import React, { MouseEventHandler } from 'react';

import { List,  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';


import { hooks } from '../../config/queryClient';
import AddCardModal from './AddCardModal';
import CardIcon from './CardIcon';

const { useCards } = hooks;

type Props = {
    handleCardSelection: (card:any)=>MouseEventHandler<HTMLDivElement> ,
    selected: string
}

const CardList = ({ handleCardSelection, selected }:Props):JSX.Element => {
  const { data: cards = [] } = useCards();

  return (
    <List component="nav">
      {cards.map((card:any) => (
        <ListItemButton
          onClick={handleCardSelection(card)}
          selected={card.id === selected}
          key={card.id}
        >
          <ListItemIcon>
            <CardIcon brand={card?.brand} />
          </ListItemIcon>
          <ListItemText>
            {card?.brand?.toUpperCase()} <br />
            •••• •••• •••• {card?.lastFourDigits}
          </ListItemText>
        </ListItemButton>
      ))}
      <AddCardModal />
    </List>
  );
};

export default CardList;
