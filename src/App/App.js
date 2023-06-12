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
        const nav = new mapboxgl.NavigationControl();
        this.map.addControl(nav, 'top-left');

        // on écoute le click sur la map
        this.map.on('click', this.handleClickMap.bind(this));
    }

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
        // elButtonValidForm.addEventListener('click', this.handleButtonValidForm.bind(this));

        // BOUTON VIDER EVENT
        // div
        const elDivButtonClearAll = document.createElement('div');
        // bouton
        const elButtonClearAll = document.createElement('button');
        elButtonClearAll.type = 'button';
        elButtonClearAll.id = 'clear-all';
        elButtonClearAll.textContent = 'Tout supprimer';
        // Ajout d'un événement sur le bouton
        // elButtonClearAll.addEventListener('click', this.handleButtonClearAll.bind(this));

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



        // TODO: EVENEMENTS DES BOUTONS:
        // Valider le formulaire, événement du bouton VALIDER:
        // handleButtonValidForm() {
        //     // TODO: Valider mon événement.
        // };

        // // Supprimer formulaire, événement sur bouton TOUT SUPPRIMER:
        // handleButtonClearAll(){
        //     // TODO: Supprimer mon formulaire.
        // };

        // ******************MAP*********************
        this.elDivMap = document.createElement('div');
        this.elDivMap.id = 'map';

        document.body.append(this.elDivMap);
    }

    // méthode qui capte le click sur la Map
    handleClickMap(evt) {
        console.log(evt);
        console.log("Latitude : " + evt.lngLat.lat);
        console.log("Longitude : " + evt.lngLat.lng);
    }
}

const app = new App();

export default app;