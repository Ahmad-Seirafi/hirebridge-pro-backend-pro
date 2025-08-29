import { api } from './setup.js';

describe('Auth flow', () => {
  it('registers, logs in, refreshes token, and gets /me', async () => {
    const reg = await api.post('/api/auth/register').send({ name: 'Ahmad', email: 'ahmad@test.com', password: 'secret12' }).expect(201);
    expect(reg.body.tokens.refresh).toBeDefined();
    const login = await api.post('/api/auth/login').send({ email: 'ahmad@test.com', password: 'secret12' }).expect(200);
    const refresh = await api.post('/api/auth/refresh').send({ refreshToken: login.body.tokens.refresh }).expect(200);
    const token = refresh.body.accessToken;
    const me = await api.get('/api/users/me').set('Authorization', `Bearer ${token}`).expect(200);
    expect(me.body.user.email).toBe('ahmad@test.com');
  });
});
