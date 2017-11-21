namespace Game {

    export class MainBoard extends PIXI.Container {
        private roadBGTexture: PIXI.Texture;
        private carsArr: Array<Cars> = [];
        private carsArrResult: Array<number> = [3, 2, 7, 4, 10, 6, 1, 8, 9, 5];
        private carsCurrDistance: Array<number> = [];
        private countMove: number = 0;
        private masker: PIXI.Graphics;
        private standings: Standings;
        private carsCountFinish: number = 0;
        private carsCountStopped: number = 0;
        private allCarsPositioned: boolean = false;
        private tilingSprite: PIXI.extras.TilingSprite;
        private animationDone: boolean = false;
        private carObject = [];
        constructor() {
            super();
            this.initialize();

        }

        private initialize() {
            this.carsArrResult.sort(function (a, b) { return 0.5 - Math.random() });//randomize the cars' winning order
            console.log(this.carsArrResult)
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
                cars.initialize(i, this.carsArrResult.indexOf(i + 1));
                cars.x = 980
                if (i == 0)
                    cars.y = 300
                else {
                    cars.y = this.carsArr[i - 1].y + cars.carHeight
                }
                this.addChild(cars);
                this.carsArr.push(cars);
                this.carsCurrDistance.push(cars.x);
                this.carObject[i] = { xCoord: cars.x, carNumber: i }
            }
            this.standings = new Standings();
            this.standings.y = 150
            this.carsArr[this.carsArrResult[0] - 1].toWin = true;
            this.addChild(this.masker, this.standings);
            this.mask = this.masker;
        }

        public update() {
            if (this.animationDone)//no need to proceed to since all cars already finished
                return
            this.carsCountStopped = 0;
            this.carsCountFinish = 0;

            for (let carCount = 0; carCount <= 9; carCount++) {
                this.moveCar(carCount);
                if (this.carsArr[carCount].x < -250 && this.carsCountFinish < 10) {
                    this.carsCountFinish++;
                    if (this.carsCountFinish == 10)//set this.animationDone to true if all cars crossed the line
                        this.animationDone = true;
                }
                if (this.allCarsPositioned == false) {//keeps checking if all cars are in position
                    if (this.carsCountStopped == 9) {
                        this.allCarsPositioned = true;
                    }
                    if (this.carsArr[carCount].carSpeed == 0)
                        this.carsCountStopped++;
                } else
                    this.carsArr[carCount].toFinish = true;
            }
            //this.standings.update(this.carsCurrDistance);//pass the array of cars' 'x-coordinate' to update the standings
            //pass the array of cars' 'x-coordinate' to update the standings
            this.standings.update2(this.carObject);
            this.countMove++;
            this.tilingSprite.tilePosition.x += 20;
        }

        private moveCar(carNum) {
            this.carsArr[carNum].update(this.countMove);
            this.carsArr[carNum].x = this.carsArr[carNum].x + this.carsArr[carNum].carSpeed;
            this.carsCurrDistance[carNum] = this.carsArr[carNum].x;//store the car's current 'x-coordinate' inside the array
            this.carObject[carNum].xCoord = this.carsArr[carNum].x;
        }
    }
}