import { setupWorker } from 'msw'
import { handlers } from './handlers'

const worker = setupWorker(...handlers);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || location.origin;
worker.start({
    onUnhandledRequest(req) {
        if (req.url.origin === location.origin) {
            if (req.url.pathname.startsWith('/api/')) {
                console.warn('Unhandled same-origin API request: ' + req.url.href);
            } else {
                console.log('Non-API same-origin request: ' + req.url.href);
            }
        } else if (req.url.origin === API_BASE_URL) {
            if (req.url.pathname.startsWith('/api/')) {
                console.log('API request passed to the API server: ' + req.url.href);
            } else {
                console.warn('Non-API request passed to the API server: ' + req.url.href);
            }
        } else {
            console.log('External request: ' + req.url.href)
        }
    }
});