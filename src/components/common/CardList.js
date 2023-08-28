import React from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import PropTypes from 'prop-types';

import { hooks } from '../../config/queryClient';
import AddCardModal from './AddCardModal';
import CardIcon from './CardIcon';

const { useCards } = hooks;

const CardList = ({ handleCardSelection, selected }) => {
  const { data: cards = [] } = useCards();

  return (
    <List component="nav">
      {cards.map((card) => (
        <ListItem
          button
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
        </ListItem>
      ))}
      <AddCardModal />
    </List>
  );
};

CardList.propTypes = {
  handleCardSelection: PropTypes.func,
  selected: PropTypes.string,
};

CardList.defaultProps = {
  handleCardSelection: null,
  selected: null,
};

export default CardList;
