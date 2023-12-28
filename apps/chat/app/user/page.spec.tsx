import { render } from '@testing-library/react';

import Login from './page';

describe('Login', () => {
  it.skip('should render successfully', async () => {
    const { baseElement } = render(<Login />);
    expect(baseElement).toBeTruthy();
  });
});
