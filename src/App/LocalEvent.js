import mapboxgl from 'mapbox-gl';
import './App';

class LocalEvent {
    // on déclare ses propriétés:
    title;
    datesStart;
    datesEnd;
    description;
    latitude;
    longitude;

    // déclaration constructeur
    constructor(localEvent) {
        this.title = localEvent.title;
        this.datesStart = localEvent.datesStart;
        this.datesEnd = localEvent.datesEnd;
        this.description = localEvent.description;
        this.latitude = localEvent.latitude;
        this.longitude = localEvent.longitude;
        this.initMarker();

    };

    // Evénement au click:
    handleButtonClick(evt) {
        const elLi = evt.currentTarget;
        const elDivTitle = elLi.querySelector('.title-local-event');
        const elInputDatesStart = elLi.querySelector('.date-start-local-event');
        const elInputDatesEnd = elLi.querySelector('.date-end-local-event');
        const elDivDescripEvent = elLi.querySelector('.description-local-event')

        // actions avec ces elements.
        // création pop-up:
        this.popup = new mapboxgl.Popup().setHTML(`
            <div>
                <h2>${elDivTitle.textContent}</h2>
                <p>Début: ${elInputDatesStart.textContent}, Fin: ${elInputDatesEnd.textContent}</p>
                <p>${elDivDescripEvent.textContent}</p>
            </div>
        `);

        // créer le marker et l'ajouter à la carte
        this.marker = new mapboxgl.Marker()
            .setLngLat([this.elInputGeoCoordLon.value, this.elInputGeoCoordLat.value])
            .addTo(this.map);
    };

    // méthode qui construit et retourne l'élément HTML de la note
    getDom() {
        const elDiv = document.createElement('div');
        elDiv.classList.add('localevent');

        // création éléments HTML:
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title-local-event');
        titleDiv.textContent = this.title;
        elDiv.appendChild(titleDiv);

        const datesStartDiv = document.createElement('div');
        datesStartDiv.classList.add('date-start-local-event');
        datesStartDiv.textContent = this.datesStart;
        elDiv.appendChild(datesStartDiv);

        const datesEndDiv = document.createElement('div');
        datesEndDiv.classList.add('date-end-local-event');
        datesEndDiv.textContent = this.datesEnd;
        elDiv.appendChild(datesEndDiv);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description-local-event');
        descriptionDiv.textContent = this.description;
        elDiv.appendChild(descriptionDiv);

        return elDiv;
    }

    initMarker() {

        // on rajoute l'objet littéral sur la maps:
        this.marker = new mapboxgl.Marker({ color: 'grey' }).setLngLat({ lon: this.longitude, lat: this.latitude }).addTo(this.map);

        // Obtenir le timestamp actuel
        const currentTimestamp = Math.floor(Date.now());

        // Obtenir le timestamp à partir d'une date spécifique pour date DEBUT Event
        const specificDateStart = new Date(this.datesStart);
        const specificTimestampStart = Math.floor(specificDateStart.getTime());

        // Obtenir le timestamp à partir d'une date spécifique pour date FIN Event
        const specificDateEnd = new Date(this.datesEnd);
        const specificTimestampEnd = Math.floor(specificDateEnd.getTime());

        // création fonction avec variables couleurs:
        if (specificTimestampStart >= (currentTimestamp + (3 * 24 * 3600 * 1000))) {
            this.marker = new mapboxgl.Marker({ color: 'green' }).setLngLat({ lon: this.longitude, lat: this.latitude }).addTo(this.map);
        } else if (specificTimestampStart < currentTimestamp && specificTimestampEnd < currentTimestamp) {
            this.marker = new mapboxgl.Marker({ color: 'red' }).setLngLat({ lon: this.longitude, lat: this.latitude }).addTo(this.map);
        } else if (specificTimestampStart || specificTimestampEnd <= (currentTimestamp + (3 * 24 * 3600 * 1000))) {
            this.marker = new mapboxgl.Marker({ color: 'orange' }).setLngLat({ lon: this.longitude, lat: this.latitude }).addTo(this.map);
        } else return


        // créer instance de la pop-up
        const popup = new mapboxgl.Popup().setHTML(this.getDom().outerHTML);

        // ajout pop-up au marker
        this.marker.setPopup(popup);

        // ajout infos event au survol de souris:
        this.marker.getElement().title = this.title + ' ' + this.datesStart + ' ' + this.datesEnd;
    };
};

export default LocalEvent;