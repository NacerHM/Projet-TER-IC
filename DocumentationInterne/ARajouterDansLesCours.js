/*Cette partie du code permet que quand on clique sur le bouton page suivante presente dans le cours, 
il s'ouvre dans la même fenêtre et non dans une nouvelle fenêtre.
La principale difficulte est que le code est minifier.
Bien que l'attribut target="_blank" soit present une seule fois dans le code finale, 
il est present plusieurs fois dans le code minifier, et il est impossible de l'enlever manuellement sans casser le code.
La solution est de supprimer l'attribut target="_blank" avec le code js suivant:
*/
/*le code met un temps indeterminer a se charger et l'element target blank n'apparait pas tout de suite
il faut donc attendre un certain temps pour que le code puisse fonctionner
le code est donc mis dans un intervalle de temps et reessaye toutes les 2 secondes.
*/
/* Une fois l'attribut target="_blank" supprime, on arrete l'interval de temps.
*/
var checkLinksInterval = setInterval(function() { 
    var links = document.querySelectorAll('a[target="_blank"]');
    if (links.length > 0) {
      console.log('Lien avec target="_blank" trouvé.');
      links[0].removeAttribute('target');
      clearInterval(checkLinksInterval);
    }
  }, 2000);

/*La deuxieme partie de ce code permet de verifier que la personne est bien connecter et d'enregistrer le temps passer */
  if (localStorage.getItem("cle") === "code de session"){//verifie que la personne est bien connecter
      const time = new Date().getTime();
      nvEl = {
          time: time,
          page: window.location.pathname
      };
      let navigation = JSON.parse(localStorage.getItem("navigation"));//on recupere le tableau de navigation present dans le local storage
      navigation.push(nvEl);// et on y ajoute le temps passer a cette page
      localStorage.setItem("navigation", JSON.stringify(navigation));// on enregistre le tableau de navigation dans le local storage
  } else {
      window.location.href = "https://test-uga.fr/vch/transition/transition1.html"; // si la personne n'est pas connecter, on la redirige vers la page de connexion
  }