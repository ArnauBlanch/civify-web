import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FlatButton, Paper } from 'material-ui';

const registerStyle = {
  marginLeft: 10,
  verticalAlign: 'middle',
};

const paperStyle = {
  textAlign: 'center',
  padding: 35,
  margin: 20,
  width: '100%',
  maxWidth: 500,
};

const titleStyle = { margin: 0 };

export function fLogin(props) {
  const { t } = props;
  return (
    <Paper
      style={paperStyle}
      zDepth={2}
    >
      <h4 style={titleStyle}>{t('login')}</h4>
      <br /><br /><br />
      {t('not-registered-business')}<br />
      <FlatButton
        label={t('register-now')}
        primary
        style={registerStyle}
        containerElement={<Link to="/register" />}
      />
    </Paper>
  );
}

fLogin.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fLogin);
