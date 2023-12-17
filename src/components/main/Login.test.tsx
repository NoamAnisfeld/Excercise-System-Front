import { test, expect } from 'vitest'
import { wrapWithStore, wrapWithRouter } from '../../test-utils'
import { render } from '@testing-library/react'
import Login from './Login'

test('Login', () => {
    const result = render(wrapWithStore(wrapWithRouter(<Login />)))
    expect(result).toMatchSnapshot();
})