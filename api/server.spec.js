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

describe('get /api/persons', () => {
    it('should get a 200 upon success', () => {
        request(server).get('/api/persons')
            .then(response => {
                expect(response.status).toBe(200);
            })
    })
    it('should return json response type', () => {
        request(server).get('/api/persons')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
    })
})

describe('post /', () => {
    it('should return 200 status code', () => {
        console.time();

        return request(server)
            .post('/api/persons')
            .send({ name: 'tammy' })
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.status).toBe(200);
                console.timeEnd();
            })
    });
})

describe('post /', () => {
    it('checking response type', () => {
        return request(server)
            .post('/api/persons')
            .send({ name: 'turdly' })
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })

    });
})