namespace Game {

    export class MainBoard extends PIXI.Container {
        private roadBG: PIXI.Sprite;
        private roadBGTexture: PIXI.Texture;
        private carsArr: Array<Cars> = [];
        private intvl: number;
        private countMove: number = 0;
        private masker: PIXI.Graphics;
        private carsCountFinish: number = -1;
        private tilingSprite: PIXI.extras.TilingSprite;
        constructor() {
            super();
            this.initialize();
        }

        private initialize() {

            this.masker = new PIXI.Graphics();
            this.masker.beginFill(0x191919)
            this.masker.drawRect(0, 0, 1200, 600);
            this.masker.x = 0
            this.masker.y = 300

            this.roadBGTexture = PIXI.Texture.fromFrame("roadback");
            this.tilingSprite = new PIXI.extras.TilingSprite(
                this.roadBGTexture, 1200, 600);
            this.tilingSprite.y = 300
            this.tilingSprite.tileScale.y = 1.26
            this.addChild(this.tilingSprite);
            for (let i = 0; i < 10; i++) {
                let cars: Cars = new Cars();
                cars.initialize(i);
                cars.x = 980
                if (i == 0)
                    cars.y = 300
                else {
                    cars.y = this.carsArr[i - 1].y + cars.carHeight
                }
                this.addChild(cars);
                this.carsArr.push(cars);
            }
            this.addChild(this.masker);
            this.mask = this.masker;

        }

        public update() {

            if(this.countMove < 485){  
            for (let carCount = 0; carCount < 10; carCount++)
                this.moveCar(carCount)
            this.tilingSprite.tilePosition.x += 20;
            
             }
             if(this.countMove >= 485){
                console.log("CAR "+this.carsCountFinish+" WON");
                this.countMove = undefined;
             }
             
                
        }

        private moveCar(carNum) {
            let carCount: number = 0;
            this.carsArr[carNum].update(this.countMove);
            if (carNum == Math.floor((Math.random() * 9) + 1)) {
                if (this.countMove == 90)
                    this.countMove = 0;
                this.countMove++;
            }

            if (this.carsArr[carNum].x + this.carsArr[carNum].carSpeed >= 1200)
                this.carsArr[carNum].x = 1200;
            else
                if (this.carsArr[carNum].x - this.carsArr[carNum].carSpeed <= 0 && this.carsCountFinish == -1) {
                    this.countMove = 91;
                    for (let carsCount = 0; carsCount < 10; carsCount++)
                        this.carsArr[carsCount].carSpeed = (-5)
                    this.carsCountFinish = carNum + 1;
                }
                else {
                    this.carsArr[carNum].x = this.carsArr[carNum].x + this.carsArr[carNum].carSpeed;

                }
        }
    }
}