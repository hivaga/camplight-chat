import { render } from '@testing-library/react';

import UserInput, {CheckInput} from './check-input';

describe('CheckInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckInput formName={'test'} />);
    expect(baseElement).toBeTruthy();
  });
});
