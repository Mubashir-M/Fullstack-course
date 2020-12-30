describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mati Luukanen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('login successful')
    })

    it('fails with wrong credentials', function() {

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('väärin')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#newBlog-button').click()
      cy.get('#title').type('blog-101')
      cy.get('#author').type('Luukkanen Matti')
      cy.get('#url').type('Luukkanen-Blog.com')
      cy.get('#create-button').click()

      cy.contains('blog-101')
      cy.contains('Luukkanen-Blog.com')

    })

  })

  describe.only('When logged in and blog created', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('#newBlog-button').click()
      cy.get('#title').type('blog-101')
      cy.get('#author').type('Luukkanen Matti')
      cy.get('#url').type('Luukkanen-Blog.com')
      cy.get('#create-button').click()
    })

    it('A blog can be given a like after its creation', function() {

      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it ('A blog can be removed by creator after creation', function() {

      cy.get('#view-button').click()
      cy.get('#remove-button').click()

      cy.contains('blog-101').not()
    })

    it ('Blogs sorted descending order of likes', function() {

      cy.get('#view-button').click()
      cy.get('#like-button').click()


      cy.visit('http://localhost:3000')

      cy.get('#newBlog-button').click()
      cy.get('#title').type('blog-202')
      cy.get('#author').type('Luukkanen Matti')
      cy.get('#url').type('Luukkanen-Blog2.com')
      cy.get('#create-button').click()

      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.visit('http://localhost:3000')
      cy.get('.blog').eq(1).contains('view').click()
      cy.get('.blog').eq(1).contains('like').click()


      cy.visit('http://localhost:3000')

      cy.get('.blog').eq(0).contains('blog-202 by Luukkanen Matti')

    })

  })

})