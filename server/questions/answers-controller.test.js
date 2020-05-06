const dbHandler = require('../mock-db-handler');

const answersController = require('./answers-controller');

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Answers Controller', () => {
  test("Não retornar exceção quando os campos 'text' e 'user' estiverem preenchidos", async () => {
    const req = { 
      params: { },
      body: { text: 'teste', user: 'teste' }
    }
    const res = {
      send: jest.fn(),
      json: jest.fn(),
      status: function(responseStatus) {
        return this; 
      }
    };

    await answersController.postAnswer(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true
      })
    );
  });
  
  test("Deve retornar exceção quando o campos 'text' não tiver preenchido", async () => {
    const req = { 
      params: { questionId: 'id123' },
      body: { text: '', user: 'teste' }
    }
    const res = {
      send: jest.fn(),
      json: jest.fn(),
      status: function(responseStatus) {
        return this; 
      }
    };

    await answersController.postAnswer(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false
      })
    );
  });
});
