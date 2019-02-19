
const request = require('request');
const serverURL = 'http://127.0.0.1:8080';

describe('Server', () => {
    test('GET request should return listings', (done) => {
        request({
            url: `${serverURL}/abibas/4/suggestions`,
            method: 'GET'
        }, (err, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(body).length).not.toBe(0);
        });
        done();
    });

    // test('GET request should not contain listing id', (done) => {
    //     request({

    // })
}) 