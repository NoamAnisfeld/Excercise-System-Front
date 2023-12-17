import { test, expect } from 'vitest'
import { wrapWithStore, wrapWithRouter } from '../../test-utils'
import { render } from '@testing-library/react'
import MainOptions from './MainOptions'

test('MainOptions', () => {
    const result = render(wrapWithStore(wrapWithRouter(<MainOptions />)))
    expect(result).toMatchSnapshot();
})