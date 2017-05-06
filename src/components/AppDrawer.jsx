import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, AppBar, MenuItem } from 'material-ui';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

export function fAppDrawer(props) {
  const { t } = props;
  return (
    <Drawer
      docked={false}
      open={props.open}
      onRequestChange={props.toggleDrawer}
    >
      <AppBar
        title={<img src="logo.svg" height="75%" alt="Civify logo" />}
        onLeftIconButtonTouchTap={props.toggleDrawer}
      />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MenuItem onTouchTap={props.toggleDrawer} >{t('issues')}</MenuItem>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <MenuItem onTouchTap={props.toggleDrawer} >{t('login')}</MenuItem>
      </Link>
    </Drawer>
  );
};

fAppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default translate()(fAppDrawer);
