const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//loading the routes themself
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/student', (req, res) => {
    res.render('student');
});

app.get('/advisor', (req, res) => {
    res.render('advisor');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

