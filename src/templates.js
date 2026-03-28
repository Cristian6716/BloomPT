const defaultRows = (n = 6) =>
  Array.from({ length: n }, (_, i) => ({
    id: crypto.randomUUID(),
    esercizio: '',
    serie: '',
    reps: '',
    dettagli: '',
  }));

export const TEMPLATES = [
  {
    id: 'blank',
    label: 'Vuoto',
    tables: [{ title: 'Scheda', rows: defaultRows(6) }],
  },
  {
    id: 'full_body',
    label: 'Full Body',
    tables: [
      {
        title: 'Full Body',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '4', reps: '8-10', dettagli: 'Pausa 90s' },
          { id: crypto.randomUUID(), esercizio: 'Panca Piana', serie: '4', reps: '8-10', dettagli: 'Pausa 90s' },
          { id: crypto.randomUUID(), esercizio: 'Stacco Rumeno', serie: '3', reps: '10-12', dettagli: 'Pausa 90s' },
          { id: crypto.randomUUID(), esercizio: 'Trazioni / Lat Machine', serie: '4', reps: '8-10', dettagli: 'Presa prona' },
          { id: crypto.randomUUID(), esercizio: 'Military Press', serie: '3', reps: '10-12', dettagli: 'Bilanciere o manubri' },
          { id: crypto.randomUUID(), esercizio: 'Plank', serie: '3', reps: '30-45 sec', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'upper_lower',
    label: 'Upper / Lower',
    tables: [
      {
        title: 'Upper A',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Panca Piana', serie: '4', reps: '6-8', dettagli: 'Pausa 2 min' },
          { id: crypto.randomUUID(), esercizio: 'Rematore Bilanciere', serie: '4', reps: '6-8', dettagli: 'Pausa 2 min' },
          { id: crypto.randomUUID(), esercizio: 'Military Press', serie: '3', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Lat Machine', serie: '3', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Bilanciere', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'French Press', serie: '3', reps: '10-12', dettagli: '' },
        ],
      },
      {
        title: 'Lower A',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '4', reps: '6-8', dettagli: 'Pausa 2 min' },
          { id: crypto.randomUUID(), esercizio: 'Leg Press', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Stacco Rumeno', serie: '3', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Curl', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Calf Raises', serie: '4', reps: '15-20', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Addominali', serie: '3', reps: '15', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'ppl',
    label: 'Push / Pull / Legs',
    tables: [
      {
        title: 'Push',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Panca Piana', serie: '4', reps: '6-8', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Panca Inclinata Manubri', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Military Press', serie: '3', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Alzate Laterali', serie: '4', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Tricep Pushdown', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Overhead Tricep Extension', serie: '3', reps: '12-15', dettagli: '' },
        ],
      },
      {
        title: 'Pull',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Stacco', serie: '4', reps: '4-6', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: 'Trazioni', serie: '4', reps: 'Max', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Rematore Bilanciere', serie: '3', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Lat Machine Presa Stretta', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Bilanciere', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Martello', serie: '3', reps: '12-15', dettagli: '' },
        ],
      },
      {
        title: 'Legs',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '4', reps: '6-8', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Press', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Affondi Cammino', serie: '3', reps: '12 per gamba', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Curl', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Extension', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Calf Raises', serie: '4', reps: '15-20', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'forza',
    label: 'Forza (5x5)',
    tables: [
      {
        title: 'Giorno A – Forza',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '5', reps: '5', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: 'Panca Piana', serie: '5', reps: '5', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: 'Rematore Bilanciere', serie: '5', reps: '5', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
      {
        title: 'Giorno B – Forza',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '5', reps: '5', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: 'Military Press', serie: '5', reps: '5', dettagli: 'Pausa 3 min' },
          { id: crypto.randomUUID(), esercizio: 'Stacco', serie: '1', reps: '5', dettagli: 'Pausa 5 min' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'ipertrofia',
    label: 'Ipertrofia 4 giorni',
    tables: [
      {
        title: 'Giorno 1 – Petto & Tricipiti',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Panca Piana', serie: '4', reps: '8-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Panca Inclinata', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Croci Cavi', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Tricep Dips', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Tricep Pushdown', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
      {
        title: 'Giorno 2 – Schiena & Bicipiti',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Lat Machine', serie: '4', reps: '8-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Rematore Manubri', serie: '4', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Face Pull', serie: '3', reps: '15-20', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Bilanciere', serie: '3', reps: '10-12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Manubri', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
      {
        title: 'Giorno 3 – Gambe',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '4', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Press', serie: '4', reps: '10-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Curl', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Extension', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Affondi', serie: '3', reps: '12 per gamba', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Calf Raises', serie: '4', reps: '15-20', dettagli: '' },
        ],
      },
      {
        title: 'Giorno 4 – Spalle & Core',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Military Press', serie: '4', reps: '8-10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Alzate Laterali', serie: '4', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Alzate Frontali', serie: '3', reps: '12-15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Plank', serie: '3', reps: '45 sec', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Russian Twist', serie: '3', reps: '20', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Leg Raise', serie: '3', reps: '15', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'dimagrimento',
    label: 'Dimagrimento / Circuito',
    tables: [
      {
        title: 'Circuito A',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat Corpo Libero', serie: '4', reps: '15', dettagli: 'Riposo 30s tra esercizi' },
          { id: crypto.randomUUID(), esercizio: 'Flessioni', serie: '4', reps: '12', dettagli: 'Riposo 30s tra esercizi' },
          { id: crypto.randomUUID(), esercizio: 'Affondi Alternati', serie: '4', reps: '12 per gamba', dettagli: 'Riposo 30s tra esercizi' },
          { id: crypto.randomUUID(), esercizio: 'Mountain Climbers', serie: '4', reps: '30 sec', dettagli: 'Riposo 30s tra esercizi' },
          { id: crypto.randomUUID(), esercizio: 'Burpees', serie: '4', reps: '10', dettagli: 'Riposo 30s tra esercizi' },
          { id: crypto.randomUUID(), esercizio: 'Plank', serie: '4', reps: '30 sec', dettagli: 'Riposo 90s tra giri' },
        ],
      },
    ],
  },
  {
    id: 'principiante',
    label: 'Principiante 3 giorni',
    tables: [
      {
        title: 'Giorno 1',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Squat', serie: '3', reps: '10', dettagli: 'Corpo libero o goblet' },
          { id: crypto.randomUUID(), esercizio: 'Panca Piana / Flessioni', serie: '3', reps: '10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Lat Machine', serie: '3', reps: '10', dettagli: 'Presa larga' },
          { id: crypto.randomUUID(), esercizio: 'Plank', serie: '3', reps: '20 sec', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
      {
        title: 'Giorno 2',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Stacco Rumeno', serie: '3', reps: '10', dettagli: 'Manubri leggeri' },
          { id: crypto.randomUUID(), esercizio: 'Military Press Manubri', serie: '3', reps: '10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Rematore Manubrio', serie: '3', reps: '10', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Crunch', serie: '3', reps: '15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
      {
        title: 'Giorno 3',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Leg Press', serie: '3', reps: '12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Panca Inclinata Manubri', serie: '3', reps: '12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Curl Manubri', serie: '3', reps: '12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Tricep Pushdown', serie: '3', reps: '12', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Calf Raises', serie: '3', reps: '15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'cardio',
    label: 'Cardio + Tonificazione',
    tables: [
      {
        title: 'Sessione Cardio + Tono',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Riscaldamento (tapis roulant)', serie: '1', reps: '10 min', dettagli: 'Passo veloce' },
          { id: crypto.randomUUID(), esercizio: 'Interval Running', serie: '8', reps: '1 min corsa / 1 min cammino', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Squat Manubri', serie: '3', reps: '15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Affondi', serie: '3', reps: '12 per gamba', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Hip Thrust', serie: '3', reps: '15', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Defaticamento + Stretching', serie: '1', reps: '10 min', dettagli: '' },
        ],
      },
    ],
  },
  {
    id: 'core',
    label: 'Core & Mobilità',
    tables: [
      {
        title: 'Core & Mobilità',
        rows: [
          { id: crypto.randomUUID(), esercizio: 'Plank', serie: '3', reps: '45 sec', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Side Plank', serie: '3', reps: '30 sec per lato', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Dead Bug', serie: '3', reps: '10 per lato', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Bird Dog', serie: '3', reps: '10 per lato', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Hollow Body Hold', serie: '3', reps: '20 sec', dettagli: '' },
          { id: crypto.randomUUID(), esercizio: 'Cat-Cow + Hip 90/90', serie: '2', reps: '10 ripetizioni', dettagli: 'Mobilità' },
        ],
      },
    ],
  },
];
