/**
*
* RegisterForm
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField } from 'redux-form-material-ui';
import { FormattedMessage } from 'react-intl';
import Dropzone from 'react-dropzone';
import messages from './messages';
import BASE_URL from '../../api';

export const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload) => field.input.onChange(filesToUpload)}
        maxSize={1000000}
        accept="image/jpeg, image/png"
        style={{
          border: '3px dotted #ccc',
          borderRadius: '20px',
          height: 80,
          position: 'relative',
          width: 160,
          display: 'block',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#808080',
        }}
        rejectStyle={{ borderColor: 'red' }}
      >
        <div style={{ paddingTop: 10 }}><FormattedMessage {...messages.uploadPicture} /><br />
          <span style={{ fontSize: 12 }}><FormattedMessage {...messages.invalidFile} /></span></div>
      </Dropzone>
      { files && Array.isArray(files) && files[0] &&
        <div style={{ fontWeight: 'bold', fontSize: 13, marginTop: 10 }}>
          <img
            alt="Preview"
            src={files[0].preview}
            style={{ maxHeight: 150, maxWidth: 150, marginBottom: 10 }}
          /><br />
          { files[0].name }
        </div>
      }
      { !(files && Array.isArray(files) && files[0]) && typeof field.currentImage !== 'undefined' &&
        <div style={{ fontWeight: 'bold', fontSize: 13, marginTop: 10 }}>
          <img
            alt="Preview"
            src={`${BASE_URL}${field.currentImage.large_url}`}
            style={{ maxHeight: 150, maxWidth: 150, marginBottom: 10 }}
          />
        </div>
      }
    </div>
  );
};

class RewardForm extends React.Component {
  constructor(props) {
    super(props);
    this.fileChanged = this.fileChanged.bind(this);
    this.state = { file: undefined, fileChanged: false };
  }
  required(value) {
    return (value ? undefined : <FormattedMessage {...messages.required} />);
  }
  priceCheck(value) {
    return /^\d+$/.test(value) && value > 0 && value <= 100 ?
    undefined : <FormattedMessage {...messages.invalidNumber} />;
  }
  fileChanged(e) {
    this.setState({ file: e[0], fileChanged: true });
  }

  render() {
    return (
      <form style={{ textAlign: 'center' }} onSubmit={this.props.handleSubmit}>
        <Field
          name="title"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.title} />}
          validate={this.required}
        /><br />
        <Field
          name="description"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.description} />}
          validate={this.required}
        /><br />
        <Field
          name="price"
          type="number" min="0" max="100"
          component={TextField}
          floatingLabelText={<FormattedMessage {...messages.price} />}
          validate={[this.required, this.priceCheck]}
        /><br />
        <Field
          name="picture"
          component={renderDropzoneInput}
          onChange={this.fileChanged}
          onFocus={this.fileChanged}
        /><br />
        { this.props.missingFile && !this.state.fileChanged
          && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.required} /></span> }
        { this.props.imageError
          && <span style={{ color: 'red', fontSize: 12 }}><FormattedMessage {...messages.invalidImage} /></span> }
        { this.props.rewardError
          && <span style={{ color: 'red', fontSize: 14 }}><FormattedMessage {...messages.thereWasAnError} /></span> }
        <br /><br />
        <RaisedButton
          label={
            <span style={{ height: '25px', width: '25px' }}>
              <FormattedMessage {...messages.submit} />
            </span>
          }
          primary
          type="submit"
        />
      </form>
    );
  }
}

RewardForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  missingFile: PropTypes.bool.isRequired,
  imageError: PropTypes.bool.isRequired,
  rewardError: PropTypes.bool.isRequired,
};

export default reduxForm({ form: 'rewardForm' })(RewardForm);
