const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');
const { url } = require('inspector');

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
app.get('/index2', (req,res) => {
  let id = '';
  let groupe = '';
  let noGroupe = (Math.random()*4) + 1
  if (noGroupe < 3) {
    groupe = noGroupe == 1 ? 'A' : 'B';
} else {
    groupe = noGroupe == 3 ? 'C' : 'D';
}
  res.render('index2',{groupe:groupe,id:id});
});
app.get('/quiz_part1/:groupe', (req,res) =>{
  let groupe = req.params['groupe'];
  if(groupe == 'A'){
    res.render('/quiz/part1/A');
  }else if(groupe == 'B'){
    res.render('/quiz/part1/B');
  }else if(groupe == 'C'){
    res.render('/quiz/part1/C');
  }else if(groupe == 'D'){
    res.render('quiz/part1/part1_D');
  }
});
app.get('/yes',(req,res) => {
  res.render('quiz/part1/part1_D');
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
