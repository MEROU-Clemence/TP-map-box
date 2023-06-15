// importer la config de mapbox
import config from '../../app.config.json';
// importes la librairie de mapbox
import mapboxgl from 'mapbox-gl';
// importer style de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// importer les scripts de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// importer le style de mapbox
import 'mapbox-gl/dist/mapbox-gl.css';
// importer le fichier css
import '../assets/style.css';
import '../../style.css';
// import des autres fichiers JS
import LocalEvent from './LocalEvent';
import ButtonMajInfo from './ButtonMajInfo';

class App {
    // Eléments du DOM:
    elInputTitleEvent;
    elTextareaDescripEvent;
    elInputDatesStart;
    elInputDatesEnd;
    elInputGeoCoordLat;
    elInputGeoCoordLon;

    // propriétés
    // container de la map
    elDivMap;
    // instancier la class
    map;
    // ma liste de markers d'événements:
    eventMarkers = [];
    // propriété pour ma class CustomMarkers:
    customMarkers;

    start() {
        console.log('App démarrée...');
        this.loadDom();
        this.initMap();
    }

    initMap() {
        // initialiser la map
        // on récupère la clé d'api dans le fichier de config
        mapboxgl.accessToken = config.apis.mapbox_gl.api_key;
        // on instancie la map
        this.map = new mapboxgl.Map({
            container: this.elDivMap,
            style: config.apis.mapbox_gl.map_styles.dark,
            center: [2.79, 42.68],
            zoom: 12
        });

        // Bouton navigation
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');

        // on initie le marker à null
        this.marker = null;

        // on écoute le click sur la map
        this.map.on('click', this.handleClickMap.bind(this));

        // TODO: Je fabrique le bouton de Mise à jour des infos de ma map:
        const buttonMajInfo = new ButtonMajInfo();
        this.map.addControl(buttonMajInfo, 'top-left');
    };

    loadDom() {

        // Création formulaire
        // MAIN
        const elMain = document.createElement('main');
        elMain.innerHTML = '<h1>🎈 Ajouter un évènement</h1>'

        // FORM NOVALIDATE
        const elForm = document.createElement('form');
        elForm.noValidate = true;

        // TITRE
        const elDivTitle = document.createElement('div');
        elDivTitle.innerHTML = "<p>Titre de l'événement</p>";
        // <input type="text" id="title"></input>
        this.elInputTitleEvent = document.createElement('input');
        this.elInputTitleEvent.type = 'text';
        this.elInputTitleEvent.id = 'title';

        // DESCRIPTION EVENEMENT:
        const elDivDescripEvent = document.createElement('div');
        elDivDescripEvent.innerHTML = "<p>Description de l'événement</p>";
        // <textarea id="descrip-event"></textarea>
        this.elTextareaDescripEvent = document.createElement('textarea');
        this.elTextareaDescripEvent.id = 'descrip-event';

        // DATES DE DEBUT
        const elDivDatesStart = document.createElement('div');
        elDivDatesStart.innerHTML = "<p>Date de début</p>";
        // <input type="datetime-local" id="dates-start"></input>
        this.elInputDatesStart = document.createElement('input');
        this.elInputDatesStart.type = 'datetime-local';
        this.elInputDatesStart.id = 'dates-start';

        // DATES DE FIN
        const elDivDatesEnd = document.createElement('div');
        elDivDatesEnd.innerHTML = "<p>Date de fin</p>";
        // <input type="datetime-local" id="dates-end"></input>
        this.elInputDatesEnd = document.createElement('input');
        this.elInputDatesEnd.type = 'datetime-local';
        this.elInputDatesEnd.id = 'dates-end';

        // COORDONNEES GEO LATITUDE:
        const elDivGeoLat = document.createElement('div');
        elDivGeoLat.innerHTML = "<p>Latitude</p>";
        // <input type="number" id="coordonnees-lat">
        this.elInputGeoCoordLat = document.createElement('input');
        this.elInputGeoCoordLat.type = 'number';
        this.elInputGeoCoordLat.id = 'coordonnees-lat';

        // COORDONNEES GEO LONGITUDE:
        const elDivGeoLon = document.createElement('div');
        elDivGeoLon.innerHTML = "<p>Longitude</p>";
        // <input type="number" id="coordonnees-lon">
        this.elInputGeoCoordLon = document.createElement('input');
        this.elInputGeoCoordLon.type = 'number';
        this.elInputGeoCoordLon.id = 'coordonnees-lon';

        // BOUTON VALIDE ACTION
        // div
        const elDivButtonValidForm = document.createElement('div');
        // bouton
        const elButtonValidForm = document.createElement('button');
        elButtonValidForm.type = 'button';
        elButtonValidForm.id = 'new-event-add';
        elButtonValidForm.textContent = 'Ajouter';
        // Ajout d'un événement sur le bouton
        this.elButtonValidForm = elButtonValidForm;
        this.elButtonValidForm.addEventListener('click', this.handleButtonClick.bind(this));

        // BOUTON VIDER EVENT
        // div
        const elDivButtonClearAll = document.createElement('div');
        // bouton
        const elButtonClearAll = document.createElement('button');
        elButtonClearAll.type = 'button';
        elButtonClearAll.id = 'clear-all';
        elButtonClearAll.textContent = 'Tout supprimer';
        // Ajout d'un événement sur le bouton
        this.elButtonClearAll = elButtonClearAll;
        this.elButtonClearAll.addEventListener('click', this.handleButtonClearAll.bind(this));

        // TOUS MES APPELS:
        // Input titre dans div titre:
        elDivTitle.appendChild(this.elInputTitleEvent);

        // Textarea decription event dans div description event:
        elDivDescripEvent.appendChild(this.elTextareaDescripEvent);

        // Input de la date de début dans la div des dates de début
        elDivDatesStart.appendChild(this.elInputDatesStart);

        // Input de la date de fin dans la div des dates de fin:
        elDivDatesEnd.appendChild(this.elInputDatesEnd);

        // input coordonnées latitude dans div de la latitude:
        elDivGeoLat.appendChild(this.elInputGeoCoordLat);

        // input coordonnées longitude dans div de la longitude:
        elDivGeoLon.appendChild(this.elInputGeoCoordLon);

        // Bouton VALIDER appelé dans div du bouton valider:
        elDivButtonValidForm.append(this.elButtonValidForm);

        // Bouton TOUT SUPPRIMER appelé dans div du bouton tout supprimer:
        elDivButtonClearAll.append(this.elButtonClearAll);

        // Mon Formulaire appelle toutes les div sauf celles des boutons:
        elForm.append(elDivTitle, elDivDescripEvent, elDivDatesStart, elDivDatesEnd, elDivGeoLat, elDivGeoLon);

        // Main appelle Formulaire et Boutons
        elMain.append(elForm, elButtonValidForm, elButtonClearAll);

        // Body appelle Main
        document.body.appendChild(elMain);


        // ******************MAP*********************
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.append(this.elDivMap);

    };

