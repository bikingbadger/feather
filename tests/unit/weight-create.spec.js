const request = require('supertest');
//const app = require('../server');
describe('Post Endpoints', () => {
  it('should create a new weight', async () => {
    const res = await request('http://localhost:9000')
      .post('/.netlify/functions/weight-create')
      .send({
        weightDate: '2020-05-10',
        weightKilograms: 87,
        fatPercent: 12,
        weightBoneKilograms: 5,
        waterPercent: 25,
        weightMuscleKilograms: 71,
        bellyIndex: 5.5,
      });
    expect(res.statusCode).toEqual(201);

    //expect(res.body).toHaveProperty('weightKilograms');
  });
});
