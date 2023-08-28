import React from 'react';

import { ReactComponent as DefaultCardIcon } from 'payment-icons/min/flat/default.svg';
import { ReactComponent as MasterCardIcon } from 'payment-icons/min/flat/mastercard.svg';
import { ReactComponent as VisaIcon } from 'payment-icons/min/flat/visa.svg';
import PropTypes from 'prop-types';

const styles = {
  height: 35,
  width: 'auto',
  marginRight: 10,
};

const CardIcon = ({ brand }) => {
  switch (brand) {
    case 'visa':
      return <VisaIcon sx={styles} />;
    case 'mastercard':
      return <MasterCardIcon sx={styles} />;
    default:
      return <DefaultCardIcon sx={styles} />;
  }
};

CardIcon.propTypes = {
  brand: PropTypes.string,
};

CardIcon.defaultProps = {
  brand: null,
};

export default CardIcon;
