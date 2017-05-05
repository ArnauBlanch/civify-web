import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

const AppBarButtons = (props) => {
  const { t } = props;
  return (
    <nav
      className="mdl-navigation mdl-layout--large-screen-only"
      style={{ marginTop: 5 }}
    >
      <FlatButton
        label={t('issues')}
        containerElement={<Link to="/" />}
      />
      <FlatButton
        label={t('login')}
        containerElement={<Link to="/login" />}
      />
    </nav>
  );
};

AppBarButtons.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(AppBarButtons);
