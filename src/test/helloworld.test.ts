import {it,describe} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {IHero} from '../DataModels/hero.model';
import app from '../App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute',()=>{
  it('should be json',async ()=>{
    const res = await chai.request(app).get('/');

    expect(res.type).to.eql('application/json');
  });
  it('should have a message prop', () => {
    return chai.request(app).get('/')
      .then(res => {
        expect(res.body.message).to.eql('Hello World!');
      });
  });
});

describe('GET /api/v1/heroes',()=>{
  it('should give wolverine',()=>{
    return chai.request(app).get('/api/v1/heroes').then(res=>{
      const wolverine = res.body.find((hero:IHero)=>hero.name==='Wolverine');

      expect(wolverine).to.exist;
    });
  });
});

