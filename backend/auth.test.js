import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Adjust the path to your main server file
import User from '../controllers/userCntrl.js'; // Adjust the path to your User model

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should sign in and store user data in MongoDB', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password123',
    };

    // Register the user
    await chai.request(app)
      .post('/api/auth/register')
      .send(user);

    // Sign in the user
    const res = await chai.request(app)
      .post('/api/auth/signin')
      .send(user);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');

    // Check if the user is stored in MongoDB
    const storedUser = await User.findOne({ email: user.email });
    expect(storedUser).to.not.be.null;
    expect(storedUser.email).to.equal(user.email);
  });
});