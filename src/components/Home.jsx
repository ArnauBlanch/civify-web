import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const Home = (props) => {
  const { t } = props;
  return (
    <div>
      <h1>{t('issues')}</h1>
    </div>
  );
};

Home.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(Home);
