namespace Game {

    export class AnimationGame extends PIXI.Container {

        private roadback;
        private roadAnim;
        private carsAnim;
        private cars = [];

        constructor() {
            super();
            this.initElements();        
        }

        private initElements() {
            //Added by Mina
            this.roadback = PIXI.Texture.fromImage('roadback');
            let tilingSprite = new PIXI.extras.TilingSprite(this.roadback, 2500, 478);
            this.addChild(tilingSprite);

            tilingSprite.x = -500;
            tilingSprite.y = 0;

            this.roadAnim = setInterval(() => {
                tilingSprite.tilePosition.x += 5;
            }, 10);

            for (let i = 1; i < 11; i++) {
                this.cars[i] = PIXI.Sprite.fromFrame("cars_" + i + ".png");
                this.addChild(this.cars[i]);
                
                if (i == 1) {
                    this.cars[1].y = 15;
                } else {
                    this.cars[i].y = this.cars[i - 1].y + this.cars[i].height - 11;
                }
                this.cars[i].x = 1600;
                this.cars[i].scale.set(0.6, 0.6);
            }
            this.animCars();
        }

        private animCars(){
            this.carsAnim = setInterval(() => {
                let randNum;
                // let randNum = 2;

                for (let j = 1; j < 11; j++) {
                    randNum = Math.floor(Math.random() * (15));
                    this.cars[j].x -= randNum;

                    if (this.cars[j].x < -900) {
                        clearInterval(this.roadAnim);
                        clearInterval(this.carsAnim);
                    }
                }
            }, 80);
        }
    }
}