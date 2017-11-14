namespace Game {
   
    export class Cars extends PIXI.Container {

        private carsSpeedArr: Array<number> = [];
        private intvl: number;
        private countMove:number = 0;
        private carsCountFinish:number = -1;
        public carHeight:number;
        public carSpeed:number = -1;
        private cars: PIXI.Sprite;
        private carsWind: PIXI.Sprite;
        private carsFire: PIXI.Sprite;
        constructor() {
            super();
              
        }

        public initialize(currCar:number) {
            this.cars = PIXI.Sprite.fromFrame("cars_"+(currCar+1)+".png"); 
            this.carsWind = PIXI.Sprite.fromFrame("cars_wind.png"); 
            this.carsFire = PIXI.Sprite.fromFrame("cars_fire.png"); 
            this.carsFire.y = this.cars.height / 2;
            this.carsFire.x = this.cars.width - 15;
            this.carsWind.y = 0 - (this.cars.height / 2);
            this.addChild(this.cars,this.carsWind,this.carsFire);
            this.carsWind.visible = this.carsFire.visible = false;
            this.carHeight = this.cars.height;
        }

        public update(elapsedTime:number) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            switch (elapsedTime){

                case 50:
                 this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 5) + 1))
                    break;
                case 90:
                 this.carSpeed = (plusOrMinus * Math.floor((Math.random() * 1) + 1))
                    break;
                 
            } 
            if(this.carSpeed < -3)
                this.carsWind.visible = this.carsFire.visible = true;
            else
                this.carsWind.visible = this.carsFire.visible = false;
        }
    }
}