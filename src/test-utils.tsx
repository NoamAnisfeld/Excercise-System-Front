import setupStore from './global-state/store.ts'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReactNode } from "react"

export function wrapWithStore(node: ReactNode) {
    const store = setupStore();

    return (
        <ReduxProvider store={store}>
            {node}
        </ReduxProvider>
    );
}

export function wrapWithRouter(element: ReactNode) {
    const router = createBrowserRouter([
        {
            path: '/*',
            element,
        },
    ]);
    
    return <RouterProvider router={router} />;
}