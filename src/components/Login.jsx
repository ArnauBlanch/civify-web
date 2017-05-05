import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const Login = (props) => {
  const { t } = props;
  return (
    <div>
      <h1>{t('login')}</h1>
    </div>
  );
};

Login.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(Login);
