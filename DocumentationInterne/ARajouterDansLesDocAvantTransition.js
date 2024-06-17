/*Ce morceau de code est a placer avant les transitions
en effet on ne recupere pas le temps actuel sur les pages de transition, 
donc pour calculer le temps passer sur les pages precedentes, 
il faut avoir le temps actuel avant la transition.
 */

const time2 = new Date().getTime(); //on recupere le temps actuel
nvEl = {
  time: time2,
  page: window.location.pathname
};
let navigation = JSON.parse(localStorage.getItem("navigation"));//on recupere le tableau de navigation present dans le local storage
navigation.push(nvEl);// et on y ajoute le temps passer a cette page
localStorage.setItem("navigation", JSON.stringify(navigation));// on enregistre le tableau de navigation dans le local storage