/**
*
* FilterDialog
*
*/

import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { intlShape, injectIntl } from 'react-intl';
import messages from './messages';

// import styled from 'styled-components';


const styles = {
  block: {
    maxWidth: 250,
  },
  radioGroupContainer: {
    margin: '0 auto',
    width: '50%',
    textAlign: 'center',
  },
  radioGroup: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px',
    width: '50%',
    margin: '0 auto',
  },
  radioButton: {
    marginBottom: 16,
    width: 'auto',
  },
  title: {
    fontSize: '20px',
    alignSelf: 'center',
  },
  checkbox: {
    marginBottom: 16,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  row: {
    margin: '0 auto',
  },
  container: {
    display: 'flex',
    paddingTop: '15px',
    paddingBottom: '15px',
  },
  checkboxLabel: {
    fontSize: '18px',
  },
  toggle: {
    marginBottom: 16,
    display: 'block',
  },
};

class FilterDialog extends React.Component {
  constructor(props) {
    super(props);
    // will do something
    this.state = {
      status: props.status,
      risk: props.risk,
      categories: props.categories,
      toggled: props.categories.every((x) => x),
    };
    this.printFilters = this.printFilters.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
  }

  setStatus(value) {
    this.setState({ status: value });
  }

  setRisk(value) {
    this.setState({ risk: value });
  }

  toggleCategory(index, b) {
    const newCategories = this.state.categories;
    newCategories[index] = b;
    this.setState({ categories: newCategories });
    if (this.state.categories.every((x) => x) || this.state.categories.every((x) => !x)) {
      this.setState({ toggled: b });
    }
  }

  toggle(b) {
    const newToggle = b;
    const newCategories = this.state.categories;
    for (let i = 0; i < newCategories.length; i += 1) {
      newCategories[i] = newToggle;
    }
    this.setState({ toggled: newToggle });
    this.setState({ categories: newCategories });
    // console.log(this.state.categories);
  }

  printFilters() {
    console.log(this.state.status);
    console.log(this.state.risk);
    console.log(this.state.categories);
  }

  render() {
    const t = this.props.intl.formatMessage;
    const { open, handleClose } = this.props;
    const filterActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeFilters}
      />,
      <FlatButton
        label="Filter"
        primary
        keyboardFocused
        onTouchTap={this.printFilters}
      />,
    ];
    return (
      <div style={{ borderColor: 'transparent', textAlign: 'center' }}>
        <Dialog
          title={t(messages.filterTitle)}
          actions={filterActions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
          autoScrollBodyContent
          style={{ borderColor: 'transparent', textAlign: 'center' }}
        >
          <div style={{ paddingTop: '15px' }} />
          <span style={styles.title}>Status</span>
          <RadioButtonGroup
            name="status"
            defaultSelected={this.state.status}
            style={styles.radioGroup}
            onChange={(e, value) => this.setStatus(value)}
          >
            <RadioButton
              value="unresolved"
              label="Unresolved"
              style={styles.radioButton}
            />
            <RadioButton
              value="resolved"
              label="Resolved"
              style={styles.radioButton}
            />
            <RadioButton
              value="all"
              label="All"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <span style={styles.title}>Does it pose a risk?</span>
          <RadioButtonGroup
            name="risk"
            defaultSelected={this.state.risk}
            style={styles.radioGroup}
            onChange={(e, value) => this.setRisk(value)}
          >
            <RadioButton
              value="yes"
              label="Yes"
              style={styles.radioButton}
            />
            <RadioButton
              value="no"
              label="No"
              style={styles.radioButton}
            />
            <RadioButton
              value="all"
              label="All"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
          <span style={styles.title}>Categories</span>
          <div style={styles.container}>
            <div style={styles.row}>
              <Checkbox
                label="Road signs"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[0]}
                onCheck={(e, b) => this.toggleCategory(0, b)}
              />
              <Checkbox
                label="Illumination"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[1]}
                onCheck={(e, b) => this.toggleCategory(1, b)}
              />
              <Checkbox
                label="Grove"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[2]}
                onCheck={(e, b) => this.toggleCategory(2, b)}
              />
              <Checkbox
                label="Street furniture"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[3]}
                onCheck={(e, b) => this.toggleCategory(3, b)}
              />
            </div>
            <div style={styles.row}>
              <Checkbox
                label="Trash and cleaning"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[4]}
                onCheck={(e, b) => this.toggleCategory(4, b)}
              />
              <Checkbox
                label="Public transport"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[5]}
                onCheck={(e, b) => this.toggleCategory(5, b)}
              />
              <Checkbox
                label="Suggestion"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[6]}
                onCheck={(e, b) => this.toggleCategory(6, b)}
              />
              <Checkbox
                label="Other"
                style={styles.checkbox}
                labelStyle={styles.checkboxLabel}
                checked={this.state.categories[7]}
                onCheck={(e, b) => this.toggleCategory(7, b)}
              />
            </div>
          </div>
          <Toggle
            label={this.state.toggled ? 'Deselect all' : 'Select all'}
            toggled={this.state.toggled}
            labelPosition="left"
            labelStyle={{ marginLeft: '500px' }} // 0 responsive lmao
            style={styles.toggle}
            onToggle={(e, b) => this.toggle(b)}
          />
        </Dialog>
      </div>
    );
  }

}

FilterDialog.propTypes = {
  risk: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FilterDialog);
