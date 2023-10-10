const prettier = require("prettier");
const fs = require("fs");

// let codeMinifie = fs.readFileSync("./scorm_module1/scormcontent/lib/main.bundle.js", "utf8");
// let codeFormate = prettier.format(codeMinifie, { semi: false, parser: "babel" });
// fs.writeFileSync("./scorm_module1/scormcontent/lib/main.bundle_nominifie.js", codeFormate);


try {
   fs.readFileSync("./scorm_module1/scormcontent/lib/main.bundle.js", "utf8")
   .then((file) => { 
        console.log(file);
        prettier.format(file, { semi: false, parser: "babel" })
        .then(deminifier =>{
            fs.writeFileSync("./scorm_module1/scormcontent/lib/main.bundle_nominifie.js", deminifier);
        });
   });

 // console.log('Code Minifié:', codeMinifie); // Pour débugger
  
//   const codeFormate = prettier.format(codeMinifie, { semi: false, parser: "babel" });
//   console.log('Code Formaté:', codeFormate); // Pour débugger
  
//   fs.writeFileSync("./scorm_module1/scormcontent/lib/main.bundle_nominifie.js", codeFormate);
//   console.log('Code écrit avec succès dans fichierFormate.js');
} catch (error) {
  console.error('Erreur:', error);
}
