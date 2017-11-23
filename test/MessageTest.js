process.env.NODE_ENV = 'testing';
const app = require('./../app');
const assert = require('assert');
const request = require('supertest');
const express = require('express');
const Message = require('./../models/Message');

describe('Message', function () {
    it('Can create message', function() {
        const message = {
            email: 'johndoe@example.com',
            body: 'Hello'
        };

        return request(app)
            .post('/api/messages')
            .send(message)
            .expect(201)
            .then(response => {
                Message.findOne({_id: response.body.id}).then(message => {
                    assert(response.body.id === String(message._id));
                });
            });
        });

    it('It cannot store message w/o email and body', function() {
        return request(app)
            .post('/api/messages')
            .send({})
            .expect(422)
            .then(response => {
                Message.find({}).count().count().then(count => {
                    assert(count === 0);
                });
            });
        });

    it('It can find message by id', function(done) {
        Message.create({
            email: 'johndoe@example.com',
            body: 'Hello'
        }).then(message => {
            request(app)
            .get(`/api/messages/single/${String(message.id)}`)
            .expect(200)
            .end((error, response) => {
                assert(response.body.id === String(message._id));
            });

            done();
        });
    });
});
