require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const clientRouter = require('./routes/clientRoutes');
const adminRouter = require('./routes/adminRoutes');
const limiter = require('./utils/rateLimiter');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());

app.use('/client/clientProfileInfo/:id', limiter);

app.use('/auth', authRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);

app.listen(PORT);
