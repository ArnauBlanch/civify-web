import React, { PropTypes } from 'react';
import { SvgIcon } from 'material-ui';

const icon = (props) => (
  <SvgIcon {...props} style={{ paddingTop: 5, paddingLeft: 15 }}>
    <path fill={props.color} d="M6 0h-6v6h6v-6zM5 5h-4v-4h4v4z" />
    <path fill={props.color} d="M2 2h2v2h-2v-2z" />
    <path fill={props.color} d="M0 16h6v-6h-6v6zM1 11h4v4h-4v-4z" />
    <path fill={props.color} d="M2 12h2v2h-2v-2z" />
    <path fill={props.color} d="M10 0v6h6v-6h-6zM15 5h-4v-4h4v4z" />
    <path fill={props.color} d="M12 2h2v2h-2v-2z" />
    <path fill={props.color} d="M2 7h-2v2h3v-1h-1z" />
    <path fill={props.color} d="M7 9h2v2h-2v-2z" />
    <path fill={props.color} d="M3 7h2v1h-2v-1z" />
    <path fill={props.color} d="M9 12h-2v1h1v1h1v-1z" />
    <path fill={props.color} d="M6 7v1h-1v1h2v-2z" />
    <path fill={props.color} d="M8 4h1v2h-1v-2z" />
    <path fill={props.color} d="M9 8v1h2v-2h-3v1z" />
    <path fill={props.color} d="M7 6h1v1h-1v-1z" />
    <path fill={props.color} d="M9 14h2v2h-2v-2z" />
    <path fill={props.color} d="M7 14h1v2h-1v-2z" />
    <path fill={props.color} d="M9 11h1v1h-1v-1z" />
    <path fill={props.color} d="M9 3v-2h-1v-1h-1v4h1v-1z" />
    <path fill={props.color} d="M12 14h1v2h-1v-2z" />
    <path fill={props.color} d="M12 12h2v1h-2v-1z" />
    <path fill={props.color} d="M11 13h1v1h-1v-1z" />
    <path fill={props.color} d="M10 12h1v1h-1v-1z" />
    <path fill={props.color} d="M14 10v1h1v1h1v-2h-1z" />
    <path fill={props.color} d="M15 13h-1v3h2v-2h-1z" />
    <path fill={props.color} d="M10 10v1h3v-2h-2v1z" />
    <path fill={props.color} d="M12 7v1h2v1h2v-2h-2z" />
  </SvgIcon>
);
icon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default icon;
