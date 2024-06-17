<?php
    //in version
    // Récupérer les données JSON de la requête POST
    $json = file_get_contents('php://input');

    // Convertir les données JSON en un objet PHP
    $data = json_decode($json);

    // Vérifier si les données ont été correctement décodées
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        echo "Erreur : les données ne sont pas au format JSON valide.";
        exit();
    }

    // Générer un nom de fichier unique
    $filename = uniqid() . '.json';

    // Écrire les données JSON dans le fichier
    file_put_contents('data/in/' . $filename, $json);
?>	