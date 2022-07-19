const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { PORT } = require('./keys');
const connectDB = require('./config/connectDB');

const authRoutes = require('./routes/authRoutes');
const ruleRoutes = require('./routes/ruleRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

connectDB();

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.use('/auth', authRoutes);
app.use('/rule', ruleRoutes);
app.use('/user', userRoutes);


