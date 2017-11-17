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
        constructor() {
            super();
        }

        public initialize(currCar: number) {
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

            this.on('pointerover', this.carHover);
            this.on('pointerout', this.carHoverOut);
            this.on('pointerdown', this.carClick);

        }

        private carHover() {
            this.cars.tint = 0x555555
        }
        private carHoverOut() {
            this.cars.tint = 16777215;
        }


        private carClick() {
            this.carSpeed = -5
        }

        public update(countMove: number) {
            if (this.isFinished) {
                this.carSpeed = 0;
                this.carsWind.visible = this.carsFire.visible = false;
                return
            }
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            //let plusOrMinus = -1

            switch (countMove) {
                case 50:
                    if (this.toWin)
                    plusOrMinus = -1;
                    this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 5) + 1))
                    break;
                case 90:
                    plusOrMinus = -1;
                    this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 1) + 1))
                    break;

            }
            
            //    this.carSpeed = ((-1) * Math.floor((Math.random() * 5) + 1))

            if (this.carDistance >= 15 && this.carDistance <= 50) {

                if (!this.toWin)
                    this.carSpeed = 4;
            }
           
            if (this.carSpeed < -3)
                this.carsWind.visible = this.carsFire.visible = true;
            else
                this.carsWind.visible = this.carsFire.visible = false;

            this.carDistance = this.carDistance + this.carSpeed


        }
    }
}