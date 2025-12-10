import express from 'express';
import hbs from 'hbs';

const app = express();
const port = 3000;

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', 'src/views');

app.use('/static', express.static('src/public'));

app.get('/hello', (req, res) => {
    res.send('Hello World');
})

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/project-detail', (req, res) => {
    res.render('project-detail');
});

app.listen(port, () => {
    console.log(`Express js application is listening on port ${port}`);
})
