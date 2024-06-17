function format(json){
    json = JSON.parse(json);
    let nav = JSON.parse(json['navigation']);
    let answer = JSON.parse(json['answers']);
    delete json['navigation'];
    delete json['answers'];
    for (let i = 1; i < 9; i++) {
        let quiz = JSON.parse(json['quiz'+i]);
        let tab = quiz['answers'];
        let str = '';
        for (let j = 0; j < tab.length; j++) {
            str += tab[j];
        }
        json['quiz'+i] = str;
    }
    for (let i = 0; i < nav.length; i++) {
        let url = nav[i]['page'];
        let parts = url.split("/");
        if(parts[4]==="content"){
            nav[i]['page'] = parts[3];
        }else{
            let lastPart = parts[parts.length - 1];
            let last = lastPart.split(".");
            lastPart = last[0];
            nav[i]['page'] = lastPart;
        }   
    }
    for (let i = 0; i < nav.length-1; i++) {
        if(json.hasOwnProperty("nav"+nav[i]['page'])) {
             if((nav[i]['page']=== nav[i-1]['page'])&&((nav[i]['page']=== 'ques1C')|| (nav[i]['page']=== 'pretest') || (nav[i]['page']=== 'posttest') || (nav[i]['page']=== 'ques3'))){
                //rien c'est quand on a un time code au debut et a la fin de la page
                //probleme si on recharge la page le 2eme time code est pas pris en compte pour les pages ques1, pretest, posttest et ques3
            }else{
                json["nav"+nav[i]['page']]= Math.round((nav[i+1]['time'] - nav[i]['time']) / 1000) + json["nav"+nav[i]['page']];
            }
        }else{
            json["nav"+nav[i]['page']] = Math.round((nav[i+1]['time'] - nav[i]['time']) / 1000);
        }
    }
    for (let i = 0; i < answer.length; i++) {
        json[answer[i][0]] = answer[i][1];
    }
    return json;
}
function objToCsv(objs) {
    let csv = [];
    let keys = ["gender","age", "school","computer_time","cle","groupe",
    "quiz1","quiz2","quiz3","quiz4","quiz5","quiz6","quiz7","quiz8","score1","score2","score3","score4",
    "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8","b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b11","b12",
    "c1","c2","c3","c4","c5","d1","e1","e2","e3","e4","e5","e6","i1","i2","i3","i4","i5","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11", "f12","g1","g2","g3","g4","g5","g6","g7","g8","h1","h2","h3","h4","h5","h6","h7","h8","h9","h10","h11","h12",
    "navques1","navques1B","navques1C","navrapel","navpretest","navcours1","navquiz1","navcours2","navquiz2","navcours3","navquiz3","navcours4","navquiz4","navquiz7","navcours5","navquiz5","navquiz8","navcours6","navquiz6","navposttest","navques2","navques2B","navques2F","navques2C","navques2D","navques2E","navques3"];
    csv.push(keys.join(','));
    for (let obj of objs) {
        const values = keys.map(key => obj[key]);
        csv.push(values.join(','));
    }
    return csv.join('\n');
}

const fs = require('fs');
const path = require('path');
let dir = 'chemin';
//
//modifie dir avec la direction du fichier dans le quel se trouve les json
//


let files = fs.readdirSync(dir);

let objs = files.map(file => {

    let filePath = path.join(dir, file);
    
    let content = fs.readFileSync(filePath, 'utf8');
    return format(content);
});

const csvData = objToCsv(objs);
fs.writeFileSync('chemin', csvData);
//
//modifier le chemin avec le chemin et le nom du fichier qu'on veut cree 
//exemple : nom du fichier = data.csv et on veut le placer dans le dossier test-uga, chemin sera C:/test-uga/data.csv
//