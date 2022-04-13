# Store Manager

Store Manager is a RESTful API build by the principles of MSC. It is a sales manager system where the client can visualize, create, update and delete products and sales.

## Technologies

 - Node.js
 - Express.js
 - MySQL
 - Mocha
 - Chai
 - Sinon

## Installation and usage

   `npm install`
   
   `npm start`

- To run in development mode:

 `npm run debug`

- To run the tests:

`npm run test:mocha`

## Challenges

The main challenge of this project was to build an app by the concept of Test-Driven Development, which was a first for me, and certainly a big challenge. At first, it was hard to even know how to start. I realised that, usually, when I start to code, I don't have yet a clear path to follow about all the logics and the bussiness rules of the app. So, when I had to start by writing the tests, I had to spend a unexpected amount of time only thinking and planning all the functions. Only then, I understood the importancy of TDD - after breaking that initial bareer of planning first, all the other things came easier, and the development ended up being much faster than usually.

The second main learning I gained from this project was really understand the concepts of `stubs` and `mocks`. Working with databases - or even, *without* the database - helped me understand better how and why we use pre-conceived return for functions on the test environment, and this was a knoledge that I always felt like I missed when I was studying frontend only.

For last (but not least), building well structured layers for the app was a challenge apart, but also a great learning opportunity - it showed me how important organization is for all projects. I do plan to apply a lot of concepts of MSC in the future, not only in backend projects but all of them.