import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Paper, TextField, RaisedButton } from 'material-ui';

const paperStyle = {
  textAlign: 'center',
  padding: 35,
  margin: 20,
  width: '100%',
  maxWidth: 500,
};

export function fRegister(props) {
  const { t } = props;
  return (
    <Paper
      style={paperStyle}
      zDepth={4}
    >
      <h4>{t('business-registration')}</h4>
      <form>
        <TextField
          floatingLabelText={t('business-name')}
        /><br />
        <TextField
          floatingLabelText={t('email')}
        /><br />
        <TextField
          floatingLabelText={t('username')}
        /><br />
        <TextField
          floatingLabelText={t('password')}
          type="password"
        /><br />
        <TextField
          floatingLabelText={t('confirm-password')}
          type="password"
        /><br /><br />
        <RaisedButton
          label={t('submit')}
          primary
        />
      </form>
    </Paper>
  );
}

fRegister.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(fRegister);
