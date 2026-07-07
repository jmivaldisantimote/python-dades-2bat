# Documentació del projecte Python dades 2bat

## Descripció general

Aquest projecte és una web didàctica pensada per a l’alumnat de 2n de Batxillerat que vol conèixer les llibreries més utilitzades en tractament de dades amb Python: Pandas, NumPy i Matplotlib (amb referències a Seaborn).

La web combina explicacions pedagògiques, exemples de codi senzills i activitats interactives per fer l’aprenentatge més dinàmic i pràctic.

## Objectiu

L’objectiu principal és fer accessible i visual l’estudi de les llibreries de Python utilitzades en anàlisi de dades, amb un enfocament clar, intuïtiu i adaptat al nivell de l’alumnat.

## Estructura del projecte

- `index.html`: pàgina principal amb l’accés a les tres llibreries i als recursos addicionals.
- `pandas.html`: pàgina introductòria a Pandas.
- `numpy.html`: pàgina introductòria a NumPy.
- `matplotlib.html`: pàgina introductòria a Matplotlib i Seaborn.
- `questionari.html`: qüestionari dinàmic amb preguntes de diferents tipus i correcció automàtica.
- `recursos.html`: pàgina amb vídeos explicatius i enllaços a recursos externs.
- `styles.css`: fitxer amb els estils visuals del projecte.
- `images/`: carpeta amb recursos gràfics, inclòs l’exemple de Matplotlib.
- `README.md`: resum breu del projecte.
- `DOCUMENTACIO.md`: documentació general del projecte.

## Continguts principals

### Pàgina principal

La portada presenta:
- una introducció general al tema
- accés directe a les tres llibreries
- un resum del que s’aprèn
- enllaços al qüestionari i als recursos audiovisuals
- navegació clara cap a les explicacions de cada llibreria

### Pàgines de llibreries

Cada pàgina inclou:
- una introducció pedagògica
- explicació del motiu d’utilitzar la llibreria
- apartat d’instal·lació i importació
- exemples de codi senzills i adaptats a l’alumnat
- navegació entre llibreries amb la pàgina actual destacada
- elements visuals per millorar la comprensió

### Qüestionari interactiu

La pàgina de qüestionari permet:
- seleccionar quines llibreries volen formar part del test
- generar un qüestionari dinàmic amb un nombre de preguntes adequat
- incloure diferents tipus de preguntes: vertader/fals, omplir buits, resposta múltiple i emparellament
- mostrar retroalimentació explicativa en cas d’error
- activar el botó de correcció només quan s’han contestat totes les preguntes

### Recursos audiovisuals

La pàgina de recursos inclou:
- vídeos explicatius relacionats amb Python i anàlisi de dades
- resums breus de cada recurs
- enllaços a documentació oficial i a recursos externs com W3Schools i Kaggle Learn

## Canvis recents

S’han incorporat diverses millores al projecte:
- creació d’un qüestionari dinàmic i autocorrectiu
- incorporació de diferents tipus de preguntes
- millora de la retroalimentació educativa en les respostes incorrectes
- addició d’una pàgina de recursos amb continguts externs
- inclusió d’enllaços a recursos oficials i complementaris
- actualització de la documentació i dels recursos del projecte

## Estil visual

El projecte segueix un estil modern, net i accessible, amb:
- colors blaus i verds
- cards amb vores suaus
- botons amb estil uniforme
- estructura clara i ordenada
- icones discretes per millorar la lectura

## Navegació

La navegació està pensada per ser intuïtiva i coherent:
- des de la pàgina principal es pot accedir a cada llibreria
- des de cada subpàgina es pot tornar a l’inici o passar a altres llibreries
- des del menú principal es pot accedir al qüestionari i als recursos
- la pàgina actual es destaca visualment per evitar ambigüitats

## Com executar el projecte

Per veure la web de manera correcta, es recomana obrir-la amb un servidor local simple, per exemple:

```bash
python -m http.server 8000
```

Després s’obre el navegador a l’adreça:

```text
http://localhost:8000/python-dades-2bat/index.html
```

## Possibles ampliacions futures

Es pot ampliar el projecte amb:
- més preguntes i categories
- filtres de recursos per llibreria
- mode de repàs amb temporitzador
- exemples amb dades reals i més interactius
- enllaços addicionals a exercicis pràctics

## Notes de manteniment

- Mantenir el mateix estil visual en totes les pàgines.
- Comprovar que els enllaços i els recursos externs funcionin correctament.
- Actualitzar el README i aquesta documentació si canvien les estructures o els continguts.
