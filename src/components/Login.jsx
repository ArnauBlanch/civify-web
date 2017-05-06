import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

export function fLogin(props) {
  const { t } = props;
  return (
    <div>
      <h1>{t('login')}</h1>
    </div>
  );
}

fLogin.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fLogin);
