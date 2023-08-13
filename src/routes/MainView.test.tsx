import { test, expect } from 'vitest'
import { wrapWithStore, wrapWithRouter } from '../test-utils'
import { render, screen } from '@testing-library/react'
import MainView from './MainView'

test('MainView', () => {
    const result = render(wrapWithStore(wrapWithRouter(<MainView />)))
    expect(result).toMatchSnapshot();
})