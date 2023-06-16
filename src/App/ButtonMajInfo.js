import './App';
import './LocalEvent';

// je créé mon bouton pour rafraichir ma page
class ButtonMajInfo {
    onAdd(map) {
        this._map = map;

        this._container = document.createElement('button');
        this._container.classList.add('mapboxgl-ctrl', 'button-maj-info');

        this._container.innerHTML = '🟪';

        this._container.addEventListener('click', function () {
            // action pour rafraichir et mettre la page à l'heure du timestamp actuel !
            location.reload();
        });

        return this._container;
    };

    onRemove() {
        this._container.remove();
        this._map = undefined;
    };
}

export default ButtonMajInfo;