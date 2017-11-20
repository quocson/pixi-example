namespace Game {

    export class AnimationGame extends PIXI.Container {

        private roadback;
        private roadAnim;
        private carsAnim;

        private carTimer: number = 0;
        private carFinish: number = 0;
        private tilingSprite: PIXI.extras.TilingSprite;
        private betType: BetType;

        private carsArray = [];
        private newArray: Array<number> = [];
        private currentPos: Array<number> = [];

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

                if (this.carsArray[j].x <= -550) {
                    this.carsArray[j].carsSpeed = 0;
                    this.carsArray[j].x = 1600;

                    this.newArray.push(this.carsArray[j].id);
                    this.carFinish++;

                    if (this.carFinish == 10) {
                        this.carTimer = undefined;
                        this.carsArray[j].carSmoke.visible = this.carsArray[j].carWind.visible = false;

                        //Final Result    
                        this.betType.threeArray = this.newArray.splice(0, 3);
                        this.betType.sumNum = this.betType.threeArray.reduce(function (a, b) {
                            return a + b;
                        }, 0);

                        if (this.betType.sumNum >= 14)
                            this.betType.bigSmall = "B";
                        else
                            this.betType.bigSmall = "S";

                        if (this.betType.sumNum % 2 == 0)
                            this.betType.oddEven = "E";
                        else
                            this.betType.oddEven = "O";
                        
                        this.betType.result_1_10 = this.dragonTiger(this.newArray[0], this.newArray[9]);
                        this.betType.result_2_9 = this.dragonTiger(this.newArray[1], this.newArray[8]);  
                        this.betType.result_3_8 = this.dragonTiger(this.newArray[2], this.newArray[7]);  
                        this.betType.result_4_7 = this.dragonTiger(this.newArray[3], this.newArray[6]);  
                        this.betType.result_5_6 = this.dragonTiger(this.newArray[4], this.newArray[5]);

                        this.betType.updateValues();
                    }
                }
                this.currentPos[j] = this.carsArray[j].x;
                // console.log(this.currentPos[j]);
            }
            this.sortCars(this.currentPos);

            if (this.carTimer == undefined)
                return;

            this.tilingSprite.tilePosition.x += 15;

            if (this.carTimer == 150)
                this.carTimer = 0;

            this.carTimer++;
        }

        private dragonTiger(x:number, y:number) {
            if (x > y)
                return 'D';
            else
                return 'T';
        }

        private sortCars(sortedCars:Array<number>) {
            let sortCopy: Array<number> = sortedCars.slice();
            sortedCars.sort(function (a, b) { return a - b });
            // console.log('First: ' + sortCopy);
            // console.log('Second: ' + sortedCars);
        }
    }
}