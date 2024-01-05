class Sprite {
  constructor({ position, image, frames = { max: 1 }, side }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.side = 0;
    this.image.onload = () => {
      this.width = this.image.width / 4 - 1;
      this.height = this.image.height / 4 - 1;
      console.log(this.width, this.height);
    };
    this.moving = false;
  }
  draw() {
    context.drawImage(
      this.image,
      //Le crop du sprite pour avoir le bon personnage
      this.frames.val * 32,
      this.side,
      this.image.width / this.frames.max,
      this.image.height / 4,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height / 4
    );
    if (!this.moving) return;

    if (this.frames.max > 1) { 
      this.frames.elapsed++;
    }

    if (this.frames.elapsed %5 === 0) {
      if (this.frames.val < this.frames.max - 1) { 
        this.frames.val++; 
      } else this.frames.val = 0;
    }
  }
}

class Background {
  constructor({ position, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      console.log(this.width, this.height);
    };
  }
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Limit {
  static width = 16; // On crée une propriété static pour pouvoir l'appeler sans instancier la classe
  static height = 16;
  constructor({ position }) {
    this.position = position;
    this.width = 16;
    this.height = 16;
  }
  draw() {
    context.fillStyle = "rgba(255, 0, 0, 0) ";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
