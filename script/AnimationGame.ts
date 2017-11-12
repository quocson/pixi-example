namespace Game {

    export class AnimationGame extends PIXI.Container {

        private roadback;
        private roadAnim;
        private carsAnim;
        private carTimer:number = 0;
        private carSpeed:number = 2;
        private randNum = 3;
        private carFinish:number = 0;

        private cars = [];
        private carSmoke = [];
        private carWind = [];
        private carsSpeed = [];

        constructor() {
            super();
            this.initElements();        
        }

        private initElements() {
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
                this.carSmoke[i] = PIXI.Sprite.fromFrame("cars_fire.png");
                this.carWind[i] = PIXI.Sprite.fromFrame("cars_wind.png");
                this.addChild(this.cars[i], this.carSmoke[i], this.carWind[i]);
                this.carsSpeed.push(1);

                if (i == 1) {
                    this.cars[1].y = 15;
                } else {
                    this.cars[i].y = this.cars[i - 1].y + this.cars[i].height - 11;
                }
                
                this.cars[i].x = 1600;
                this.cars[i].scale.set(0.6, 0.6);

                this.carSmoke[i].x = 1588 + this.cars[i].width;
                this.carSmoke[i].y = this.cars[i].y + this.cars[i].height / 3;
                this.carSmoke[i].visible = false;

                this.carWind[i].x = 1588 + this.cars[i].x;
                this.carWind[i].y = this.cars[i].y + this.cars[i].height / 2 - 40;
                this.carWind[i].visible = false;
            }
            this.animCars();
        }

        private animCars(){
            this.carsAnim = setInterval(() => {                
                for (let j = 1; j < 11; j++) {

                    if (this.carTimer == 90) {
                        if (this.carsSpeed[j - 1] != 0)
                            this.carsSpeed[j - 1] = Math.floor(Math.random() * (5) + 1);

                        if (this.carsSpeed[j - 1] >= 4) {
                            this.carSmoke[j].visible = true;
                            this.carWind[j].visible = true;
                        }
                    }
    
                    if (this.carTimer == 150) {
                        if(this.carsSpeed[j - 1] != 0)
                            this.carsSpeed[j - 1] = 2;

                        this.carSmoke[j].visible = false;
                        this.carWind[j].visible = false;
                    }

                   this.cars[j].x -= this.carsSpeed[j-1];
                   this.carSmoke[j].x = this.cars[j].x - 15 + this.cars[j].width;
                   this.carWind[j].x = this.cars[j].x - 15;

                    if (this.cars[j].x < -600) {
                        this.carsSpeed[j - 1] = 0;
                        this.cars[j].x = 1600
                        this.carFinish++;

                        if(this.carFinish == 10){
                            clearInterval(this.roadAnim);
                            clearInterval(this.carsAnim);
                        }
                    }
                }
                if (this.carTimer == 150) 
                     this.carTimer = 0;

                this.carTimer++;
            }, 10);
        }
    }
}