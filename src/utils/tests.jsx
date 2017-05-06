import { getMuiTheme } from 'material-ui/styles';
import { shallow } from 'enzyme';

const muiTheme = getMuiTheme();
export function shallowWithContext(node) {
  return shallow(node, { context: { muiTheme } });
}

export function mockT(key) {
  return key;
}
