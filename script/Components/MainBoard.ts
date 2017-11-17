namespace Game {

    export class MainBoard extends PIXI.Container {
        private roadBGTexture: PIXI.Texture;
        private carsArr: Array<Cars> = [];
        private carsArrResult: Array<number> = [7, 2, 3, 4, 10, 6, 1, 8, 9, 5];
        private carsCurrDistance: Array<number> = [];
        private countMove: number = 0;
        private masker: PIXI.Graphics;
        private standings: Standings;
        private carsCountFinish: number = 0;
        private tilingSprite: PIXI.extras.TilingSprite;
        constructor() {
            super();
            this.initialize();
        }

        private initialize() {

            this.masker = new PIXI.Graphics();
            this.masker.beginFill(0x191919)
            this.masker.drawRect(0, 0, 1200, 900);
            this.masker.x = 0
            this.masker.y = 0

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
                this.carsCurrDistance.push(cars.x);
            }
            this.standings = new Standings();
            this.carsArr[this.carsArrResult[0] - 1].toWin = true;
            this.addChild(this.masker, this.standings);
            this.mask = this.masker;
        }

        public update() {

            for (let carCount = 0; carCount <= 10; carCount++) {
                if(carCount < 10)
                this.moveCar(carCount);
                else
                this.standings.update(this.carsCurrDistance);
            }
                this.tilingSprite.tilePosition.x += 20;

            

        }

        private moveCar(carNum) {
            let carCount: number = 0;
            this.carsArr[carNum].update(this.countMove);
            if (carNum == Math.floor((Math.random() * 9))) {
                if (this.countMove == 90)
                    this.countMove = 0;
                this.countMove++;
            }
            if (this.carsArr[carNum].x + this.carsArr[carNum].carSpeed >= 1200)
                this.carsArr[carNum].carSpeed = -1;
            else
                if (this.carsArr[carNum].x + this.carsArr[carNum].carSpeed <= 0 && this.carsCountFinish < 10) {
                    this.carsCountFinish++;
                    this.carsArr[carNum].x = 980;
                    this.carsArr[carNum].currDistance = 10 - this.carsCountFinish;
                    this.carsArr[carNum].isFinished = true;
                    if (this.carsCountFinish < 10)
                        this.carsArr[this.carsArrResult[this.carsCountFinish] - 1].toWin = true;

                }
                else {
                    this.carsArr[carNum].x = this.carsArr[carNum].x + this.carsArr[carNum].carSpeed;

                }
                if(this.carsArr[carNum].carSpeed == 0)
                this.carsCurrDistance[carNum] = -1 * (this.carsArr[carNum].currDistance);
                else
                this.carsCurrDistance[carNum] = this.carsArr[carNum].x;
            
        }
    }
}