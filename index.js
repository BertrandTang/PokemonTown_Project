const canvas = document.querySelector("canvas"); // On récupère le canvas
const context = canvas.getContext("2d"); // On crée le contexte (ici 2d), ceci crée un objet pleins de propriétés (voir console.log)
console.log(context);
const mapWidth = 280;
// On redimensionne le canvas
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];

for (let index = 0; index < collisions.length; index += mapWidth) {
  // index+=140 (taille de la largeur de la map) on veut créer des arrays de la taille de la largeur
  collisionsMap.push(collisions.slice(index, mapWidth + index)); // On slice (coupe) les arrays en 140
}

const limits = [];
const offset = {
  x: -1728,
  y: -800,
};
collisionsMap.forEach((row, rowIndex) => {
  row.forEach((cell, j) => {
    if (cell === 225)
      limits.push(
        new Limit({
          position: {
            x: j * Limit.width + offset.x,
            y: rowIndex * Limit.height + offset.y,
          },
        })
      );
  });
});

console.log(limits);

const image = new Image(); // On crée une constante qui hérite des propriétés de Image();
image.src = "/img/PokemonTown.png"; // On indique la source l'image qu'on veut dessiner

const foregroundImage = new Image(); // On crée une constante qui hérite des propriétés de Image();
foregroundImage.src = "/img/foregroundObjects.png"; // On indique la source l'image qu'on veut dessiner

const playerImage = new Image(); // On crée une constante qui hérite des propriétés de Image();
playerImage.src = "/img/trainer_POKEMONTRAINER_Brendan.png"; // On indique la source l'image qu'on veut dessiner

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 12,
    y: canvas.height / 2 - 128 / 16,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});


const background = new Background({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Background({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  z: { pressed: false },
  q: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};

let movables = [background, ...limits, foreground];
const rectangularCollision = ({ rectangle1, rectangle2 }) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
};
const animate = () => {
  // On crée une fonction qui va animer le canvas
  window.requestAnimationFrame(animate); // On demande à animer le canvas
  background.draw();

  limits.forEach((limit) => {
    limit.draw();
  });

  player.draw();
  foreground.draw();
  let moving = true;
  player.moving = false;

  if (keys.s.pressed && lastKey === "s") {
    player.moving = true
    player.side = 0;
    for (let index = 0; index < limits.length; index++) {
      const limit = limits[index];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...limit,
            position: {
              x: limit.position.x,
              y: limit.position.y - 3,
            },
          },
        })
      ) {
        console.log("collision");
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    }
  } else if (keys.z.pressed && lastKey === "z") {
    player.moving = true
    player.side = 144;
    for (let index = 0; index < limits.length; index++) {
      const limit = limits[index];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...limit,
            position: {
              x: limit.position.x,
              y: limit.position.y + 3,
            },
          },
        })
      ) {
        console.log("collision");
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    }
  } else if (keys.d.pressed && lastKey === "d") {
    player.moving = true
    player.side = 96;
    for (let index = 0; index < limits.length; index++) {
      const limit = limits[index];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...limit,
            position: {
              x: limit.position.x - 3,
              y: limit.position.y,
            },
          },
        })
      ) {
        console.log("collision");
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
  } else if (keys.q.pressed && lastKey === "q") {
    player.moving = true
    player.side = 48;
    for (let index = 0; index < limits.length; index++) {
      const limit = limits[index];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...limit,
            position: {
              x: limit.position.x + 3,
              y: limit.position.y,
            },
          },
        })
      ) {
        console.log("collision");
        moving = false;
        break;
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    }
  }
};

animate(); // On appelle la fonction animate

let lastKey = "";
window.addEventListener("keydown", (event) => {
  // On écoute les évènements claviers
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "q":
      keys.q.pressed = true;
      lastKey = "q";
      break;
    case "z":
      keys.z.pressed = true;
      lastKey = "z";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
  }
});

window.addEventListener("keyup", (event) => {
  // On écoute les évènements clavier
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "q":
      keys.q.pressed = false;
      break;
    case "z":
      keys.z.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }
});
