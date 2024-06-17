/*  Ce script permet de convertir les fichiers JSON present dans le fichier donnes en CSV.
 */
//la fonction format permet de formater le json pour qu'il soit plus lisible, et de calculer le temps passer sur chaque page
function format(json){
    json = JSON.parse(json);
    let nav = JSON.parse(json['navigation']);
    let answer = JSON.parse(json['answers']);
    delete json['navigation'];
    delete json['answers'];
    for (let i = 1; i < 9; i++) {//ici on recupere les reponses aux quiz et on les met dans une colonne
        let quiz = JSON.parse(json['quiz'+i]);
        let tab = quiz['answers'];
        let str = '';
        for (let j = 0; j < tab.length; j++) {
            str += tab[j];
        }
        json['quiz'+i] = str;
    }
    for (let i = 0; i < nav.length; i++) {//ici on recupere le nom de la page sans le chemin
        let url = nav[i]['page'];
        let parts = url.split("/");
        if(parts[4]==="content"){//on differencie le cas ou la page est un cours car le chemin est different
            nav[i]['page'] = parts[3];
        }else{// et pour les autres pages on recupere le nom de la page sans l'extension
            let lastPart = parts[parts.length - 1];
            let last = lastPart.split(".");
            lastPart = last[0];
            nav[i]['page'] = lastPart;
        }   
    }
    for (let i = 0; i < nav.length-1; i++) {//ici on calcule le temps passer sur chaque page
        if(json.hasOwnProperty("nav"+nav[i]['page'])) {
             if((nav[i]['page']=== nav[i-1]['page'])&&((nav[i]['page']=== 'ques1C')|| (nav[i]['page']=== 'pretest') || (nav[i]['page']=== 'posttest') || (nav[i]['page']=== 'ques3'))){
            }else{
                json["nav"+nav[i]['page']]= Math.round((nav[i+1]['time'] - nav[i]['time']) / 1000) + json["nav"+nav[i]['page']];
            }
        }else{
            json["nav"+nav[i]['page']] = Math.round((nav[i+1]['time'] - nav[i]['time']) / 1000);
        }
    }
    for (let i = 0; i < answer.length; i++) {//on decoupe le tableau de reponse pour que chaque reponse soit dans une colonne
        json[answer[i][0]] = answer[i][1];
    }
    return json;
}
//la fonction objToCsv permet de convertir les objets formater en csv, et de placer les elements dans le bon ordre
function objToCsv(objs) {
    let csv = [];
    let keys = ["gender","age", "school","computer_time","cle","groupe",
    "quiz1","quiz2","quiz3","quiz4","quiz5","quiz6","quiz7","quiz8","score1","score2","score3","score4",
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8","b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b11","b12",
    "c1","c2","c3","c4","c5","d1","e1","e2","e3","e4","e5","e6","i1","i2","i3","i4","i5","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11", "f12","g1","g2","g3","g4","g5","g6","g7","g8","h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","h11","h12",
    "navques1","navques1B","navques1C","navrapel","navpretest","navcours1","navquiz1","navcours2","navquiz2","navcours3","navquiz3","navcours4","navquiz4","navquiz7","navcours5","navquiz5","navquiz8","navcours6","navquiz6","navposttest","navques2","navques2B","navques2F","navques2C","navques2D","navques2E","navques3"];
    csv.push(keys.join(','));//on ajoute les titres des colonnes, dans le bon ordre
    for (let obj of objs) {//pour chaque json formater on ajoute les valeurs dans le bon ordre
        try{
        const values = keys.map(key => obj[key]);
        csv.push(values.join(','));
        }
        catch(e){

        }
    }
    return csv.join('\n');//on retourne un texte formater en csv
}

const fs = require('fs');//on importe la librairie fs pour lire et ecrire des fichiers
const path = require('path');//on importe la librairie path pour gerer les chemins
let dir = 'donnees';
let files = fs.readdirSync(dir);//on recupere la liste des fichiers present dans le dossier donnees


let objs = files.map(file => {//pour chaque fichier on lit le contenu, on le formate et on l'ajoute a un tableau
    try{
    let filePath = path.join(dir, file);
    
    let content = fs.readFileSync(filePath, 'utf8');
    return format(content);
    }
    catch(e){
        console.log("error"+file);//si il y a une erreur on affiche le nom du fichier(les fichiers qui ne sont pas complet, l'élève n'a pas fini le test ou il s'agit d'un test de controle)
    }
});

const csvData = objToCsv(objs);//on cree le texte format csv a partir des objets formater
fs.writeFileSync('resultats.csv', csvData);//on ecrit le texte dans un fichier resultats.csv