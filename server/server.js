const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 6969;

const app = express();
app.use('/', express.static(path.join(__dirname, '../client/build')));

app.listen(PORT, () => console.log(`SERVER SERVING @ PORT ${PORT}`));