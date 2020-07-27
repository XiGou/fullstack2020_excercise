const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')


const mongoose = require('mongoose')

const newuser = {
    name: 'jiangzemin',
    userName: 'exciting',
    passwd: '+1s+1s+1s+1s+1s+1s'
    }
const blog = {
    title: "React patterns",
    url: "https://reactpatterns.com/",
    likes: 7
  }

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(newuser)
    await api.post('/api/users').send({...newuser, userName:'ssssssss'})
})

test('login test.', async ()=> {
    let loginResponse =  await api.post('/api/login').send(newuser)
    console.log(loginResponse.body)
    expect(loginResponse.body.token).toBeDefined()
    expect(loginResponse.body.id).toBeDefined()
    expect(loginResponse.body.userName).toBeDefined()

})
test('login and post test.', async ()=> {
    let loginResponse =  await api.post('/api/login').send(newuser)
    
    let blogCreateResponse =  await api.post('/api/blogs')
                            .set('authorization',`Bearer ${loginResponse.body.token}` )
                            .send(blog)
    expect(blogCreateResponse.body.author).toBeDefined()
    expect(blogCreateResponse.body.id).toBeDefined()
    expect(blogCreateResponse.body.title).toBeDefined()

})
test('delete permission test.', async ()=> {
    let loginResponse1 =  await api.post('/api/login').send(newuser)
    let loginResponse2 =  await api.post('/api/login').send({...newuser, userName:'ssssssss'})
    
    // console.log(loginResponse1)
    let blogCreateResponse =  await api.post('/api/blogs')
                            .set('authorization',`Bearer ${loginResponse1.body.token}` )
                            .send(blog)
    expect(blogCreateResponse.body.author).toBeDefined()
    expect(blogCreateResponse.body.id).toBeDefined()
    expect(blogCreateResponse.body.title).toBeDefined()

    let delRes1 = await api.delete(`/api/blogs/${blogCreateResponse.body.id}`)
                            .set('authorization',`Bearer ${loginResponse2.body.token}` )
                
    expect(delRes1.status).toBe(403)
    let delRes2 = await api.delete(`/api/blogs/${blogCreateResponse.body.id}`)
                            .set('authorization',`Bearer ${loginResponse1.body.token}` )

    expect(delRes2.status).toBe(204)
})

afterAll(() => {
    mongoose.connection.close()
}) 