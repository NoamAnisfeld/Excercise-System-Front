import { ApiSession } from "./requests/auth"

export let apiSession: ApiSession | null = null;

export function setApiSession(newApiSession: typeof apiSession) {
    apiSession = newApiSession;
}