import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container, Typography, useTheme } from '@mui/material';

import { GraaspLogo } from '@graasp/ui';

import PropTypes from 'prop-types';

import { REDIRECTION_CONTENT_ID } from '../../config/selectors';

const RedirectionContent = ({ link }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container
      id={REDIRECTION_CONTENT_ID}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
      <div
        style={{
          marginLeft: 10,
          color: theme.palette.primary.main,
        }}
      >
        <Typography variant="h4" align="center">
          {t('You are being redirected…')}
        </Typography>
        <Link
          to={link}
          sx={{ textDecoration: 'none', fontStyle: 'italic', color: 'black' }}
        >
          <Typography id={REDIRECTION_CONTENT_ID} align="center">
            {t('Click here if you are not automatically redirected')}
          </Typography>
        </Link>
      </div>
    </Container>
  );
};

RedirectionContent.propTypes = {
  link: PropTypes.string.isRequired,
};

export default RedirectionContent;
