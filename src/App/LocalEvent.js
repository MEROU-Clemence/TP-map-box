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
    }
    // Evénement au click:
    handleButtonClick(evt) {
        const elLi = evt.currentTarget;
        const elDivTitle = elLi.querySelector('.title-local-event');
        const elInputDatesStart = elLi.querySelector('.date-start-local-event');
        const elInputDatesEnd = elLi.querySelector('.date-end-local-event');
        const elDivDescripEvent = elLi.querySelector('.description-local-event')

        // actions avec ces elements.
        // création pop-up:
        const popup = document.createElement('div');
        popup.classList.add('popup');

        // contenu de la pop-up:
        // titre
        const title = document.createElement('h2');
        title.textContent = elDivTitle.textContent;
        popup.appendChild(title);

        // dates
        const dates = document.createElement('p');
        dates.textContent = `Début: ${elInputDatesStart.textContent}, Fin: ${elInputDatesEnd.textContent}`;
        popup.appendChild(dates);

        // description
        const description = document.createElement('p');
        description.textContent = elDivDescripEvent.textContent;
        popup.appendChild(description);

        // ajout de la pop-up à la page:
        document.body.appendChild(popup);

        // fermeture de la pop-up au click en dehors de celle-ci:
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target)) {
                popup.remove();
            }
        });
    }

    // méthode qui construit et retourne l'élément HTML de la note
    getDom() {
        const elLi = document.createElement('li');
        elLi.classList.add('localevent');

        // on fait les éléments HTML:
        let innerDom = `<div class="title-local-event">${this.title}</div>`;
        innerDom += `<div class="date-start-local-event">${this.datesStart}</div>`
        innerDom += `<div class="date-end-local-event">${this.datesEnd}</div>`
        innerDom += `<div class="description-local-event">${this.description}</div>`
        elLi.innerHTML = innerDom;
        elLi.addEventListener('click', this.handleButtonClick);

        return elLi;
    }
};

export default LocalEvent;