import mapboxGl from 'mapbox-gl';
import './App';

class LocalEvent {
    // on déclare ses propriétés:
    title;
    datesStart;
    datesEnd;
    description;

    // déclaration constructeur
    constructor(localEvent) {
        this.title = localEvent.title;
        this.datesStart = localEvent.datesStart;
        this.datesEnd = localEvent.datesEnd;
        this.description = localEvent.description;
        this.marker = null;
        this.popup = null;
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
        this.popup = new mapboxGl.Popup().setHTML(`
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
        const elLi = document.createElement('li');
        elLi.classList.add('localevent');

        // création éléments HTML:
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title-local-event');
        titleDiv.textContent = this.title;
        elLi.appendChild(titleDiv);

        const datesStartDiv = document.createElement('div');
        datesStartDiv.classList.add('date-start-local-event');
        datesStartDiv.textContent = this.datesStart;
        elLi.appendChild(datesStartDiv);

        const datesEndDiv = document.createElement('div');
        datesEndDiv.classList.add('date-end-local-event');
        datesEndDiv.textContent = this.datesEnd;
        elLi.appendChild(datesEndDiv);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description-local-event');
        descriptionDiv.textContent = this.description;
        elLi.appendChild(descriptionDiv);

        elLi.addEventListener('click', this.handleButtonClick.bind(this));

        return elLi;
    }
};

export default LocalEvent;