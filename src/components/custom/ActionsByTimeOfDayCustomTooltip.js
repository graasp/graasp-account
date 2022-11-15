// CustomToolTip used in ActionsByTimeOfDayChart
// x-axis labels in that chart say 'morning', 'afternoon', etc.
// this tooltip adds the time of day those labels refer to
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  AFTERNOON,
  EARLY_MORNING,
  EVENING,
  LATE_NIGHT,
  MORNING,
  NIGHT,
} from '../../config/constants';
import { CustomTooltipDiv, CustomTooltipDivCount } from './CustomTooltip';

const ActionsByTimeOfDayCustomTooltip = ({ active, payload, label }) => {
  const { t } = useTranslation();

  const generateAddedTooltipText = (input) => {
    switch (input) {
      case LATE_NIGHT:
        return '00:00-04:00';
      case EARLY_MORNING:
        return '04:00-08:00';
      case MORNING:
        return '08:00-12:00';
      case AFTERNOON:
        return '12:00-16:00';
      case EVENING:
        return '16:00-20:00';
      case NIGHT:
        return '20:00-00:00';
      default:
        return null;
    }
  };

  if (active) {
    return (
      <CustomTooltipDiv>
        <p>{`${label} (${generateAddedTooltipText(label)})`}</p>
        <CustomTooltipDivCount>
          {`${t('Count:')} ${payload[0].value}`}
        </CustomTooltipDivCount>
      </CustomTooltipDiv>
    );
  }

  return null;
};

ActionsByTimeOfDayCustomTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf().isRequired,
  label: PropTypes.string.isRequired,
};

export default ActionsByTimeOfDayCustomTooltip;
