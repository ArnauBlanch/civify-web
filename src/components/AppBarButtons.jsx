import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

export function fAppBarButtons(props) {
  const { t } = props;
  return (
    <nav
      className="mdl-navigation mdl-layout--large-screen-only"
      style={{ marginTop: 5 }}
    >
      <FlatButton
        label={t('issues')}
        secondary
        containerElement={<Link to="/" />}
      />
      <FlatButton
        label={t('login')}
        secondary
        containerElement={<Link to="/login" />}
      />
    </nav>
  );
}

fAppBarButtons.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fAppBarButtons);
