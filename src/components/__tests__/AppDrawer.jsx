import React from 'react';
import { shallowWithContext, mockT } from '../../utils/tests';
import { fAppDrawer as AppDrawer } from '../AppDrawer';

describe('Testing AppDrawer', () => {
  let elem;
  const open = false;
  const toggleDrawer = jest.fn();
  beforeEach(() => {
    elem = shallowWithContext(
      <AppDrawer
        t={mockT}
        open={open}
        toggleDrawer={toggleDrawer}
      />);
  });

  it('should contain a Drawer with an AppBar', () => {
    expect(elem.find('Drawer').length).toEqual(1);
    expect(elem.find('Drawer').children('AppBar').length).toEqual(1);
  });

  it('should have 2 Links inside Drawer', () => {
    expect(elem.find('Drawer').children('Link').length).toEqual(2);
  });
});
