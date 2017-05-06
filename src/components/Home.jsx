import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

export function fHome(props) {
  const { t } = props;
  return (
    <div>
      <h1>{t('issues')}</h1>
    </div>
  );
}

fHome.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fHome);
