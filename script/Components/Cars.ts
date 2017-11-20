namespace Game {

    export class Cars extends PIXI.Container {


        public carHeight: number;
        public carSpeed: number = -1;
        private cars: PIXI.Sprite;
        private carsWind: PIXI.Sprite;
        private carsFire: PIXI.Sprite;
        private carDistance: number = 980;
        public toWin: boolean = false;
        public isFinished: boolean = false;
        public currDistance: number = 0;
        public standingX: number = 0;
        public toFinish: boolean = false;
        public carNum: number;
        constructor() {
            super();
        }

        public initialize(currCar: number, winOrder: number) {
            this.carNum = currCar + 1;
            this.cars = PIXI.Sprite.fromFrame("cars_" + (currCar + 1) + ".png");
            this.carsWind = PIXI.Sprite.fromFrame("cars_wind.png");
            this.carsFire = PIXI.Sprite.fromFrame("cars_fire.png");
            this.carsFire.y = this.cars.height / 2;
            this.carsFire.x = this.cars.width - 15;
            this.carsWind.y = 0 - (this.cars.height / 2);
            this.addChild(this.cars, this.carsWind, this.carsFire);
            this.carsWind.visible = this.carsFire.visible = false;
            this.carHeight = this.cars.height;
            if (currCar >= 7)
                this.carsWind.y = this.carsWind.y + 10
            this.interactive = true;
            this.buttonMode = true;
            this.standingX = 50 + (winOrder * 200);
            //this.standingX will be the x-coordinate where the car should stop
            //according to the winning order

            //trying out buttons
            /*this.on('pointerover', this.carHover);
            this.on('pointerout', this.carHoverOut);
            this.on('pointerdown', this.carClick);*/

        }

        /*private carHover() {
            this.cars.tint = 0x555555
        }
        private carHoverOut() {
            this.cars.tint = 16777215;
        }
        private carClick() {
            this.carSpeed = -5
        }*/

        public update(countMove: number) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            //randomize +1 or -1 for car speed.
            // -1 = car moves forward
            // +1 = car moves backward
            switch (countMove) {//4 cycles of change of speed for cars
                case 30:
                    this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 8) + 1))
                    break;
                case 70:
                    this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 5) + 1))
                    break;
                case 150://just to make sure that the car is headed towards 'this.standingX'
                    if (this.carDistance < this.standingX)
                    this.carSpeed = (Math.floor((Math.random() * 5) + 1))
                    else
                    this.carSpeed = ((-1) * Math.floor((Math.random() * 5) + 1))
                    break;
                case 220://rush the cars towards the 'this.standingX'
                    if (this.carDistance < this.standingX)
                        this.carSpeed = 9;
                    else
                        this.carSpeed = -8;
                    break;

            }
            //car stops if the car's position is at the stop point 'standingX'
            if (this.carDistance >= this.standingX && this.carDistance <= this.standingX + 9)
                this.carSpeed = 0;
            //if all cars are in position, all cars move forward
            if (this.toFinish == true)
                this.carSpeed = -7;

            if (this.carSpeed < -3)
                this.carsWind.visible = this.carsFire.visible = true;
            else
                this.carsWind.visible = this.carsFire.visible = false;

            this.carDistance = this.carDistance + this.carSpeed


        }
    }
}