const { func } = require("prop-types")

describe('Bloglist ', function() {
  beforeEach(function(){
    cy.request('POST', 'http://192.168.11.110:3001/api/reset')
     const newUser = {
      name: 'jiangzemin',
      userName: 'exciting',
      passwd: '+1s+1s+1s+1s+1s+1s'
    }
    cy.request('POST', 'http://192.168.11.110:3001/api/users', newUser)

    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('Log in to application')
  })

  it('login form worked.', function (){

    cy.get('#usernameInput').type('exciting')
    cy.get('#passwdInput').type('+1s+1s+1s+1s+1s+1s')
    cy.get('#loginBtn').click()

    cy.contains('has logged in.')

  })
  it('login failed test.', function (){
    cy.get('#usernameInput').type('exciting')
    cy.get('#passwdInput').type('12345678999999')
    cy.get('#loginBtn').click()
    
    cy.contains('Request failed with status code 401')

  })

  describe.only('When logged in', function(){
    beforeEach(function(){
      cy.get('#usernameInput').type('exciting')
      cy.get('#passwdInput').type('+1s+1s+1s+1s+1s+1s')
      cy.get('#loginBtn').click()

      cy.contains('has logged in.')
    })

    it('a blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#urlInput').type('www.china.cn')
      cy.get('#authorInput').type('robert laurence kunn')
      cy.get('#titleInput').type('the man who changed China')
      cy.get('#createBlogBtn').click()
      cy.contains('the man who changed China')

    })

    describe.only('When created Blog', function(){
      beforeEach(function(){
        cy.contains('new blog').click()
        cy.get('#urlInput').type('www.china.cn')
        cy.get('#authorInput').type('robert laurence kunn')
        cy.get('#titleInput').type('the man who changed China')
        cy.get('#createBlogBtn').click()
        
        cy.contains('new blog').click()
        cy.get('#urlInput').clear().type('www.china.cn')
        cy.get('#authorInput').clear().type('robert laurence kunn')
        cy.get('#titleInput').clear().type('the man who changed Japan')
        cy.get('#createBlogBtn').click()
  
        cy.contains('the man who changed China')
        cy.contains('the man who changed Japan')
      })

      it('canlike a blog', function(){
        cy.contains('View detail').click()
        cy.contains('Likes: ').should('have.text', 'Likes: 0')
        cy.contains('like').click()
        cy.contains('Likes: ').should('have.text', 'Likes: 0')  // not yet implement the like opreation
      })

      it('who created a blog can delete it', function(){
  
        cy.contains('View detail').click()
        cy.contains('delete Blog').click()
        cy.contains('the man who changed China').should('not.exist')
  
      })

      describe.only('ssss', function(){

        it('blog is ordered by likes.', function(){
    
          cy.contains('the man who changed Japan').parent().contains('View detail').click()
    
    
          cy.contains('like').click()
          cy.contains('like').click()
          cy.contains('like').click()
          
          cy.get('.blog')
            .then($blogs => {
              return $blogs.map((index, html) => Cypress.$(html).text().substr(6)).get()
            })
            .should
    
        })
      })
      
    })




  })

})