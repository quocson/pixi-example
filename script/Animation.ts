namespace Game {

    export class Animation extends PIXI.Container {

        private roadback; roadAnim; carsAnim;

        private betType: BetType;
        private tilingSprite: PIXI.extras.TilingSprite;

        private carTimer: number = 0;
        private carFinish: number = 0;

        private carsArray: Array<Car> = [];
        private newArray: Array<number> = [];
        private currentPos: Array<number> = [];
        private realTimeCar: Array<number> = [];

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

            this.betType = new BetType();
            this.addChild(this.betType);

            for (let i = 0; i < 10; i++) {
                let newCar: Car = new Car();
                newCar.initCars(i);

                if (i == 0) {
                    newCar.y = 15;
                } else {
                    newCar.y = this.carsArray[i - 1].y + newCar.height - 11;
                }

                newCar.x = 1650;
                newCar.scale.set(0.6, 0.6);

                this.addChild(newCar);
                this.carsArray.push(newCar);
            }
            this.animCars();
        }

        public animCars() {

            for (let j = 0; j < 10; j++) {
                this.carsArray[j].update(this.carTimer);

                this.carsArray[j].x -= this.carsArray[j].carsSpeed;

                if (!this.carsArray[j].isFinish)
                    this.carsArray[j].carFinalDistance = this.carsArray[j].x;

                if (this.carsArray[j].x <= -620) {
                    this.carsArray[j].carsSpeed = 0;
                    this.carsArray[j].x = 1600;
                    this.carsArray[j].isFinish = true;
                    this.carsArray[j].carFinalDistance = -620 - (10 - this.carFinish);
                    this.carFinish++;

                    if (this.carFinish == 10) {
                        this.carTimer = undefined;
                        this.carsArray[j].carSmoke.visible = this.carsArray[j].carWind.visible = false;
                    }
                }
                this.currentPos[j] = this.carsArray[j].carFinalDistance;
            }
            this.sortCars(this.currentPos);

            if (this.carTimer == undefined)
                return;

            this.tilingSprite.tilePosition.x += 15;

            if (this.carTimer == 150)
                this.carTimer = 0;

            this.carTimer++;
        }

        private sortCars(sortedCars: Array<number>) {
            let sortCopy: Array<number> = sortedCars.slice(); // copy
            sortedCars.sort(function (a, b) { return a - b });
            let searchIndex: number = 0;

            for (let i: number = 0; i < 10; i++) {
                searchIndex = sortCopy.indexOf(sortedCars[i]);
                sortCopy[searchIndex] = undefined;

                this.realTimeCar[i] = searchIndex + 1;
            }

            if (this.carFinish == 10) return;

            this.updateResult();
        }

        private updateResult() {
            if (this.realTimeCar.length == 10 && this.carFinish < 3)
                this.betType.sumNum = this.realTimeCar[0] + this.realTimeCar[1] + this.realTimeCar[2];

            //Top Three
            console.log('Final Result = ' + this.realTimeCar[0], this.realTimeCar[1], this.realTimeCar[2]);

            if (this.betType.sumNum >= 14)
                this.betType.bigSmall = "B";
            else
                this.betType.bigSmall = "S";

            if (this.betType.sumNum % 2 == 0)
                this.betType.oddEven = "E";
            else
                this.betType.oddEven = "O";

            this.betType.result_1_10 = this.dragonTiger(this.realTimeCar[0], this.realTimeCar[9]);
            this.betType.result_2_9 = this.dragonTiger(this.realTimeCar[1], this.realTimeCar[8]);
            this.betType.result_3_8 = this.dragonTiger(this.realTimeCar[2], this.realTimeCar[7]);
            this.betType.result_4_7 = this.dragonTiger(this.realTimeCar[3], this.realTimeCar[6]);
            this.betType.result_5_6 = this.dragonTiger(this.realTimeCar[4], this.realTimeCar[5]);

            this.betType.updateValues();
        }

        private dragonTiger(x: number, y: number) {
            if (x > y)
                return 'D';
            else
                return 'T';
        }
    }
}