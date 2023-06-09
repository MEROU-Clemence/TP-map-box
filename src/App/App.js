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

class App {

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