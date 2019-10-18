const server = require('./server.js');
const request = require('supertest');

describe('verify testing environment', () => {
    it('test that environment is testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});

describe('GET /', () => {
    it('should return 200 status code', () => {
        return request(server).get('/')
            .then(response => {
                expect(response.status).toBe(200);

            })
    });

    it('should return with json', () => {
        request(server).get('/')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
    });

    it('should return with json message', () => {
        request(server).get('/')
            .then(response => {
                expect(response.body.message).toBe('good to go')
            })
    })
});