# Snke

> [Snke](https://snke.now.sh) is a simple snake game using **ReactJS**, **p5** and **Firebase**.

> The game runs a p5 instance inside a React app and uses Firebase anonymous login to save users game sessions in Firestore so we can get the best scores to create a ranking.

---

## Folder structure

```bash
.
├── README.md
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── Game
│   │   │   └── index.tsx
│   │   └── Navbar
│   │       ├── index.js
│   │       └── styles.js
│   ├── context
│   │   └── AuthContext.tsx
│   ├── game
│   │   ├── Food.ts
│   │   ├── Game.ts
│   │   └── Snake.ts
│   ├── index.tsx
│   ├── pages
│   │   ├── Home
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── Login
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   └── Ranking
│   │       ├── index.js
│   │       └── styles.js
│   ├── react-app-env.d.ts
│   ├── routes
│   │   └── index.tsx
│   ├── styles
│   │   └── global.ts
│   └── utils
│       └── onTouch.ts
├── tsconfig.json
└── yarn.lock
```

---

## Tecnologies & Tools

- [typescript](https://www.typescriptlang.org/)
- [reactjs](https://reactjs.org/)
- [p5.js](https://p5js.org/)
- [react-router-dom](https://github.com/ReactTraining/react-router#readme)
- [firebase](https://firebase.google.com/)

---

## Examples

- web
- web mobile

---

## To-do

- [x] add react-router-dom
- [x] create pages  
  - [x] login  
  - [x] ranking  
  - [x] game
- [x] add anonymous login with firebase
- [x] store player data
- [x] get ranking from database
- [x] change fruit color when eaten
- [ ] add examples to README

---

## Acknowledgments

Application developed inspired by The Coding Train.

- [Coding Challenge #3: The Snake Game video](https://youtu.be/AaGK-fj-BAM)
- [Repository of his version](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_003_Snake_game/P5)
- [The Coding Train YouTube Channel](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)
