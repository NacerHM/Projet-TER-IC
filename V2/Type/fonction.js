

function randomisation(array) {
    let tableauRandomise = [...array];
    for (let i = tableauRandomise.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tableauRandomise[i], tableauRandomise[j]] = [tableauRandomise[j], tableauRandomise[i]];
    }
    return tableauRandomise;
}