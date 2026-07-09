const AppI18n = (() => {
  const LANGUAGES = {
    ca: {
      label: 'Valencià',
      flag: '🟨🟥',
      short: 'VA'
    },
    es: {
      label: 'Castellano',
      flag: '🇪🇸',
      short: 'ES'
    },
    en: {
      label: 'English',
      flag: '🇬🇧',
      short: 'EN'
    }
  };

  const defaultLang = 'ca';
  const locales = {
    ca: 'ca-ES',
    es: 'es-ES',
    en: 'en-GB'
  };

  let clockTimer = null;

  const quizQuestions = {
    ca: [
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Quina estructura principal s’utilitza a Pandas per treballar amb taules?',
        options: ['DataFrame', 'Array', 'Llista', 'Diccionari'],
        answer: 0,
        explanation: 'El DataFrame és l’estructura principal de Pandas perquè organitza les dades en files i columnes, semblant a una taula.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Quina funció permet llegir dades d’un fitxer CSV amb Pandas?',
        options: ['read_csv()', 'load_csv()', 'import_csv()', 'open_csv()'],
        answer: 0,
        explanation: 'read_csv() és la funció estàndard per llegir fitxers CSV i convertir-los en un DataFrame.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Quina instrucció serveix per seleccionar una columna?',
        options: ['df["nom"]', 'df.get_column("nom")', 'df.select("nom")', 'df.column("nom")'],
        answer: 0,
        explanation: 'Per obtenir una columna de Pandas, s’utilitza la notació df["nom"] o df.nom, perquè la columna és una sèrie.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Quina operació permet agrupar dades per una columna?',
        options: ['groupby()', 'sort_values()', 'merge()', 'dropna()'],
        answer: 0,
        explanation: 'groupby() agrupa les files segons una columna per poder fer operacions com resumir o comptar valors.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Quina funció elimina les files amb valors buits?',
        options: ['dropna()', 'fillna()', 'replace()', 'isna()'],
        answer: 0,
        explanation: 'dropna() elimina les files o columnes que tenen valors buits, mentre que fillna() els omple.'
      },
      {
        library: 'pandas',
        type: 'boolean',
        question: 'És cert que Pandas és ideal per treballar amb taules en format DataFrame?',
        options: ['Vertader', 'Fals'],
        answer: 0,
        explanation: 'Sí, Pandas està dissenyat precisament per treballar amb dades tabulars mitjançant DataFrames.'
      },
      {
        library: 'pandas',
        type: 'fill',
        question: 'Escriu el nom de l’estructura principal de Pandas.',
        answer: 'dataframe',
        answers: ['dataframe', 'data frame'],
        explanation: 'La resposta correcta és DataFrame, la forma principal de representar taules a Pandas.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Quina és la forma principal de treballar amb dades a NumPy?',
        options: ['Arrays', 'DataFrames', 'Llistes', 'Gràfics'],
        answer: 0,
        explanation: 'NumPy treballa principalment amb arrays, que són estructures multidimensionals eficients per al càlcul numèric.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Quina funció crea un array amb valors entre dos límits?',
        options: ['arange()', 'range()', 'linspace()', 'create_array()'],
        answer: 2,
        explanation: 'linspace() crea un conjunt de valors equiespaiats entre dos límits, mentre que arange() utilitza un pas concret.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Quina propietat d’un array indica la seva forma?',
        options: ['shape', 'size', 'dtype', 'ndim'],
        answer: 0,
        explanation: 'shape mostra les dimensions de l’array, com ara (3, 4) per a una matriu de 3 files i 4 columnes.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Quina operació fa la mitjana dels valors d’un array?',
        options: ['mean()', 'sum()', 'median()', 'max()'],
        answer: 0,
        explanation: 'mean() calcula la mitjana aritmètica dels valors de l’array.'
      },
      {
        library: 'numpy',
        type: 'fill',
        question: 'Com es diu la funció que calcula la mitjana d’un array?',
        answer: 'mean',
        answers: ['mean', 'mean()'],
        explanation: 'La funció mean() calcula la mitjana aritmètica dels valors de l’array.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Quina llibreria s’utilitza habitualment per crear gràfics en Python?',
        options: ['Matplotlib', 'Pandas', 'NumPy', 'SciPy'],
        answer: 0,
        explanation: 'Matplotlib és la llibreria clàssica per crear gràfics de manera flexible i personalitzable.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Quina funció crea un gràfic de línies?',
        options: ['plot()', 'bar()', 'scatter()', 'hist()'],
        answer: 0,
        explanation: 'plot() és la funció habitual per dibuixar gràfics de línies amb valors seqüencials.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Quina ordre mostra el gràfic a la pantalla?',
        options: ['show()', 'display()', 'print()', 'render()'],
        answer: 0,
        explanation: 'show() mostra el gràfic que s’ha creat; és l’últim pas per veure’l visualment.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Quina funció serveix per afegir un títol al gràfic?',
        options: ['title()', 'label()', 'legend()', 'axis()'],
        answer: 0,
        explanation: 'title() assigna un títol al gràfic per fer-lo més clar i comprensible.'
      },
      {
        library: 'matplotlib',
        type: 'boolean',
        question: 'És cert que Seaborn amplia Matplotlib amb estils i gràfics estadístics?',
        options: ['Vertader', 'Fals'],
        answer: 0,
        explanation: 'Sí, Seaborn aporta estils moderns i visualitzacions estadístiques sobre Matplotlib.'
      },
      {
        library: 'matplotlib',
        type: 'matching',
        question: 'Relaciona cada funció amb el que fa:',
        pairs: [
          { left: 'plot()', options: ['Dibuixa una línia', 'Mostra el gràfic', 'Afegeix un títol'], answer: 'Dibuixa una línia' },
          { left: 'show()', options: ['Dibuixa una línia', 'Mostra el gràfic', 'Afegeix un títol'], answer: 'Mostra el gràfic' },
          { left: 'title()', options: ['Dibuixa una línia', 'Mostra el gràfic', 'Afegeix un títol'], answer: 'Afegeix un títol' }
        ],
        explanation: 'plot() crea el gràfic, show() el mostra i title() li posa un títol.'
      }
    ],
    es: [
      {
        library: 'pandas',
        type: 'multiple',
        question: '¿Qué estructura principal se utiliza en Pandas para trabajar con tablas?',
        options: ['DataFrame', 'Array', 'Lista', 'Diccionario'],
        answer: 0,
        explanation: 'El DataFrame es la estructura principal de Pandas porque organiza los datos en filas y columnas, como una tabla.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: '¿Qué función permite leer datos de un archivo CSV con Pandas?',
        options: ['read_csv()', 'load_csv()', 'import_csv()', 'open_csv()'],
        answer: 0,
        explanation: 'read_csv() es la función estándar para leer archivos CSV y convertirlos en un DataFrame.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: '¿Qué instrucción sirve para seleccionar una columna?',
        options: ['df["nom"]', 'df.get_column("nom")', 'df.select("nom")', 'df.column("nom")'],
        answer: 0,
        explanation: 'Para obtener una columna de Pandas se usa la notación df["nom"] o df.nom, porque la columna es una serie.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: '¿Qué operación permite agrupar datos por una columna?',
        options: ['groupby()', 'sort_values()', 'merge()', 'dropna()'],
        answer: 0,
        explanation: 'groupby() agrupa las filas según una columna para poder resumir o contar valores.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: '¿Qué función elimina las filas con valores vacíos?',
        options: ['dropna()', 'fillna()', 'replace()', 'isna()'],
        answer: 0,
        explanation: 'dropna() elimina las filas o columnas que tienen valores vacíos, mientras que fillna() los rellena.'
      },
      {
        library: 'pandas',
        type: 'boolean',
        question: '¿Es cierto que Pandas es ideal para trabajar con tablas en formato DataFrame?',
        options: ['Verdadero', 'Falso'],
        answer: 0,
        explanation: 'Sí, Pandas está diseñado precisamente para trabajar con datos tabulares mediante DataFrames.'
      },
      {
        library: 'pandas',
        type: 'fill',
        question: 'Escribe el nombre de la estructura principal de Pandas.',
        answer: 'dataframe',
        answers: ['dataframe', 'data frame'],
        explanation: 'La respuesta correcta es DataFrame, la forma principal de representar tablas en Pandas.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: '¿Cuál es la forma principal de trabajar con datos en NumPy?',
        options: ['Arrays', 'DataFrames', 'Listas', 'Gráficos'],
        answer: 0,
        explanation: 'NumPy trabaja principalmente con arrays, estructuras multidimensionales eficientes para el cálculo numérico.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: '¿Qué función crea un array con valores entre dos límites?',
        options: ['arange()', 'range()', 'linspace()', 'create_array()'],
        answer: 2,
        explanation: 'linspace() crea valores equiespaciados entre dos límites, mientras que arange() utiliza un paso concreto.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: '¿Qué propiedad de un array indica su forma?',
        options: ['shape', 'size', 'dtype', 'ndim'],
        answer: 0,
        explanation: 'shape muestra las dimensiones del array, por ejemplo (3, 4) para una matriz de 3 filas y 4 columnas.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: '¿Qué operación calcula la media de los valores de un array?',
        options: ['mean()', 'sum()', 'median()', 'max()'],
        answer: 0,
        explanation: 'mean() calcula la media aritmética de los valores del array.'
      },
      {
        library: 'numpy',
        type: 'fill',
        question: '¿Cómo se llama la función que calcula la media de un array?',
        answer: 'mean',
        answers: ['mean', 'mean()'],
        explanation: 'La función mean() calcula la media aritmética de los valores del array.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: '¿Qué librería se utiliza habitualmente para crear gráficos en Python?',
        options: ['Matplotlib', 'Pandas', 'NumPy', 'SciPy'],
        answer: 0,
        explanation: 'Matplotlib es la librería clásica para crear gráficos de forma flexible y personalizable.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: '¿Qué función crea un gráfico de líneas?',
        options: ['plot()', 'bar()', 'scatter()', 'hist()'],
        answer: 0,
        explanation: 'plot() es la función habitual para dibujar gráficos de líneas con valores secuenciales.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: '¿Qué orden muestra el gráfico en pantalla?',
        options: ['show()', 'display()', 'print()', 'render()'],
        answer: 0,
        explanation: 'show() muestra el gráfico creado; es el último paso para verlo visualmente.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: '¿Qué función sirve para añadir un título al gráfico?',
        options: ['title()', 'label()', 'legend()', 'axis()'],
        answer: 0,
        explanation: 'title() asigna un título al gráfico para hacerlo más claro y comprensible.'
      },
      {
        library: 'matplotlib',
        type: 'boolean',
        question: '¿Es cierto que Seaborn amplía Matplotlib con estilos y gráficos estadísticos?',
        options: ['Verdadero', 'Falso'],
        answer: 0,
        explanation: 'Sí, Seaborn aporta estilos modernos y visualizaciones estadísticas sobre Matplotlib.'
      },
      {
        library: 'matplotlib',
        type: 'matching',
        question: 'Relaciona cada función con lo que hace:',
        pairs: [
          { left: 'plot()', options: ['Dibuja una línea', 'Muestra el gráfico', 'Añade un título'], answer: 'Dibuja una línea' },
          { left: 'show()', options: ['Dibuja una línea', 'Muestra el gráfico', 'Añade un título'], answer: 'Muestra el gráfico' },
          { left: 'title()', options: ['Dibuja una línea', 'Muestra el gráfico', 'Añade un título'], answer: 'Añade un título' }
        ],
        explanation: 'plot() crea el gráfico, show() lo muestra y title() le pone un título.'
      }
    ],
    en: [
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Which main structure is used in Pandas to work with tables?',
        options: ['DataFrame', 'Array', 'List', 'Dictionary'],
        answer: 0,
        explanation: 'The DataFrame is the main Pandas structure because it organizes data in rows and columns, like a table.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Which function reads data from a CSV file with Pandas?',
        options: ['read_csv()', 'load_csv()', 'import_csv()', 'open_csv()'],
        answer: 0,
        explanation: 'read_csv() is the standard function for reading CSV files and turning them into a DataFrame.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Which instruction is used to select a column?',
        options: ['df["nom"]', 'df.get_column("nom")', 'df.select("nom")', 'df.column("nom")'],
        answer: 0,
        explanation: 'To get a Pandas column, use df["nom"] or df.nom, because the column is a Series.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Which operation groups data by a column?',
        options: ['groupby()', 'sort_values()', 'merge()', 'dropna()'],
        answer: 0,
        explanation: 'groupby() groups rows by a column so values can be summarized or counted.'
      },
      {
        library: 'pandas',
        type: 'multiple',
        question: 'Which function removes rows with missing values?',
        options: ['dropna()', 'fillna()', 'replace()', 'isna()'],
        answer: 0,
        explanation: 'dropna() removes rows or columns with missing values, while fillna() fills them.'
      },
      {
        library: 'pandas',
        type: 'boolean',
        question: 'Is Pandas ideal for working with tables in DataFrame format?',
        options: ['True', 'False'],
        answer: 0,
        explanation: 'Yes, Pandas is designed specifically to work with tabular data through DataFrames.'
      },
      {
        library: 'pandas',
        type: 'fill',
        question: 'Write the name of the main Pandas structure.',
        answer: 'dataframe',
        answers: ['dataframe', 'data frame'],
        explanation: 'The correct answer is DataFrame, the main way to represent tables in Pandas.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'What is the main way to work with data in NumPy?',
        options: ['Arrays', 'DataFrames', 'Lists', 'Charts'],
        answer: 0,
        explanation: 'NumPy mainly works with arrays, efficient multidimensional structures for numerical computing.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Which function creates an array with values between two limits?',
        options: ['arange()', 'range()', 'linspace()', 'create_array()'],
        answer: 2,
        explanation: 'linspace() creates evenly spaced values between two limits, while arange() uses a specific step.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Which array property indicates its shape?',
        options: ['shape', 'size', 'dtype', 'ndim'],
        answer: 0,
        explanation: 'shape shows the dimensions of the array, such as (3, 4) for a matrix with 3 rows and 4 columns.'
      },
      {
        library: 'numpy',
        type: 'multiple',
        question: 'Which operation calculates the mean of an array?',
        options: ['mean()', 'sum()', 'median()', 'max()'],
        answer: 0,
        explanation: 'mean() calculates the arithmetic mean of the array values.'
      },
      {
        library: 'numpy',
        type: 'fill',
        question: 'What is the name of the function that calculates the mean of an array?',
        answer: 'mean',
        answers: ['mean', 'mean()'],
        explanation: 'The mean() function calculates the arithmetic mean of the array values.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Which library is commonly used to create charts in Python?',
        options: ['Matplotlib', 'Pandas', 'NumPy', 'SciPy'],
        answer: 0,
        explanation: 'Matplotlib is the classic library for creating flexible and customizable charts.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Which function creates a line chart?',
        options: ['plot()', 'bar()', 'scatter()', 'hist()'],
        answer: 0,
        explanation: 'plot() is the usual function for drawing line charts with sequential values.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Which command displays the chart on screen?',
        options: ['show()', 'display()', 'print()', 'render()'],
        answer: 0,
        explanation: 'show() displays the chart that has been created; it is the final step to view it visually.'
      },
      {
        library: 'matplotlib',
        type: 'multiple',
        question: 'Which function adds a title to a chart?',
        options: ['title()', 'label()', 'legend()', 'axis()'],
        answer: 0,
        explanation: 'title() assigns a title to the chart to make it clearer and easier to understand.'
      },
      {
        library: 'matplotlib',
        type: 'boolean',
        question: 'Does Seaborn extend Matplotlib with styles and statistical charts?',
        options: ['True', 'False'],
        answer: 0,
        explanation: 'Yes, Seaborn adds modern styles and statistical visualizations on top of Matplotlib.'
      },
      {
        library: 'matplotlib',
        type: 'matching',
        question: 'Match each function with what it does:',
        pairs: [
          { left: 'plot()', options: ['Draws a line', 'Displays the chart', 'Adds a title'], answer: 'Draws a line' },
          { left: 'show()', options: ['Draws a line', 'Displays the chart', 'Adds a title'], answer: 'Displays the chart' },
          { left: 'title()', options: ['Draws a line', 'Displays the chart', 'Adds a title'], answer: 'Adds a title' }
        ],
        explanation: 'plot() creates the chart, show() displays it and title() gives it a title.'
      }
    ]
  };

  const ui = {
    ca: {
      langLabel: 'Configuració de la web',
      lightMode: 'Mode clar',
      darkMode: 'Mode fosc',
      useLightMode: 'Activar mode clar',
      useDarkMode: 'Activar mode fosc',
      hideLanguages: 'Ocultar configuració',
      showLanguages: 'Mostrar configuració',
      dateTimeLabel: 'Data i hora actuals',
      hideDateTime: 'Ocultar data i hora',
      showDateTime: 'Mostrar data i hora',
      selectedLibraries: count => `S’han seleccionat ${count} llibreria/es. Tindràs preguntes aleatòries.`,
      selectedQuestions: (count, total) => `S’han seleccionat ${count} llibreria/es. Tindràs ${total} preguntes aleatòries.`,
      selectLibrary: 'Selecciona almenys una llibreria per començar.',
      zeroPoints: '0 punts',
      points: points => `${points} punts`,
      writeAnswer: 'Escriu la resposta',
      chooseOption: 'Tria una opció',
      correctAnswer: 'Resposta correcta:',
      unanswered: 'No has respost.',
      missingAnswers: 'Has deixat preguntes sense respondre. Revisa les explicacions i torna-ho a provar.',
      result: (points, total, percent) => `Has encertat ${points} de ${total} preguntes (${percent}%).`,
      great: ' Molt bé!',
      good: ' Bona feina, però pots millorar.',
      review: ' Repassa una mica més les llibreries.'
    },
    es: {
      langLabel: 'Configuración de la web',
      lightMode: 'Modo claro',
      darkMode: 'Modo oscuro',
      useLightMode: 'Activar modo claro',
      useDarkMode: 'Activar modo oscuro',
      hideLanguages: 'Ocultar configuración',
      showLanguages: 'Mostrar configuración',
      dateTimeLabel: 'Fecha y hora actuales',
      hideDateTime: 'Ocultar fecha y hora',
      showDateTime: 'Mostrar fecha y hora',
      selectedLibraries: count => `Se han seleccionado ${count} librería/s. Tendrás preguntas aleatorias.`,
      selectedQuestions: (count, total) => `Se han seleccionado ${count} librería/s. Tendrás ${total} preguntas aleatorias.`,
      selectLibrary: 'Selecciona al menos una librería para empezar.',
      zeroPoints: '0 puntos',
      points: points => `${points} puntos`,
      writeAnswer: 'Escribe la respuesta',
      chooseOption: 'Elige una opción',
      correctAnswer: 'Respuesta correcta:',
      unanswered: 'No has respondido.',
      missingAnswers: 'Has dejado preguntas sin responder. Revisa las explicaciones y vuelve a intentarlo.',
      result: (points, total, percent) => `Has acertado ${points} de ${total} preguntas (${percent}%).`,
      great: ' ¡Muy bien!',
      good: ' Buen trabajo, pero puedes mejorar.',
      review: ' Repasa un poco más las librerías.'
    },
    en: {
      langLabel: 'Website settings',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      useLightMode: 'Turn on light mode',
      useDarkMode: 'Turn on dark mode',
      hideLanguages: 'Hide settings',
      showLanguages: 'Show settings',
      dateTimeLabel: 'Current date and time',
      hideDateTime: 'Hide date and time',
      showDateTime: 'Show date and time',
      selectedLibraries: count => `${count} library/libraries selected. You will get random questions.`,
      selectedQuestions: (count, total) => `${count} library/libraries selected. You will get ${total} random questions.`,
      selectLibrary: 'Select at least one library to start.',
      zeroPoints: '0 points',
      points: points => `${points} points`,
      writeAnswer: 'Write the answer',
      chooseOption: 'Choose an option',
      correctAnswer: 'Correct answer:',
      unanswered: 'You have not answered.',
      missingAnswers: 'Some questions are unanswered. Review the explanations and try again.',
      result: (points, total, percent) => `You got ${points} out of ${total} questions right (${percent}%).`,
      great: ' Very good!',
      good: ' Good work, but you can improve.',
      review: ' Review the libraries a little more.'
    }
  };

  const pages = {
    'index.html': {
      ca: {
        title: 'Tractament de dades amb Python',
        heroTitle: 'Tractament de dades amb Python',
        heroText: 'Explora les llibreries Pandas, NumPy i Matplotlib-Seaborn per analitzar, tractar i visualitzar dades amb Python.',
        heroButtons: ['Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        summaryTitle: '📘 Què aprenem?',
        summaryText: '"Tractament de dades amb Python: llibreries Pandas, NumPy i Matplotlib-Seaborn" és una introducció a les eines principals per treballar amb dades. Aprendràs a organitzar taules, calcular estadístiques, fer operacions numèriques i crear gràfics atractius per interpretar resultats.',
        cardTitles: ['🐼 Pandas', '🔢 NumPy', '📈 Matplotlib / Seaborn'],
        cardTexts: [
          'Pandas és ideal per gestionar dades en taules amb DataFrame. Permet llegir fitxers CSV, ordenar, filtrar, agrupar i preparar dades per a anàlisis.',
          'NumPy facilita el càlcul numèric amb arrays d’alt rendiment. És la base per a operacions matemàtiques, estadístiques i algorismes científics a Python.',
          'Matplotlib crea gràfics 2D potents i Seaborn afegeix estils moderns i gràfics estadístics. És la millor combinació per visualitzar resultats de dades.'
        ],
        moreInfo: 'Més informació',
        extras: [
          ['❓ Qüestionari', 'Repassa conceptes clau de les llibreries amb preguntes sobre taules, arrays, gràfics i estadístiques.', 'Anar al qüestionari'],
          ['▶️ Recursos', 'Consulta vídeos didàctics i materials addicionals per veure exemples pràctics de Pandas, NumPy i Matplotlib-Seaborn en acció.', 'Veure recursos']
        ],
        footer: 'Projecte didàctic de Python per a 2nBAT: tractament de dades amb Pandas, NumPy i Matplotlib-Seaborn.'
      },
      es: {
        title: 'Tratamiento de datos con Python',
        heroTitle: 'Tratamiento de datos con Python',
        heroText: 'Explora las librerías Pandas, NumPy y Matplotlib-Seaborn para analizar, tratar y visualizar datos con Python.',
        heroButtons: ['Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        summaryTitle: '📘 ¿Qué aprendemos?',
        summaryText: '"Tratamiento de datos con Python: librerías Pandas, NumPy y Matplotlib-Seaborn" es una introducción a las herramientas principales para trabajar con datos. Aprenderás a organizar tablas, calcular estadísticas, hacer operaciones numéricas y crear gráficos atractivos para interpretar resultados.',
        cardTitles: ['🐼 Pandas', '🔢 NumPy', '📈 Matplotlib / Seaborn'],
        cardTexts: [
          'Pandas es ideal para gestionar datos en tablas con DataFrame. Permite leer archivos CSV, ordenar, filtrar, agrupar y preparar datos para análisis.',
          'NumPy facilita el cálculo numérico con arrays de alto rendimiento. Es la base para operaciones matemáticas, estadísticas y algoritmos científicos en Python.',
          'Matplotlib crea gráficos 2D potentes y Seaborn añade estilos modernos y gráficos estadísticos. Es la mejor combinación para visualizar resultados de datos.'
        ],
        moreInfo: 'Más información',
        extras: [
          ['❓ Cuestionario', 'Repasa conceptos clave de las librerías con preguntas sobre tablas, arrays, gráficos y estadísticas.', 'Ir al cuestionario'],
          ['▶️ Recursos', 'Consulta vídeos didácticos y materiales adicionales para ver ejemplos prácticos de Pandas, NumPy y Matplotlib-Seaborn en acción.', 'Ver recursos']
        ],
        footer: 'Proyecto didáctico de Python para 2º de Bachillerato: tratamiento de datos con Pandas, NumPy y Matplotlib-Seaborn.'
      },
      en: {
        title: 'Data Processing with Python',
        heroTitle: 'Data Processing with Python',
        heroText: 'Explore Pandas, NumPy and Matplotlib-Seaborn to analyze, process and visualize data with Python.',
        heroButtons: ['Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        summaryTitle: '📘 What will we learn?',
        summaryText: '"Data processing with Python: Pandas, NumPy and Matplotlib-Seaborn" is an introduction to the main tools for working with data. You will learn to organize tables, calculate statistics, perform numerical operations and create attractive charts to interpret results.',
        cardTitles: ['🐼 Pandas', '🔢 NumPy', '📈 Matplotlib / Seaborn'],
        cardTexts: [
          'Pandas is ideal for managing table data with DataFrames. It can read CSV files, sort, filter, group and prepare data for analysis.',
          'NumPy makes numerical computing easier with high-performance arrays. It is the basis for mathematical, statistical and scientific algorithms in Python.',
          'Matplotlib creates powerful 2D charts and Seaborn adds modern styles and statistical charts. Together they are excellent for visualizing data results.'
        ],
        moreInfo: 'More information',
        extras: [
          ['❓ Quiz', 'Review key library concepts with questions about tables, arrays, charts and statistics.', 'Go to the quiz'],
          ['▶️ Resources', 'Check educational videos and extra materials with practical examples of Pandas, NumPy and Matplotlib-Seaborn in action.', 'View resources']
        ],
        footer: 'Educational Python project for 2nd Baccalaureate: data processing with Pandas, NumPy and Matplotlib-Seaborn.'
      }
    },
    'pandas.html': {
      ca: {
        title: 'Introducció a Pandas',
        heroTitle: 'Introducció a Pandas',
        heroText: 'Descobreix com Pandas ajuda a organitzar, netejar i analitzar dades en taules amb Python.',
        heroButtons: ['Tornar a l’inici', 'Introducció', 'Per què utilitzar-la', 'Instal·lació'],
        nav: ['Inici', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducció', '⚡ Per què utilitzar Pandas?', '🛠️ Instal·lació i importació', '🧪 Exemples pràctics de Pandas'],
        subheadings: ['📊 Organitzar dades', '🧹 Netejar dades', 'Exemple 1: crear un DataFrame', 'Exemple 2: filtrar dades', 'Exemple 3: resumir dades'],
        paragraphs: [
          'Pandas és una llibreria de Python pensada per treballar amb dades tabulars. Permet llegir fitxers, organitzar informació en taules i fer operacions d’anàlisi amb molta facilitat.',
          'La unitat bàsica de Pandas és el DataFrame, una taula molt semblant a una fulla de càlcul. També existeixen els Series, que són columnes individuals de dades.',
          'Pandas és molt utilitzada en ciència de dades, estadística, finances i qualsevol àmbit on cal gestionar informació estructurada.',
          'Pandas facilita ordenar, filtrar i revisar dades de manera molt intuïtiva. És ideal per convertir informació bruta en dades útils per a l’anàlisi.',
          'Permet eliminar valors buits, canviar noms de columnes i corregir errors de forma ràpida, cosa que és molt important en projectes reals.',
          'Pandas destaca perquè:',
          'És una eina clau per transformar dades en informació útil abans de representar-les o interpretar-les.',
          'Per instal·lar Pandas, podem executar:',
          'I per començar a treballar amb ella:',
          'Així, podem crear taules i treballar amb dades de forma clara i ordenada.',
          'Aquests exemples mostren situacions molt habituals quan treballem amb dades.',
          'Amb un DataFrame podem guardar dades de forma estructurada, com si fos una taula.',
          'Això ens permet seleccionar només les files que compleixen una condició.',
          'Amb Pandas podem obtenir resums estadístics de manera molt ràpida.'
        ],
        items: [
          'Gestiona dades tabulars amb facilitat.',
          'Permet filtrar i ordenar informació ràpidament.',
          'És compatible amb NumPy i amb gràfiques de Matplotlib.',
          'Simplifica l’anàlisi de grans conjunts de dades.'
        ],
        footer: 'Projecte didàctic de Python per a 2nBAT: introducció a Pandas per a l’anàlisi de dades.'
      },
      es: {
        title: 'Introducción a Pandas',
        heroTitle: 'Introducción a Pandas',
        heroText: 'Descubre cómo Pandas ayuda a organizar, limpiar y analizar datos en tablas con Python.',
        heroButtons: ['Volver al inicio', 'Introducción', 'Por qué utilizarla', 'Instalación'],
        nav: ['Inicio', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducción', '⚡ ¿Por qué utilizar Pandas?', '🛠️ Instalación e importación', '🧪 Ejemplos prácticos de Pandas'],
        subheadings: ['📊 Organizar datos', '🧹 Limpiar datos', 'Ejemplo 1: crear un DataFrame', 'Ejemplo 2: filtrar datos', 'Ejemplo 3: resumir datos'],
        paragraphs: [
          'Pandas es una librería de Python pensada para trabajar con datos tabulares. Permite leer archivos, organizar información en tablas y hacer operaciones de análisis con mucha facilidad.',
          'La unidad básica de Pandas es el DataFrame, una tabla muy parecida a una hoja de cálculo. También existen las Series, que son columnas individuales de datos.',
          'Pandas se utiliza mucho en ciencia de datos, estadística, finanzas y cualquier ámbito donde haya que gestionar información estructurada.',
          'Pandas facilita ordenar, filtrar y revisar datos de forma muy intuitiva. Es ideal para convertir información bruta en datos útiles para el análisis.',
          'Permite eliminar valores vacíos, cambiar nombres de columnas y corregir errores de forma rápida, algo muy importante en proyectos reales.',
          'Pandas destaca porque:',
          'Es una herramienta clave para transformar datos en información útil antes de representarlos o interpretarlos.',
          'Para instalar Pandas, podemos ejecutar:',
          'Y para empezar a trabajar con ella:',
          'Así podemos crear tablas y trabajar con datos de forma clara y ordenada.',
          'Estos ejemplos muestran situaciones muy habituales cuando trabajamos con datos.',
          'Con un DataFrame podemos guardar datos de forma estructurada, como si fuera una tabla.',
          'Esto nos permite seleccionar solo las filas que cumplen una condición.',
          'Con Pandas podemos obtener resúmenes estadísticos de forma muy rápida.'
        ],
        items: [
          'Gestiona datos tabulares con facilidad.',
          'Permite filtrar y ordenar información rápidamente.',
          'Es compatible con NumPy y con gráficos de Matplotlib.',
          'Simplifica el análisis de grandes conjuntos de datos.'
        ],
        footer: 'Proyecto didáctico de Python para 2º de Bachillerato: introducción a Pandas para el análisis de datos.'
      },
      en: {
        title: 'Introduction to Pandas',
        heroTitle: 'Introduction to Pandas',
        heroText: 'Discover how Pandas helps organize, clean and analyze table data with Python.',
        heroButtons: ['Back to home', 'Introduction', 'Why use it', 'Installation'],
        nav: ['Home', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introduction', '⚡ Why use Pandas?', '🛠️ Installation and import', '🧪 Practical Pandas examples'],
        subheadings: ['📊 Organizing data', '🧹 Cleaning data', 'Example 1: create a DataFrame', 'Example 2: filter data', 'Example 3: summarize data'],
        paragraphs: [
          'Pandas is a Python library designed to work with tabular data. It can read files, organize information in tables and perform analysis operations very easily.',
          'The basic Pandas unit is the DataFrame, a table that is very similar to a spreadsheet. There are also Series, which are individual columns of data.',
          'Pandas is widely used in data science, statistics, finance and any field where structured information must be managed.',
          'Pandas makes it intuitive to sort, filter and review data. It is ideal for turning raw information into useful data for analysis.',
          'It can remove missing values, rename columns and correct errors quickly, which is very important in real projects.',
          'Pandas stands out because:',
          'It is a key tool for transforming data into useful information before representing or interpreting it.',
          'To install Pandas, run:',
          'And to start working with it:',
          'This lets us create tables and work with data in a clear and organized way.',
          'These examples show very common situations when working with data.',
          'With a DataFrame we can store data in a structured way, like a table.',
          'This lets us select only the rows that meet a condition.',
          'With Pandas we can obtain statistical summaries very quickly.'
        ],
        items: [
          'Manages tabular data easily.',
          'Filters and sorts information quickly.',
          'Works with NumPy and Matplotlib charts.',
          'Simplifies the analysis of large data sets.'
        ],
        footer: 'Educational Python project for 2nd Baccalaureate: introduction to Pandas for data analysis.'
      }
    },
    'numpy.html': {
      ca: {
        title: 'Introducció a NumPy',
        heroTitle: 'Introducció a NumPy',
        heroText: 'Descobreix com NumPy facilita el càlcul numèric, l’anàlisi de dades i la visualització amb Python.',
        heroButtons: ['Tornar a l’inici', 'Introducció', 'Per què utilitzar-lo', 'Instal·lació'],
        nav: ['Inici', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducció', '⚡ Per què utilitzar NumPy?', '🛠️ Instal·lació i importació', '🧪 Exemples pràctics de NumPy'],
        subheadings: ['Llistes de Python', 'Arrays de NumPy', 'Exemple 1: crear un array i fer operacions', 'Exemple 2: calcular la mitjana i la desviació estàndard', 'Exemple 3: crear una matriu i seleccionar dades'],
        paragraphs: [
          'NumPy és la llibreria bàsica per al càlcul numèric amb Python. El seu nom prové de Numerical Python i és una eina fonamental per treballar amb dades, matemàtiques i estadística.',
          'Es fa servir per crear i manipular vectors, matrius i tensors amb molta eficiència. En l’anàlisi de dades, NumPy és la base sobre la qual es construeixen moltes altres eines, com Pandas per a taules i Matplotlib per a gràfics.',
          'Alguns casos d’ús reals són el processament d’imatges, l’anàlisi de sèries temporals, la modelització estadística, la ciència de dades i la programació científica.',
          'Les llistes permeten emmagatzemar valors, però no estan optimitzades per a càlculs numèrics intensius. Les operacions amb llistes són més lentes i requereixen codi addicional.',
          'Els arrays de NumPy permeten fer operacions de forma immediata i eficient, amb suport per a operacions vectoritzades i càlculs matemàtics avançats.',
          'NumPy destaca per quatre motius principals:',
          'Per exemple, si volem sumar dos conjunts de dades, NumPy ho fa element a element de manera automàtica, cosa que simplifica molt el codi.',
          'Per instal·lar NumPy en l’entorn de Python, podem fer servir pip:',
          'Una vegada instal·lada, la importació més habitual és aquesta:',
          'Així, fem servir np com a abreviatura per treballar amb la llibreria de manera més ràpida i clara.',
          'Aquests exemples mostren com NumPy simplifica tasques habituals en ciència de dades i matemàtiques.',
          'Amb NumPy podem sumar 1 a tots els valors d’un array de forma molt senzilla.',
          'Aquest tipus d’operacions és molt útil per analitzar dades d’alumnes o resultats d’experiments.',
          'Amb matrius podem treballar amb dades organitzades en files i columnes, com si fossin taules.'
        ],
        items: [
          'Velocitat: els càlculs són molt més ràpids que amb llistes de Python.',
          'Rendiment: està optimitzat per a operacions matemàtiques sobre grans quantitats de dades.',
          'Memòria: utilitza un emmagatzematge més compacte i eficient.',
          'Operacions vectoritzades: permet aplicar una operació a tots els elements d’un array de manera molt senzilla.'
        ],
        footer: 'Projecte didàctic de Python per a 2nBAT: introducció a NumPy per a l’anàlisi i el tractament de dades.'
      },
      es: {
        title: 'Introducción a NumPy',
        heroTitle: 'Introducción a NumPy',
        heroText: 'Descubre cómo NumPy facilita el cálculo numérico, el análisis de datos y la visualización con Python.',
        heroButtons: ['Volver al inicio', 'Introducción', 'Por qué utilizarlo', 'Instalación'],
        nav: ['Inicio', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducción', '⚡ ¿Por qué utilizar NumPy?', '🛠️ Instalación e importación', '🧪 Ejemplos prácticos de NumPy'],
        subheadings: ['Listas de Python', 'Arrays de NumPy', 'Ejemplo 1: crear un array y hacer operaciones', 'Ejemplo 2: calcular la media y la desviación estándar', 'Ejemplo 3: crear una matriz y seleccionar datos'],
        paragraphs: [
          'NumPy es la librería básica para el cálculo numérico con Python. Su nombre viene de Numerical Python y es una herramienta fundamental para trabajar con datos, matemáticas y estadística.',
          'Se utiliza para crear y manipular vectores, matrices y tensores con mucha eficiencia. En el análisis de datos, NumPy es la base sobre la que se construyen muchas otras herramientas, como Pandas para tablas y Matplotlib para gráficos.',
          'Algunos casos de uso reales son el procesamiento de imágenes, el análisis de series temporales, la modelización estadística, la ciencia de datos y la programación científica.',
          'Las listas permiten almacenar valores, pero no están optimizadas para cálculos numéricos intensivos. Las operaciones con listas son más lentas y requieren código adicional.',
          'Los arrays de NumPy permiten hacer operaciones de forma inmediata y eficiente, con soporte para operaciones vectorizadas y cálculos matemáticos avanzados.',
          'NumPy destaca por cuatro motivos principales:',
          'Por ejemplo, si queremos sumar dos conjuntos de datos, NumPy lo hace elemento a elemento de forma automática, lo que simplifica mucho el código.',
          'Para instalar NumPy en el entorno de Python, podemos usar pip:',
          'Una vez instalada, la importación más habitual es esta:',
          'Así usamos np como abreviatura para trabajar con la librería de forma más rápida y clara.',
          'Estos ejemplos muestran cómo NumPy simplifica tareas habituales en ciencia de datos y matemáticas.',
          'Con NumPy podemos sumar 1 a todos los valores de un array de forma muy sencilla.',
          'Este tipo de operaciones es muy útil para analizar datos de alumnado o resultados de experimentos.',
          'Con matrices podemos trabajar con datos organizados en filas y columnas, como si fueran tablas.'
        ],
        items: [
          'Velocidad: los cálculos son mucho más rápidos que con listas de Python.',
          'Rendimiento: está optimizado para operaciones matemáticas sobre grandes cantidades de datos.',
          'Memoria: utiliza un almacenamiento más compacto y eficiente.',
          'Operaciones vectorizadas: permite aplicar una operación a todos los elementos de un array de forma muy sencilla.'
        ],
        footer: 'Proyecto didáctico de Python para 2º de Bachillerato: introducción a NumPy para el análisis y el tratamiento de datos.'
      },
      en: {
        title: 'Introduction to NumPy',
        heroTitle: 'Introduction to NumPy',
        heroText: 'Discover how NumPy makes numerical computing, data analysis and visualization easier with Python.',
        heroButtons: ['Back to home', 'Introduction', 'Why use it', 'Installation'],
        nav: ['Home', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introduction', '⚡ Why use NumPy?', '🛠️ Installation and import', '🧪 Practical NumPy examples'],
        subheadings: ['Python lists', 'NumPy arrays', 'Example 1: create an array and perform operations', 'Example 2: calculate the mean and standard deviation', 'Example 3: create a matrix and select data'],
        paragraphs: [
          'NumPy is the basic library for numerical computing with Python. Its name comes from Numerical Python and it is a fundamental tool for working with data, mathematics and statistics.',
          'It is used to create and manipulate vectors, matrices and tensors very efficiently. In data analysis, NumPy is the base on which many other tools are built, such as Pandas for tables and Matplotlib for charts.',
          'Real use cases include image processing, time series analysis, statistical modeling, data science and scientific programming.',
          'Lists can store values, but they are not optimized for intensive numerical calculations. Operations with lists are slower and require extra code.',
          'NumPy arrays make operations immediate and efficient, with support for vectorized operations and advanced mathematical calculations.',
          'NumPy stands out for four main reasons:',
          'For example, if we want to add two data sets, NumPy does it element by element automatically, which greatly simplifies the code.',
          'To install NumPy in the Python environment, use pip:',
          'Once installed, the most common import is:',
          'This way we use np as an abbreviation to work with the library faster and more clearly.',
          'These examples show how NumPy simplifies common tasks in data science and mathematics.',
          'With NumPy we can add 1 to every value in an array very easily.',
          'This type of operation is very useful for analyzing student data or experiment results.',
          'With matrices we can work with data organized in rows and columns, as if they were tables.'
        ],
        items: [
          'Speed: calculations are much faster than with Python lists.',
          'Performance: it is optimized for mathematical operations on large amounts of data.',
          'Memory: it uses more compact and efficient storage.',
          'Vectorized operations: it applies an operation to all elements of an array very easily.'
        ],
        footer: 'Educational Python project for 2nd Baccalaureate: introduction to NumPy for data analysis and processing.'
      }
    },
    'matplotlib.html': {
      ca: {
        title: 'Introducció a Matplotlib i Seaborn',
        heroTitle: 'Introducció a Matplotlib i Seaborn',
        heroText: 'Aprèn a crear gràfics clars i atractius per interpretar dades amb Python.',
        heroButtons: ['Tornar a l’inici', 'Introducció', 'Per què utilitzar-les', 'Instal·lació'],
        nav: ['Inici', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducció', '⚡ Per què utilitzar Matplotlib i Seaborn?', '📊 Exemple visual amb Matplotlib', '🛠️ Instal·lació i importació', '🧪 Exemples pràctics'],
        subheadings: ['📈 Gràfics de línia', '📊 Gràfics de barres', 'Exemple 1: gràfic de línia', 'Exemple 2: gràfic de dispersió', 'Exemple 3: gràfic de barres'],
        paragraphs: [
          'Matplotlib és la llibreria més utilitzada per crear gràfics a Python, mentre que Seaborn facilita visualitzacions més atractives i estadístiques.',
          'Aquestes eines permeten mostrar tendències, comparacions i patrons en dades de manera molt visual. Són molt útils tant per a treballs acadèmics com per a presentacions i informes.',
          'Normalment es combinen amb Pandas i NumPy per analitzar dades i després representar-les amb gràfics.',
          'Matplotlib permet crear gràfics de línia per mostrar canvis al llarg del temps o evolucions de variables.',
          'Seaborn facilita representar dades categòriques amb gràfics de barres molt visuals i fàcils d’interpretar.',
          'Aquestes llibreries permeten:',
          'És molt habitual utilitzar-les després d’haver tractat dades amb NumPy i Pandas.',
          'Aquest gràfic mostra com podem representar una sèrie de dades amb una línia clara i llegible.',
          'Exemple de gràfic de línia amb eixos, títol i punts marcats.',
          'Per instal·lar aquestes llibreries, podem fer servir:',
          'I després importar-les així:',
          'Així podem començar a generar gràfics de forma senzilla.',
          'Alguns exemples molt útils per entendre el potencial de la visualització de dades.',
          'És ideal per mostrar l’evolució d’un valor al llarg del temps.',
          'Ajuda a veure relacions entre dues variables.',
          'És perfecte per comparar categories o resultats.'
        ],
        items: [
          'Expressar resultats de forma visual.',
          'Comparar dades de manera ràpida i clara.',
          'Millorar la comprensió d’informació complexa.',
          'Crear gràfics professionals amb poc codi.'
        ],
        imageAlt: 'Gràfic de línia creat amb Matplotlib',
        footer: 'Projecte didàctic de Python per a 2nBAT: visualització de dades amb Matplotlib i Seaborn.'
      },
      es: {
        title: 'Introducción a Matplotlib y Seaborn',
        heroTitle: 'Introducción a Matplotlib y Seaborn',
        heroText: 'Aprende a crear gráficos claros y atractivos para interpretar datos con Python.',
        heroButtons: ['Volver al inicio', 'Introducción', 'Por qué utilizarlas', 'Instalación'],
        nav: ['Inicio', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introducción', '⚡ ¿Por qué utilizar Matplotlib y Seaborn?', '📊 Ejemplo visual con Matplotlib', '🛠️ Instalación e importación', '🧪 Ejemplos prácticos'],
        subheadings: ['📈 Gráficos de línea', '📊 Gráficos de barras', 'Ejemplo 1: gráfico de línea', 'Ejemplo 2: gráfico de dispersión', 'Ejemplo 3: gráfico de barras'],
        paragraphs: [
          'Matplotlib es la librería más utilizada para crear gráficos en Python, mientras que Seaborn facilita visualizaciones más atractivas y estadísticas.',
          'Estas herramientas permiten mostrar tendencias, comparaciones y patrones en datos de forma muy visual. Son muy útiles tanto para trabajos académicos como para presentaciones e informes.',
          'Normalmente se combinan con Pandas y NumPy para analizar datos y después representarlos con gráficos.',
          'Matplotlib permite crear gráficos de línea para mostrar cambios a lo largo del tiempo o evoluciones de variables.',
          'Seaborn facilita representar datos categóricos con gráficos de barras muy visuales y fáciles de interpretar.',
          'Estas librerías permiten:',
          'Es muy habitual utilizarlas después de haber tratado datos con NumPy y Pandas.',
          'Este gráfico muestra cómo podemos representar una serie de datos con una línea clara y legible.',
          'Ejemplo de gráfico de línea con ejes, título y puntos marcados.',
          'Para instalar estas librerías, podemos usar:',
          'Y después importarlas así:',
          'Así podemos empezar a generar gráficos de forma sencilla.',
          'Algunos ejemplos muy útiles para entender el potencial de la visualización de datos.',
          'Es ideal para mostrar la evolución de un valor a lo largo del tiempo.',
          'Ayuda a ver relaciones entre dos variables.',
          'Es perfecto para comparar categorías o resultados.'
        ],
        items: [
          'Expresar resultados de forma visual.',
          'Comparar datos de manera rápida y clara.',
          'Mejorar la comprensión de información compleja.',
          'Crear gráficos profesionales con poco código.'
        ],
        imageAlt: 'Gráfico de línea creado con Matplotlib',
        footer: 'Proyecto didáctico de Python para 2º de Bachillerato: visualización de datos con Matplotlib y Seaborn.'
      },
      en: {
        title: 'Introduction to Matplotlib and Seaborn',
        heroTitle: 'Introduction to Matplotlib and Seaborn',
        heroText: 'Learn to create clear and attractive charts to interpret data with Python.',
        heroButtons: ['Back to home', 'Introduction', 'Why use them', 'Installation'],
        nav: ['Home', 'Pandas', 'NumPy', 'Matplotlib / Seaborn'],
        headings: ['💡 Introduction', '⚡ Why use Matplotlib and Seaborn?', '📊 Visual example with Matplotlib', '🛠️ Installation and import', '🧪 Practical examples'],
        subheadings: ['📈 Line charts', '📊 Bar charts', 'Example 1: line chart', 'Example 2: scatter plot', 'Example 3: bar chart'],
        paragraphs: [
          'Matplotlib is the most widely used library for creating charts in Python, while Seaborn makes more attractive and statistical visualizations easier.',
          'These tools show trends, comparisons and patterns in data in a very visual way. They are useful for academic work as well as presentations and reports.',
          'They are usually combined with Pandas and NumPy to analyze data and then represent it with charts.',
          'Matplotlib can create line charts to show changes over time or variable trends.',
          'Seaborn makes it easy to represent categorical data with visual bar charts that are easy to interpret.',
          'These libraries let us:',
          'They are commonly used after processing data with NumPy and Pandas.',
          'This chart shows how we can represent a data series with a clear and readable line.',
          'Example of a line chart with axes, a title and marked points.',
          'To install these libraries, use:',
          'Then import them like this:',
          'This lets us start generating charts easily.',
          'Some useful examples to understand the potential of data visualization.',
          'It is ideal for showing how a value evolves over time.',
          'It helps reveal relationships between two variables.',
          'It is perfect for comparing categories or results.'
        ],
        items: [
          'Express results visually.',
          'Compare data quickly and clearly.',
          'Improve understanding of complex information.',
          'Create professional charts with little code.'
        ],
        imageAlt: 'Line chart created with Matplotlib',
        footer: 'Educational Python project for 2nd Baccalaureate: data visualization with Matplotlib and Seaborn.'
      }
    },
    'questionari.html': {
      ca: {
        title: 'Qüestionari dinàmic | Python dades',
        heroTitle: '🧠 Qüestionari dinàmic',
        heroText: 'Tria les llibreries que vols repassar. Cada una inclou 5 preguntes i el qüestionari es genera segons la teva selecció.',
        heroButtons: ['Tornar a l’inici'],
        selectorTitle: 'Selecciona les llibreries',
        selectorText: 'Marca una o diverses opcions i prepara’t per respondre. El sistema barrejarà les preguntes i calcularà la teva puntuació.',
        start: 'Començar el qüestionari',
        progress: 'Progrés',
        submit: 'Enviar respostes',
        restart: 'Reiniciar',
        footer: 'Qüestionari creat per reforçar conceptes bàsics de les llibreries de dades de Python.'
      },
      es: {
        title: 'Cuestionario dinámico | Python datos',
        heroTitle: '🧠 Cuestionario dinámico',
        heroText: 'Elige las librerías que quieres repasar. Cada una incluye 5 preguntas y el cuestionario se genera según tu selección.',
        heroButtons: ['Volver al inicio'],
        selectorTitle: 'Selecciona las librerías',
        selectorText: 'Marca una o varias opciones y prepárate para responder. El sistema mezclará las preguntas y calculará tu puntuación.',
        start: 'Empezar el cuestionario',
        progress: 'Progreso',
        submit: 'Enviar respuestas',
        restart: 'Reiniciar',
        footer: 'Cuestionario creado para reforzar conceptos básicos de las librerías de datos de Python.'
      },
      en: {
        title: 'Dynamic Quiz | Python data',
        heroTitle: '🧠 Dynamic Quiz',
        heroText: 'Choose the libraries you want to review. Each one includes 5 questions and the quiz is generated from your selection.',
        heroButtons: ['Back to home'],
        selectorTitle: 'Select the libraries',
        selectorText: 'Select one or more options and get ready to answer. The system will shuffle the questions and calculate your score.',
        start: 'Start quiz',
        progress: 'Progress',
        submit: 'Submit answers',
        restart: 'Restart',
        footer: 'Quiz created to reinforce basic concepts from Python data libraries.'
      }
    },
    'recursos.html': {
      ca: {
        title: 'Recursos | Python dades',
        heroTitle: '🎬 Recursos',
        heroText: 'Consulta vídeos explicatius i materials addicionals per aprofundir en el tractament de dades amb Python.',
        heroButtons: ['Tornar a l’inici'],
        summaryTitle: 'Recursos del curs',
        summaryText: 'Aquí tens diversos recursos audiovisuals i materials complementaris que donen suport al tema de Python i l’anàlisi de dades. Cadascun pot servir per repassar conceptes o veure exemples pràctics.',
        videoTitles: [
          'Vídeo 1: Introducció a Python per a dades',
          'Vídeo 2: Visualització de dades amb Python',
          'Vídeo 3: Pandas: introducció ràpida',
          'Vídeo 4: NumPy: introducció ràpida',
          'Vídeo 5: Matplotlib: introducció ràpida',
          'Vídeo 6: Pandas: exemples pràctics',
          'Vídeo 7: NumPy: exemples visuals'
        ],
        videoTexts: [
          'Explicació general amb exemples que ajuden a entendre com començar a treballar amb dades amb Python.',
          'Recurs útil per veure com es poden preparar i mostrar dades de manera visual i entenedora.',
          'Vídeo breu per veure com començar a manipular dades amb Pandas en castellà.',
          'Explicació curta i clara per entendre els arrays i les operacions bàsiques amb NumPy.',
          'Vídeo curt per veure com crear gràfics senzills i útils amb Matplotlib.',
          'Vídeo pràctic amb exemples senzills per reforçar l’ús de Pandas.',
          'Vídeo curt amb exemples visuals per entendre millor NumPy.'
        ],
        linksTitle: '🔗 Enllaços interessants',
        footer: 'Recursos i enllaços addicionals per reforçar l’aprenentatge de Python i les dades.'
      },
      es: {
        title: 'Recursos | Python datos',
        heroTitle: '🎬 Recursos',
        heroText: 'Consulta vídeos explicativos y materiales adicionales para profundizar en el tratamiento de datos con Python.',
        heroButtons: ['Volver al inicio'],
        summaryTitle: 'Recursos del curso',
        summaryText: 'Aquí tienes diversos recursos audiovisuales y materiales complementarios que apoyan el tema de Python y el análisis de datos. Cada uno puede servir para repasar conceptos o ver ejemplos prácticos.',
        videoTitles: [
          'Vídeo 1: Introducción a Python para datos',
          'Vídeo 2: Visualización de datos con Python',
          'Vídeo 3: Pandas: introducción rápida',
          'Vídeo 4: NumPy: introducción rápida',
          'Vídeo 5: Matplotlib: introducción rápida',
          'Vídeo 6: Pandas: ejemplos prácticos',
          'Vídeo 7: NumPy: ejemplos visuales'
        ],
        videoTexts: [
          'Explicación general con ejemplos que ayudan a entender cómo empezar a trabajar con datos con Python.',
          'Recurso útil para ver cómo se pueden preparar y mostrar datos de forma visual y comprensible.',
          'Vídeo breve para ver cómo empezar a manipular datos con Pandas en castellano.',
          'Explicación corta y clara para entender los arrays y las operaciones básicas con NumPy.',
          'Vídeo corto para ver cómo crear gráficos sencillos y útiles con Matplotlib.',
          'Vídeo práctico con ejemplos sencillos para reforzar el uso de Pandas.',
          'Vídeo corto con ejemplos visuales para entender mejor NumPy.'
        ],
        linksTitle: '🔗 Enlaces interesantes',
        footer: 'Recursos y enlaces adicionales para reforzar el aprendizaje de Python y los datos.'
      },
      en: {
        title: 'Resources | Python data',
        heroTitle: '🎬 Resources',
        heroText: 'Check explanatory videos and extra materials to go deeper into data processing with Python.',
        heroButtons: ['Back to home'],
        summaryTitle: 'Course resources',
        summaryText: 'Here you have several audiovisual resources and complementary materials that support the Python and data analysis topic. Each one can help you review concepts or see practical examples.',
        videoTitles: [
          'Video 1: Introduction to Python for data',
          'Video 2: Data visualization with Python',
          'Video 3: Pandas: quick introduction',
          'Video 4: NumPy: quick introduction',
          'Video 5: Matplotlib: quick introduction',
          'Video 6: Pandas: practical examples',
          'Video 7: NumPy: visual examples'
        ],
        videoTexts: [
          'General explanation with examples that help you understand how to start working with data in Python.',
          'Useful resource to see how data can be prepared and shown in a visual, understandable way.',
          'Short video showing how to start manipulating data with Pandas in Spanish.',
          'Short and clear explanation to understand arrays and basic NumPy operations.',
          'Short video showing how to create simple and useful charts with Matplotlib.',
          'Practical video with simple examples to reinforce the use of Pandas.',
          'Short video with visual examples to understand NumPy better.'
        ],
        linksTitle: '🔗 Interesting links',
        footer: 'Additional resources and links to reinforce learning about Python and data.'
      }
    }
  };

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function getLanguage() {
    const saved = localStorage.getItem('siteLanguage');
    return Object.prototype.hasOwnProperty.call(LANGUAGES, saved) ? saved : defaultLang;
  }

  function setLanguage(lang) {
    if (!Object.prototype.hasOwnProperty.call(LANGUAGES, lang)) return;
    localStorage.setItem('siteLanguage', lang);
    applyTranslations();
    updateDateTimePanel();
    window.dispatchEvent(new CustomEvent('appLanguageChange', { detail: { lang } }));
  }

  function isSwitcherHidden() {
    return localStorage.getItem('languageSwitcherHidden') === 'true';
  }

  function setSwitcherHidden(hidden) {
    localStorage.setItem('languageSwitcherHidden', String(hidden));
    updateSwitcher(getLanguage());
  }

  function isDateTimeHidden() {
    return localStorage.getItem('dateTimePanelHidden') === 'true';
  }

  function setDateTimeHidden(hidden) {
    localStorage.setItem('dateTimePanelHidden', String(hidden));
    updateDateTimePanel();
  }

  function getTheme() {
    const saved = localStorage.getItem('siteTheme');
    return saved === 'dark' ? 'dark' : 'light';
  }

  function applyTheme() {
    document.documentElement.dataset.theme = getTheme();
  }

  function setTheme(theme) {
    localStorage.setItem('siteTheme', theme === 'dark' ? 'dark' : 'light');
    applyTheme();
    updateSwitcher(getLanguage());
  }

  function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function formatCurrentDateTime() {
    const lang = getLanguage();
    const now = new Date();
    const locale = locales[lang] || locales[defaultLang];
    return {
      date: new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(now),
      time: new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now)
    };
  }

  function ensureDateTimePanel() {
    if (document.querySelector('.date-time-panel')) return;

    const panel = document.createElement('aside');
    panel.className = 'date-time-panel';
    panel.setAttribute('aria-live', 'polite');

    const content = document.createElement('div');
    content.className = 'date-time-content';

    const date = document.createElement('span');
    date.className = 'date-time-date';

    const time = document.createElement('strong');
    time.className = 'date-time-clock';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'date-time-toggle';
    toggle.addEventListener('click', () => setDateTimeHidden(!isDateTimeHidden()));

    content.append(date, time);
    panel.append(content, toggle);
    document.body.prepend(panel);
  }

  function updateDateTimePanel() {
    const panel = document.querySelector('.date-time-panel');
    if (!panel) return;

    const lang = getLanguage();
    const hidden = isDateTimeHidden();
    const formatted = formatCurrentDateTime();
    const date = panel.querySelector('.date-time-date');
    const time = panel.querySelector('.date-time-clock');
    const toggle = panel.querySelector('.date-time-toggle');

    panel.classList.toggle('is-collapsed', hidden);
    panel.setAttribute('aria-label', ui[lang].dateTimeLabel);

    if (date) {
      date.textContent = formatted.date;
    }

    if (time) {
      time.textContent = formatted.time;
      time.setAttribute('datetime', new Date().toISOString());
    }

    if (toggle) {
      toggle.textContent = hidden ? '◷' : '×';
      toggle.title = hidden ? ui[lang].showDateTime : ui[lang].hideDateTime;
      toggle.setAttribute('aria-label', hidden ? ui[lang].showDateTime : ui[lang].hideDateTime);
      toggle.setAttribute('aria-expanded', String(!hidden));
    }
  }

  function startClock() {
    updateDateTimePanel();
    if (clockTimer) return;
    clockTimer = window.setInterval(updateDateTimePanel, 1000);
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element && typeof text === 'string') {
      element.textContent = text;
    }
  }

  function setList(selector, values) {
    if (!Array.isArray(values)) return;
    document.querySelectorAll(selector).forEach((element, index) => {
      if (typeof values[index] === 'string') {
        element.textContent = values[index];
      }
    });
  }

  function ensureSwitcher() {
    if (document.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', ui[getLanguage()].langLabel);

    Object.entries(LANGUAGES).forEach(([code, language]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'language-option';
      button.dataset.lang = code;
      button.setAttribute('aria-label', language.label);
      button.title = language.label;

      const flag = document.createElement('span');
      flag.className = 'language-flag';
      flag.setAttribute('aria-hidden', 'true');

      const short = document.createElement('span');
      short.className = 'language-short';
      short.textContent = language.short;

      button.append(flag, short);
      button.addEventListener('click', () => setLanguage(code));
      switcher.appendChild(button);
    });

    const themeToggle = document.createElement('button');
    themeToggle.type = 'button';
    themeToggle.className = 'theme-toggle';
    themeToggle.addEventListener('click', toggleTheme);
    switcher.appendChild(themeToggle);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'language-toggle';
    toggle.addEventListener('click', () => setSwitcherHidden(!isSwitcherHidden()));
    switcher.appendChild(toggle);

    document.body.prepend(switcher);
  }

  function updateSwitcher(lang) {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;
    const hidden = isSwitcherHidden();
    const dark = getTheme() === 'dark';

    switcher.setAttribute('aria-label', ui[lang].langLabel);
    switcher.classList.toggle('is-collapsed', hidden);

    switcher.querySelectorAll('.language-option').forEach(button => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const themeToggle = switcher.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = dark ? '☾' : '☀';
      themeToggle.title = dark ? ui[lang].useLightMode : ui[lang].useDarkMode;
      themeToggle.setAttribute('aria-label', dark ? ui[lang].useLightMode : ui[lang].useDarkMode);
      themeToggle.setAttribute('aria-pressed', String(dark));
    }

    const toggle = switcher.querySelector('.language-toggle');
    if (toggle) {
      toggle.textContent = hidden ? '≡' : '×';
      toggle.title = hidden ? ui[lang].showLanguages : ui[lang].hideLanguages;
      toggle.setAttribute('aria-label', hidden ? ui[lang].showLanguages : ui[lang].hideLanguages);
      toggle.setAttribute('aria-expanded', String(!hidden));
    }
  }

  function applyCommon(pageData) {
    document.title = pageData.title;
    setText('.hero h1', pageData.heroTitle);
    setText('.hero p', pageData.heroText);
    setList('.hero-buttons .button', pageData.heroButtons);
    setList('.nav-bar .nav-link', pageData.nav);
    setText('.footer p', pageData.footer);
  }

  function applyContentPage(pageData) {
    applyCommon(pageData);
    setList('main h2', pageData.headings);
    setList('main h3', pageData.subheadings);
    setList('main p', pageData.paragraphs);
    setList('main li', pageData.items);

    const image = document.querySelector('.visual-demo img');
    if (image && pageData.imageAlt) {
      image.alt = pageData.imageAlt;
    }
  }

  function applyIndex(pageData) {
    applyCommon(pageData);
    setText('#resum h2', pageData.summaryTitle);
    setText('#resum p', pageData.summaryText);
    setList('.cards .card h3', pageData.cardTitles);
    setList('.cards .card p', pageData.cardTexts);
    setList('.cards .card .button', [pageData.moreInfo, pageData.moreInfo, pageData.moreInfo]);
    document.querySelectorAll('.extra').forEach((section, index) => {
      const data = pageData.extras[index];
      if (!data) return;
      const [title, text, button] = data;
      const heading = section.querySelector('h2');
      const paragraph = section.querySelector('p');
      const link = section.querySelector('.button');
      if (heading) heading.textContent = title;
      if (paragraph) paragraph.textContent = text;
      if (link) link.textContent = button;
    });
  }

  function applyQuiz(pageData) {
    applyCommon(pageData);
    setText('.quiz-selector h2', pageData.selectorTitle);
    setText('.quiz-selector > p', pageData.selectorText);
    setText('#startQuizBtn', pageData.start);
    setText('.quiz-label', pageData.progress);
    setText('#submitQuizBtn', pageData.submit);
    setText('#restartQuizBtn', pageData.restart);
  }

  function applyResources(pageData) {
    applyCommon(pageData);
    setText('.summary h2', pageData.summaryTitle);
    setText('.summary p', pageData.summaryText);
    setList('.video-card h3', pageData.videoTitles);
    setList('.video-card > p', pageData.videoTexts);
    setText('.extra h2', pageData.linksTitle);
  }

  function applyTranslations() {
    const lang = getLanguage();
    const page = currentPage();
    const pageData = pages[page]?.[lang];
    if (!pageData) return;

    document.documentElement.lang = lang === 'ca' ? 'ca' : lang;
    updateSwitcher(lang);

    if (page === 'index.html') {
      applyIndex(pageData);
      return;
    }

    if (page === 'questionari.html') {
      applyQuiz(pageData);
      return;
    }

    if (page === 'recursos.html') {
      applyResources(pageData);
      return;
    }

    applyContentPage(pageData);
  }

  function getQuizQuestions() {
    return JSON.parse(JSON.stringify(quizQuestions[getLanguage()] || quizQuestions[defaultLang]));
  }

  function t(key, ...args) {
    const value = ui[getLanguage()][key];
    return typeof value === 'function' ? value(...args) : value;
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    ensureDateTimePanel();
    ensureSwitcher();
    applyTranslations();
    startClock();
  });

  return {
    getLanguage,
    getQuizQuestions,
    setLanguage,
    setTheme,
    t
  };
})();

AppI18n.setTheme(localStorage.getItem('siteTheme') === 'dark' ? 'dark' : 'light');
window.AppI18n = AppI18n;
