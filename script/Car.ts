namespace Game {

    export class Car extends PIXI.Container {

        public cars;
        public carSmoke;
        public carWind;

        public carsId: number;
        public carsSpeed: number = 1;

        constructor() {
            super();
        }

        public initCars(addCar: number) {
            this.cars = PIXI.Sprite.fromFrame("cars_" + (addCar + 1) + ".png");
            this.carsId = addCar + 1;
            this.carSmoke = PIXI.Sprite.fromFrame("cars_fire.png");
            this.carWind = PIXI.Sprite.fromFrame("cars_wind.png");

            this.carSmoke.x = this.cars.width - 10;
            this.carSmoke.y = this.cars.height / 2;
            this.carWind.y = this.cars.height - 70;

            this.carSmoke.visible = this.carWind.visible = false;

            this.addChild(this.cars, this.carSmoke, this.carWind);
        }

        public update(elapsedTime: number) {
            if (elapsedTime == 90) {
                if (this.carsSpeed != 0)
                    this.carsSpeed = Math.floor(Math.random() * (5) + 1);
            }

            if (elapsedTime == 150) {
                if (this.carsSpeed != 0)
                    this.carsSpeed = 2;
            }

            if (this.carsSpeed >= 3)
                this.carSmoke.visible = this.carWind.visible = true;
            else
                this.carSmoke.visible = this.carWind.visible = false;
        }
    }
}