const STORAGE_NAME = 'markersandevent';

class ServiceMarkersAndEvent {

    // méthode qui récupère les datas de localStorage
    readStorage() {
        // déclarer une variable qui va contenir les markers
        let arrEventMarkers = [];
        // récupérer les datas du localStorage
        const serializedData = localStorage.getItem(STORAGE_NAME);

        // traitement si la key n'existe pas
        if (!serializedData) return arrEventMarkers;

        // si la key existe, on va essayer de parser les datas
        try {
            // on tente de parser les datas
            arrEventMarkers = JSON.parse(serializedData);
        } catch (error) {
            // Si cela ne fonctionne pas (pour cause de données corrompues)
            // on supprime les données
            localStorage.removeItem(STORAGE_NAME);
        }

        // on retourne les datas
        return arrEventMarkers;
    }


    // méthode qui sauvegarde les datas dans localStorage
    saveStorage(arrEventMarkers) {
        // transformer l'objet reçu en paramètres en chaîne de caractères
        const serializedData = JSON.stringify(arrEventMarkers);
        // une fois stringifié, il faut l'enregistrer dans le localStorage
        try {
            // on essaye d'enregistrer dans le localStorage 
            localStorage.setItem(STORAGE_NAME, serializedData);

        } catch (error) {
            // si on a une erreur on l'affiche
            console.log(error);
            return false;
        }
    }
}

export default ServiceMarkersAndEvent;