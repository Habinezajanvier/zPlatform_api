import request from 'supertest';
import app from '../src/app';

describe('Index file', () => {
  it('Should return 200 if successfully reach on', async ():Promise<void> => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
  it("Should return 404 if no route found", async ():Promise<void> =>{
    const res = await request(app).get('/not_found');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  })
});