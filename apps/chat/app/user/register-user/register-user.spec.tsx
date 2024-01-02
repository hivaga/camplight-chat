import { render } from '@testing-library/react';

import RegisterUser from './register-user';

describe('RegisterUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegisterUser />);
    expect(baseElement).toBeTruthy();
  });
});
