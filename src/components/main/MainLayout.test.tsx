import { test, expect } from 'vitest'
import { wrapWithStore, wrapWithRouter } from '../../test-utils'
import { render } from '@testing-library/react'
import MainLayout from './MainLayout'

test('MainLayout', () => {
    const result = render(wrapWithStore(wrapWithRouter(<MainLayout />)))
    expect(result).toMatchSnapshot();
})