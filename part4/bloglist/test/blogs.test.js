const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blogs')

const mongoose = require('mongoose')
const User = require('../models/user')



const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ]
const newuser = {
    name: 'jiangzemin',
    userName: 'exciting',
    passwd: '+1s+1s+1s+1s+1s+1s'
    }
  

beforeEach(async () => {

    await User.deleteMany({})
    let savedUserResponse =  await api.post('/api/users').send(newuser)
    let loginResponse =  await api.post('/api/login').send(newuser)

    await Blog.deleteMany({})
    await api.post('/api/blogs')
                .set('authorization', `Bearer ${loginResponse.body.token}`)
                .send({...blogs[0], author: loginResponse.body.id})
    // for(let blog of blogs){
        
    //     console.log(res.body)          
    // } 
    
})


test("get /api/blogs return right amount of blogs.", async ()=> {
    const response = await api.get('/api/blogs')
    
    expect(response.type).toBe('application/json')

})

test('identifier name "id".', async ()=> {
    const response = await api.get('/api/blogs')
    
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    expect(response.body[0].id).toBeDefined()
})

test('post one Blog.', async ()=> {
    
    const newBlog = {
        title: 'How to get over the firewall',
        author: 'anoymous',
        url: 'www.404.com',
        likes: 404
      }
    let savedUserResponse =  await api.post('/api/login')
                            .send(newuser)
    
    console.log(savedUserResponse.body)
    
    const response = await api.post('/api/blogs')
                    .set('authorization', `Bearer ${savedUserResponse.body.token}`)
                    .send(newBlog)
    expect(response.body.url).toBe(newBlog.url)
  
    
})


test('blog like test(post no like, it will be 0).', async ()=> {

    const newBlog = {
        title: 'How to get over the firewall',
        author: 'anoymous',
        url: 'www.404.com'
      }
    
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
})
test('blog list test(no title oe url return status 400).', async ()=> {

    const newBlogNotitle = {
        author: 'anoymous',
        url: 'www.404.com'
      }
    
    const newBlogNourl = {
        title: 'How to get over the firewall',
        author: 'anoymous'
      }
    
    const response1 = await api.post('/api/blogs').send(newBlogNotitle)
    expect(response1.status).toBe(400)
    const response2 = await api.post('/api/blogs').send(newBlogNourl)
    expect(response2.status).toBe(400)
})

test('blog delete test.', async ()=> {
    const newBlog = {
        title: 'How to get over the firewall',
        author: 'anoymous',
        url: 'www.404.com'
      }
    const response1 = await api.post('/api/blogs').send(newBlog)
    expect(response1.status).toBe(201)

    const response2 = await api.delete(`/api/blogs/${response1.body.id}`)
    expect(response2.status).toBe(204)
})

test('blog likes update test.', async ()=> {
    const newBlog = {
        title: 'How to get over the firewall',
        author: 'anoymous',
        url: 'www.404.com'
      }
    const response1 = await api.post('/api/blogs').send(newBlog)
    expect(response1.status).toBe(201)

    const response2 = await api.put(`/api/blogs/${response1.body.id}`).send({...newBlog, likes:10})
    // console.log(response2.body)
    expect(response2.body.likes).toBe(10)
})

test('mongoose populate test', async () => {
    const res = await api.get('/api/blogs')
    console.log(res.body[0])
    expect(res.body[0].author.name).toBeDefined()
    expect(res.body[0].author.userName).toBeDefined()
    expect(res.body[0].author.id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
  }) 