const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 3000;
const bodyParser = require('body-parser');
const { url } = require('inspector');
const fs = require('fs');

app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
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

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/index2', (req, res) => {
  let id = '';
  let groupe = '';
  let noGroupe = (Math.random() * 4) + 1;
  if (noGroupe < 3) {
    groupe = noGroupe == 1 ? 'A' : 'B';
  } else {
    groupe = noGroupe == 3 ? 'C' : 'D';
  }
  res.render('index2', { groupe: groupe, id: id });
});
app.get('/quiz_part1/:groupe', (req, res) => {
  let groupe = req.params['groupe'];
  if (groupe == 'A') {
    res.render('/quiz/part1/A');
  } else if (groupe == 'B') {
    res.render('/quiz/part1/B');
  } else if (groupe == 'C') {
    res.render('/quiz/part1/C');
  } else if (groupe == 'D') {
    res.render('quiz/part1/part1_D');
  }
});
app.get('/yes', (req, res) => {
  res.render('quiz/part1/part1_D');
});
app.get('/ok', (req, res) => {
  res.sendFile(path.join(__dirname, './scorm_module1/scormcontent/test/index.html'));
});

app.get('/connexion', (req,res) => {
  const {login, pswd} = req.body;
  // TODO set login and pswd
  const correct_login = test;
  const correct_password = test;
  if (login === correct_login && pswd === correct_password){
    res.render('banqueDeDonnees')
  }else{
    res.send('Identifiant incorrect.')
  }
})

app.get('/banqueDeDonnees', (req, res) => {
  // const useername = req.body.useername;
  // const pswd = req.body.pswd; 

  // const cours = fs.readFileSync('./data/cours.json')

  // console.log(cours);
  // res.send(JSON.parse(cours));
  // res.render('banqueDeDonnees');
  // if(true){
  //   fs.readFile('./data/cours.json', 'utf-8', (err, data) =>{
  //       if(err){
  //         console.log(err);
  //         return;
  //       }
  //       console.log(JSON.parse(data));
  //   });
  // }


  const csvFolder = path.join(__dirname, './data');

  // Utilisez la fonction fs.readdir pour lire les fichiers dans le dossier.
  fs.readdir(csvFolder, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier :', err);
      return;
    }
    // Filtrer les fichiers pour ne conserver que les fichiers CSV.
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
    csvFiles.forEach(csvFile => {
      console.log(csvFile);
    });
  
    res.render('banqueDeDonnees', {bank:csvFiles});
  });
});

app.get('/downloadCSV/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, './data', filename); // Remplacez 'votre-dossier-de-stockage' par le chemin réel

  // Vérifiez si le fichier existe
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename); // Téléchargez le fichier CSV
  } else {
    res.status(404).send('Fichier introuvable.');
  }
});

app.get('/listeCSV', (req, res) => {
  const csvFolder = path.join(__dirname, './data'); // Remplacez 'votre-dossier-de-stockage' par le chemin réel

  fs.readdir(csvFolder, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier :', err);
      return res.status(500).send('Erreur lors de la récupération des fichiers CSV.');
    }

    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
    res.render('listeCSV', { csvFiles }); // Rendre le modèle EJS avec la liste des noms de fichiers CSV
  });
});

app.post('/saveData', (req, res) => {
  const json_data = req.body;
  console.log(req.body);

  let csv = 'id;time_part_1;time_quiz_1;list_answers_quiz_1';
  csv += '\n';
  csv += `${json_data.id};${json_data.time_part_1};${json_data.time_quiz_1};${json_data.list_answers_quiz1}`;

  let name_file = `${json_data.id}.csv`;
  fs.writeFileSync('./data/' + name_file, csv);


});

app.get('/testcsv', (req, res) => {
  const csvFolder = path.join(__dirname, './data');

  // Utilisez la fonction fs.readdir pour lire les fichiers dans le dossier.
  fs.readdir(csvFolder, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du dossier :', err);
      return;
    }
    // Filtrer les fichiers pour ne conserver que les fichiers CSV.
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
    csvFiles.forEach(csvFile => {
      console.log(csvFile);
    });
  

  });
});

  app.get('/acceuil', (req, res) => {
    res.render('pageAcceuil');
  });

  app.get('/end', (req, res) => {
    res.render('end');
  });

  app.listen(port, () => {
    console.log(port);
  });