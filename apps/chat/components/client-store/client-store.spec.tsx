import { render } from '@testing-library/react';

import ClientStore from './client-store';

describe('SessionStore', () => {
  it('should render successfully', () => {
    const state = {currentUser: 'Tester'};
    const { baseElement } = render(<ClientStore currentUser={state.currentUser}/>);
    expect(baseElement).toBeTruthy();
  });
});
