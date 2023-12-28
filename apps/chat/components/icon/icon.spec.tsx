import { render } from '@testing-library/react';

import Icon from './icon';

describe('Icon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Icon type={'success'} />);
    expect(baseElement).toBeTruthy();
  });
});
