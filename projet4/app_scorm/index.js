const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');

app.set("view engine", 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (path.endsWith('.woff')) {
        res.setHeader('Content-Type', 'font/woff');
      } else if (path.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      }
    }
  }));

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/ok', (req, res) => {
    res.sendFile(path.join(__dirname,'./scorm_module1/scormcontent/test/index.html'));
});

app.get('/acceuil', (req, res) => {
  res.render('pageAcceuil')
})

app.listen(port, ()=>{
    console.log(port);
});
