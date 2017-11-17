namespace Game {

    export class AnimationGame extends PIXI.Container {

        private roadback;
        private roadAnim;
        private carsAnim;

        private carTimer: number = 0;
        private carFinish: number = 0;
        private tilingSprite: PIXI.extras.TilingSprite;

        private carsArray = [];

        constructor() {
            super();
            this.initElements();
        }

        private initElements() {
            this.roadback = PIXI.Texture.fromImage('roadback');
            this.tilingSprite = new PIXI.extras.TilingSprite(this.roadback, 2500, 478);
            this.addChild(this.tilingSprite);

            this.tilingSprite.x = -500;
            this.tilingSprite.y = 0; 

            for (let i = 0; i < 10; i++) {
                let newCar: Car = new Car();
                newCar.initCars(i);

                if (i == 0) {
                    newCar.y = 15;
                } else {
                    newCar.y = this.carsArray[i - 1].y + newCar.height - 11;
                }

                newCar.x = 1600;
                newCar.scale.set(0.6, 0.6);

                this.addChild(newCar);
                this.carsArray.push(newCar);
            }
            this.animCars();
        }

        public animCars() {
            for (let j = 0; j < 10; j++) {
                this.carsArray[j].id = j + 1;
                this.carsArray[j].update(this.carTimer);

                this.carsArray[j].x -= this.carsArray[j].carsSpeed;

                if (this.carsArray[j].x <= -600) {
                    this.carsArray[j].carsSpeed = 0;
                    this.carsArray[j].x = 1600;

                    this.carFinish++;

                    if (this.carFinish == 10) {   
                        this.carTimer = undefined;                
                        this.carsArray[j].carSmoke.visible = this.carsArray[j].carWind.visible = false;
                    }
                    console.log(this.carsArray[j].id);
                }
            }

            if (this.carTimer == undefined)
                return;

            this.tilingSprite.tilePosition.x += 15;

            if (this.carTimer == 150)
                this.carTimer = 0;

            this.carTimer++;
        }
    }
}