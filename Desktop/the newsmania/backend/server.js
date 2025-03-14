require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');



const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
