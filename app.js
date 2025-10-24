import dotenv from 'dotenv';
import express from 'express';
import usersRouter from './src/routes/user.js';


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});
