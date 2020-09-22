import {it, describe} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../App';

chai.use(chaiHttp);
const expect = chai.expect;

// describe('baseRoute',()=>{
//   it('should have a message prop', () => {
//     return chai.request(app).get('/api/v')
//       .then(res => {
//         expect(res.body.message).to.eql('Hello World!');
//       });
//   });
// });

describe('POST /api/v1/auth/register', () => {
  it('should give user', () => {
    const inputs = {
      email: 'testing@example.com',
      password: 'testing123',
      name: 'test',
    };

    return chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(inputs)
      .then((res) => {
        expect(res).to.be.json(res.body)
      })
      .catch((err) => console.log(err));
  });
});

// describe('GET /api/v1/heroes',()=>{
//   it('should give wolverine',()=>{
//     return chai.request(app).get('/api/v1/heroes').then(res=>{
//       const wolverine = res.body.find((hero:IHero)=>hero.name==='Wolverine');

//       expect(wolverine).to.exist;
//     });
//   });
// });
