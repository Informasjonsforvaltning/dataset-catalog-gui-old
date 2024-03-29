import React, { memo, FC } from 'react';
import { compose } from 'redux';
import FooterBase from '@fellesdatakatalog/internal-footer';
import { ThemeProfile } from '@fellesdatakatalog/theme';

import env from '../../env';

import { withAuth } from '../../providers/auth';
import { authService } from '../../services/auth/auth-service';

import './footer.scss';

const { SKE_THEME_PROFILE } = env;

const Footer = () => {
  const isSkatteetatenThemeProfile =
    authService
      .getResourceRoles()
      .some(({ resourceId }) =>
        SKE_THEME_PROFILE?.split(',').includes(resourceId)
      ) || !!localStorage.getItem('skeProfile');

  const themeProfile = isSkatteetatenThemeProfile
    ? ThemeProfile.SKE
    : ThemeProfile.FDK;

  return (
    <div className='footer'>
      <FooterBase themeProfile={themeProfile} />
    </div>
  );
};

export default compose<FC>(memo, withAuth)(Footer);
