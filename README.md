# Python dades 2bat

Web didàctica per a l'alumnat de 2n de Batxillerat que vol conèixer les llibreries més utilitzades en tractament de dades amb Python:

- Pandas
- NumPy
- Matplotlib / Seaborn

## Objectiu

Fer accessible i visual l'estudi de les llibreries de Python utilitzades en anàlisi de dades, amb un enfocament clar, intuïtiu i adaptat al nivell de l'alumnat.

## Contingut

La pàgina inclou:
- una portada introductòria amb accés directe a les tres llibreries
- pàgines dedicades a NumPy, Pandas i Matplotlib/Seaborn amb explicacions pedagògiques, instal·lació, importació i exemples de codi
- un exemple visual de gràfic a la pàgina de Matplotlib / Seaborn
- un qüestionari interactiu amb preguntes de diferents tipus (vertader/fals, omplir buits, resposta múltiple, emparellament) i correcció automàtica amb retroalimentació
- una pàgina de recursos amb vídeos explicatius i enllaços a documentació externa
- selector d'idioma (català, castellà, anglés)
- panell de data i hora actual amb format `ddd dd-mm-yy` i botó de tancament
- mode clar / fosc amb recordatori de preferència
- navegació principal coherent amb la pàgina actual destacada

## Estil visual

El projecte segueix un estil modern, net i accessible, amb colors blaus i verds, cards amb vores suaus, botons uniformes i estructura clara i ordenada.

## Com veure la web

Per veure la web de forma correcta, es recomana obrir-la amb un servidor local:

```bash
python -m http.server 8000
```

Després obre:

```text
http://localhost:8000/python-dades-2bat/index.html
```

## Estructura del projecte

- `index.html` → pàgina principal del projecte
- `numpy.html` → pàgina d'introducció a NumPy
- `pandas.html` → pàgina d'introducció a Pandas
- `matplotlib.html` → pàgina d'introducció a Matplotlib i Seaborn
- `questionari.html` → qüestionari interactiu amb diferents tipus de preguntes
- `recursos.html` → pàgina de recursos amb vídeos i enllaços addicionals
- `styles.css` → estils comuns de la web
- `js/i18n.js` → internacionalització (català, castellà, anglés), panell de data i hora, i canvi de tema
- `js/script.js` → lògica del qüestionari
- `images/` → recursos gràfics, inclòs l'exemple de Matplotlib

## Canvis recents

- Format de data canviat a `ddd dd-mm-yy`
- Creat panell de data i hora col·lapsable amb botó de tancament
- Afegit selector d'idioma (català, castellà, anglés)
- Afegit mode clar / fosc
- Creat qüestionari dinàmic i autocorrectiu amb tipus de preguntes variats
- Afegida pàgina de recursos amb vídeos i enllaços externs

## Possibles ampliacions futures

- més preguntes i categories
- filtres de recursos per llibreria
- mode de repàs amb temporitzador
- exemples amb dades reals i més interactius

## Repositori

Aquest projecte també està connectat a GitHub:
https://github.com/jmivaldisantimote/python-dades-2bat
