const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const operatorRoutes = require('./routes/operatorRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/operator', operatorRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
