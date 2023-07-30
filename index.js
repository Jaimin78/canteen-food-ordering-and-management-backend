const connectDb = require('./db');
const express = require('express');
connectDb();
const app = express()


app.use(express.json());

//Routes
app.use('/api/user', require('./routes/user'));

// app.get('/', (req, res) => {
//   res.send('<h3>Hello</h3>')
// })

app.listen(5000, () => {
  console.log(`Example app listening on port http://localhost:5000`)
})