import React from 'react';
import { shallowWithContext, mockT } from '../../utils/tests';
import { fAppBarButtons as AppBarButtons } from '../AppBarButtons';

describe('AppBarButtons test', () => {
  let elem;
  beforeEach(() => {
    elem = shallowWithContext(<AppBarButtons t={mockT} />);
  });

  it('should contain one \'nav\' element', () => {
    expect(elem.find('nav').length).toEqual(1);
  });

  it('should contain 2 FlatButtons', () => {
    expect(elem.children('FlatButton').length).toEqual(2);
  });
});
