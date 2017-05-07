import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

export function fNotFound(props) {
  const { t } = props;
  return (
    <div>
      <h1>{t('not-found')}</h1>
      <h4>{t('couldnt-find-page')}</h4>
    </div>
  );
}

fNotFound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fNotFound);
