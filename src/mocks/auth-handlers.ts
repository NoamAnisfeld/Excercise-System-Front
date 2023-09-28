import { RestRequest, rest } from 'msw'
import users from './users.json'
import { HTTP } from '../utils'


interface Token {
    type: 'refresh' | 'access',
    userId: number,
    createdAt: number,
    expired: boolean,
}


function validateRefreshToken(token: string): number | null {

    try {
        const { type, userId, expired } = JSON.parse(token) as Token;
        const user = users.find(item => userId === item.id);

        if (type === 'refresh' && !expired && user) {
            return Number(userId);
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


function validateAccessToken(token: string): number | null {

    try {
        const { type, userId, expired } = JSON.parse(token) as Token;
        const user = users.find(item => userId === item.id);

        if (type === 'access' && !expired && user) {
            return Number(userId);
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


export function validateAuthorizedUser(req: RestRequest) {

    const accessToken = (req.headers.get('Authorization') || '').replace(/^Bearer /, '');
    const userId = validateAccessToken(accessToken);
    return userId;
}


export const authHandlers = [

    rest.post('/api/token/', async (req, res, ctx) => {

        const { email, password } = await req.json();

        const user = users.find(item => email === item.email && /* mock */password === item.first_name)

        if (user) {

            const refreshToken: Token = {
                type: 'refresh',
                userId: user.id,
                createdAt: Date.now(),
                expired: false,
            };
            const accessToken: Token = {
                type: 'access',
                userId: user.id,
                createdAt: Date.now(),
                expired: false,
            };

            return res(
                ctx.status(HTTP.OK),
                ctx.json({
                    refresh: JSON.stringify(refreshToken),
                    access: JSON.stringify(accessToken),
                })
            )
        } else {
            return res(
                ctx.status(HTTP.Unauthorized),
            )
        }
    }),

    rest.post('/api/token/refresh/', async (req, res, ctx) => {

        try {
            const { refresh: refreshToken } = await req.json();
            const userId = validateRefreshToken(refreshToken);

            if (userId === null) {
                return res(
                    ctx.status(HTTP.Unauthorized),
                );
            }

            const accessToken: Token = {
                type: 'access',
                userId: userId,
                createdAt: Date.now(),
                expired: false,
            }

            return res(
                ctx.status(HTTP.OK),
                ctx.json({
                    access: JSON.stringify(accessToken),
                }),
            );
        } catch (e) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }
    }),
];