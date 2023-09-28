import { ApiSession } from "./requests/auth"

export let apiSession: ApiSession | null = new ApiSession();

export function setApiSession(newApiSession: typeof apiSession) {
    apiSession = newApiSession;
}