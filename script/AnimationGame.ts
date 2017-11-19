namespace Game {

    export class AnimationGame extends PIXI.Container {

        private roadback;
        private roadAnim;
        private carsAnim;

        private carTimer: number = 0;
        private carFinish: number = 0;
        private tilingSprite: PIXI.extras.TilingSprite;
        private betType: BetType;

        private newArray: Array<number> = [];
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
            
            this.betType = new BetType();
            this.addChild(this.betType);
            
            this.animCars();
        }

        public animCars() {


            for (let j = 0; j < 10; j++) {
                this.carsArray[j].id = j;
                this.carsArray[j].update(this.carTimer);

                this.carsArray[j].x -= this.carsArray[j].carsSpeed;

                if (this.carsArray[j].x <= -600) {
                    this.carsArray[j].carsSpeed = 0;
                    this.carsArray[j].x = 1600;

                    this.carFinish++;

                    if (this.carFinish == 10) {
                        this.carTimer = undefined;
                        this.carsArray[j].carSmoke.visible = this.carsArray[j].carWind.visible = false;
                                                
                        //Dragon or Tiger
                        // console.log('New array = ' + this.newArray);
                        
                        if (this.newArray[0] > this.newArray[9]) {
                            console.log(this.newArray[0] + ' ? ' + this.newArray[9]);
                            this.betType.result_1_10 = 'Dragon';
                        } else {
                            console.log(this.newArray[0] + ' ? ' + this.newArray[9]);
                            this.betType.result_1_10 = 'Tiger';
                        }
                        
                        if (this.newArray[1] > this.newArray[8]) {
                            console.log(this.newArray[1] + ' ? ' + this.newArray[8]);
                            this.betType.result_2_9 = 'Dragon';
                        } else {
                            console.log(this.newArray[1] + ' ? ' + this.newArray[8]);
                            this.betType.result_2_9 = 'Tiger';
                        }
                        
                        if (this.newArray[2] > this.newArray[7]){
                            console.log(this.newArray[2] + ' ? ' + this.newArray[7]);
                            this.betType.result_3_8 = 'Dragon';
                        } else {
                            console.log(this.newArray[2] + ' ? ' + this.newArray[7]);
                            this.betType.result_3_8 = 'Tiger';
                        }
                        
                        if (this.newArray[3] > this.newArray[6]) {
                            console.log(this.newArray[3] + ' ? ' + this.newArray[6]);                            
                            this.betType.result_4_7 = 'Dragon';
                        } else {
                            console.log(this.newArray[3] + ' ? ' + this.newArray[6]); 
                            this.betType.result_4_7 = 'Tiger';
                        }

                        if (this.newArray[4] > this.newArray[5]){
                            console.log(this.newArray[4] + ' ? ' + this.newArray[5]);
                            this.betType.result_5_6 = 'Dragon';
                        } else {
                            console.log(this.newArray[4] + ' ? ' + this.newArray[5]);
                            this.betType.result_5_6 = 'Tiger';
                        }

                        //Added
                        this.betType.threeArray = this.newArray.splice(0, 3);
                        this.betType.sumNum = this.betType.threeArray.reduce(function (a, b) {
                            return a + b;
                        }, 0);

                        //Top Three
                        console.log('Top Three = ' + this.betType.threeArray);

                        //Sum
                        console.log('Sum is = ' + this.betType.threeArray.reduce(function (a, b) {
                            return a + b;
                        }, 0));

                        //Big or Small
                        if (this.betType.sumNum >= 14) 
                            this.betType.bigSmall = "Big";
                        else
                            this.betType.bigSmall= "Small";

                        //Odd or Even
                        if (this.betType.sumNum % 2 == 0)
                            this.betType.oddEven = "Even";
                        else
                        this.betType.oddEven = "Odd";
      
                        this.betType.showStatus();
                    }
                    this.newArray.push(this.carsArray[j].id);
                    console.log(this.newArray);
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