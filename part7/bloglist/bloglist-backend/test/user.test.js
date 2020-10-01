const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

const mongoose = require('mongoose')

beforeEach(async () => {
    await User.deleteMany({})
})


test('post a new user to server.', async () => {
    const newuser = {
        name: 'jiangzemin',
        userName: 'exciting',
        passwd: '+1s+1s+1s+1s+1s+1s'
    }

    const res = await api.post('/api/users').send(newuser)

    expect(res.body.name).toBe(newuser.name)
    expect(res.body.userName).toBe(newuser.userName)
})
test('post a new user invalid to server.', async () => {
    const newuserNoname = {
        userName: 'exciting',
        passwd: '+1s+1s+1s+1s+1s+1s'
    }
    const newuserNousername = {
        name: 'jiangzemin',
        passwd: '+1s+1s+1s+1s+1s+1s'
    }
    const newuserNameShort = {
        name: 'aa',
        userName: 'exciting',
        passwd: '+1s+1s+1s+1s+1s+1s'
    }
    const newuserUserNameShort = {
        name: 'jiagzemon',
        userName: 'aa',
        passwd: '+1s+1s+1s+1s+1s+1s'
    }

    const newuserPasswdShort = {
        name: 'jiangzemin',
        userName: 'exciting',
        passwd: '+1s+1s+1s'
    }

    const res1 = await api.post('/api/users').send(newuserNoname)
    expect(res1.status).toBe(400)
    const res2 = await api.post('/api/users').send(newuserNousername)
    expect(res2.status).toBe(400)
    const res3 = await api.post('/api/users').send(newuserNameShort)
    expect(res3.status).toBe(400)
    const res4 = await api.post('/api/users').send(newuserUserNameShort)
    expect(res4.status).toBe(400)
    const res5 = await api.post('/api/users').send(newuserPasswdShort)
    expect(res5.status).toBe(400)



})


afterAll(() => {
    mongoose.connection.close()
  }) 