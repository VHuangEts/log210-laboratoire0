// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import { application, response } from 'express';
import 'jest-extended';
import supertest from 'supertest'
import app from '../../../src/app';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  
  let joueur1 : any, joueur2 : any;

  beforeAll(async () => {
    joueur1 = await request.post('/api/v1/jeu/creerJoueur').send({nom : 'Joueur1'});
    joueur2 = await request.post('/api/v1/jeu/creerJoueur').send({nom : 'Joueur2'});
  })

  it("devrait redémarrer le jeu avec succès et retourner un status 200", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait ne plus avoir de joueurs après redémarrage", async () => {
    const joueursResponse = await request.get('/api/v1/jeu/joueurs');
    expect(joueursResponse.body.length).toBe(undefined);
  });

  it("devrait retourner 404 lorsqu'on joue", async () => {

    const response = await request.get('/api/v1/jeu/jouer/');
    expect(response.status).toBe(404);
    

  })

});

/*describe('GET /api/v1/jeu/redemarrerJeu', () => {
  let joueur1 : any, joueur2 : any;

  beforeAll(async () => {
    joueur1 = await request.post('/api/v1/jeu/creerJoueur').send({nom : 'Joueur1'});
    joueur2 = await request.post('/api/v1/jeu/creerJoueur').send({nom : 'Joueur2'});
  })

  it("devrait redémarrer le jeu avec succès et retourner un status 200", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait ne plus avoir de joueurs après redémarrage", async () => {
    const joueursResponse = await request.get('/api/v1/jeu/joueurs');
    expect(joueursResponse.body.length).toBe(undefined);
  });

  it("devrait retourner 404 lorsqu'on joue", async () => {

    const response = await request.get('/api/v1/jeu/jouer/');
    expect(response.status).toBe(404);
    

  })

});*/
