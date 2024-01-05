import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import * as clientStore from '../../../store/client-store';
import * as sessions from '../../../lib/sessions';
import RegisterUser from "./register-user";

jest.mock('../../../store/client-store', () => ({
  getClientStore: jest.fn(),
  updateClientStore: jest.fn()
}));

jest.mock('../../../lib/sessions', () => ({
  getCurrentSession: jest.fn()
}));

describe('RegisterUser', () => {
  beforeEach(() => {
    // Mock implementations
    (clientStore.getClientStore as jest.Mock).mockImplementation(() => ({ currentUser: '', expiresAt: null }));
    (sessions.getCurrentSession as jest.Mock).mockResolvedValue({ username: 'testUser', expiresAt: Date.now() + 10000 });
    let global: any = window;
    global.fetch = jest.fn(() => Promise.resolve({ status: 200, json: () => Promise.resolve({ username: 'newUser', expiresAt: Date.now() + 10000 }) }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', async () => {
     await act(async () => {
      render(<RegisterUser/>);
    })
    expect(screen.getByPlaceholderText('Input your chat name')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });


});
