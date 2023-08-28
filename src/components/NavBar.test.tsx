import { test, expect } from 'vitest'
import { wrapWithRouter } from '../test-utils'
import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'

test('NavBar with username', () => {
    const username = 'ישראל ישראלי';

    const result = render(wrapWithRouter(<NavBar username={username} />));
    expect(result).toMatchSnapshot();

    const usernameDisplay = screen.queryByText(username);
    expect(usernameDisplay).not.toBeNull;

    const exitButton = screen.queryByText('יציאה');
    expect(exitButton?.tagName).toBe('BUTTON');
})

test('NavBar without username', () => {
    const result = render(wrapWithRouter(<NavBar />));
    expect(result).toMatchSnapshot();

    const usernameDisplay = screen.queryByText('ברוכים הבאים');
    expect(usernameDisplay).not.toBeNull;

    const exitButton = screen.queryByText('יציאה');
    expect(exitButton).toBeNull;
})