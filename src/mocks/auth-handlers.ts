import { RestRequest, rest } from 'msw'
import mockTokens from './tokens.json'
import mockUsers from './users.json'
import originalJwtDecode from 'jwt-decode'
import { ApiTokenClaims, apiTokenClaimsSchema } from '../requests/schemas'
import { HTTP } from '../utils'


const decodeCache: Record<string, ApiTokenClaims> = {}
function jwtDecode(token: string) {
    try {
        return decodeCache[token] ||
        (decodeCache[token] = apiTokenClaimsSchema.parse(originalJwtDecode(token)));
    } catch (e) {
        console.log(token, originalJwtDecode(token));
        throw e;
    }
}


function validateRefreshToken(token: string): number | null {

    try {
        const {
            token_type,
            exp,
            user_id,
        } = apiTokenClaimsSchema.parse(jwtDecode(token));
        const user = mockUsers.find(item => user_id === item.id);

        if (token_type === 'refresh' && new Date() < new Date(exp * 1000) && user) {
            return user_id;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


function validateAccessToken(token: string): number | null {

    try {
        const {
            token_type,
            user_id,
            exp
        } = apiTokenClaimsSchema.parse(jwtDecode(token));
        const user = mockUsers.find(item => user_id === item.id);

        if (token_type === 'access' && new Date() < new Date(exp * 1000) && user) {
            return Number(user_id);
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

        const user = mockUsers.find(item => email === item.email && /* mock */password === item.first_name)
        if (user) {
            const refreshToken = mockTokens.validRefreshTokens.find(token => jwtDecode(token).user_id === user.id);
            const accessToken = mockTokens.validAccessTokens.find(token => jwtDecode(token).user_id === user.id);

            if (refreshToken && accessToken) {

                return res(
                    ctx.status(HTTP.OK),
                    ctx.json({
                        refresh: refreshToken,
                        access: accessToken,
                    })
                )
            }
        }

        return res(
            ctx.status(HTTP.Unauthorized),
        )
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

            const accessToken = mockTokens.validAccessTokens.find(token => jwtDecode(token).user_id === userId);
            if (accessToken) {
                return res(
                    ctx.status(HTTP.OK),
                    ctx.json({
                        access: accessToken,
                    }),
                );
            } else {
                return res(
                    ctx.status(HTTP.InternalServerError),
                    ctx.text('Mock tokens error - cannot find a matching token')
                )

            }
        } catch (e) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }
    }),
];