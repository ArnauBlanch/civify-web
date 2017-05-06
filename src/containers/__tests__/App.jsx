import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Testing App', () => {
  let elem;
  beforeEach(() => {
    elem = shallow(<App />);
  });

  it('should update \'open\' when calling \'toggleDrawer\'', () => {
    expect(elem.state('open')).toEqual(false);
    elem.instance().toggleDrawer();
    expect(elem.state('open')).toEqual(true);
    elem.instance().toggleDrawer();
    expect(elem.state('open')).toEqual(false);
  });
});