    // EVENEMENTS DES BOUTONS:
    // Valider le formulaire, événement du bouton VALIDER:
    handleButtonClick() {
        // on récupère les valeurs des inputs en créant des constantes :
        const newTitle = this.elInputTitleEvent.value.trim()
        const newDatesStart = this.elInputDatesStart.value.trim();
        const newDatesEnd = this.elInputDatesEnd.value.trim();
        const newDescription = this.elTextareaDescripEvent.value.trim();

        // on créé une nouvelle note
        // on construit l'objet littéral
        const newLocalEvent = {
            title: newTitle == "" ? "Evénement sans titre" : newTitle,
            datesStart: newDatesStart == "" ? "du JJ/MM/AAAA" : newDatesStart,
            datesEnd: newDatesEnd == "" ? "au JJ/MM/AAAA" : newDatesEnd,
            description: newDescription == "" ? "Evénement sans description" : newDescription,
            latitude: this.elInputGeoCoordLat.value,
            longitude: this.elInputGeoCoordLon.value,
        }
        // création événement class LocalEvent
        const localEvent = new LocalEvent(newLocalEvent);

        // ajout marqueur à la carte:
        localEvent.marker.addTo(this.map);

        // ajout du marker à la liste des markers des événements:
        this.eventMarkers.push(localEvent);
    }

    // Supprimer tous les markers des événements sur bouton TOUT SUPPRIMER:
    handleButtonClearAll() {
        // on supprime
        this.eventMarkers.forEach(marker => marker.remove());

        // on vide la liste
        this.eventMarkers = [];
    };

    // méthode du click sur la Map
    handleClickMap(evt) {
        if (this.marker === null) {
            // Aucun événement ajouté donc je créé un nouveau marker
            this.marker = new mapboxgl.Marker()
                .setLngLat(evt.lngLat)
                .addTo(this.map);
        } else {
            // déplacer le marker vers la nouvelle position
            this.marker.setLngLat(evt.lngLat);
        };

        // relier mon click à mes inputs dans le formulaire
        this.elInputGeoCoordLat.value = evt.lngLat.lat.toString();
        this.elInputGeoCoordLon.value = evt.lngLat.lng.toString();
    }
};

const app = new App();

export default app;
