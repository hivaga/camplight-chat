import { render } from '@testing-library/react';

import Register from './page';

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Register />);
    expect(baseElement).toBeTruthy();
  });
});
