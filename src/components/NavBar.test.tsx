import { test, expect } from 'vitest'
import { wrapWithRouter } from '../test-utils'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

test('NavBar when logged in', () => {
    const username = 'ישראל ישראלי';

    const result = render(wrapWithRouter(<NavBar username={username} />));
    expect(result).toMatchSnapshot();

    const usernameDisplay = screen.queryByText(username);
    expect(usernameDisplay).not.toBeNull();
})

test('NavBar when logged out', () => {
    const result = render(wrapWithRouter(<NavBar />));
    expect(result).toMatchSnapshot();
})