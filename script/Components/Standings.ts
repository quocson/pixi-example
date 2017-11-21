namespace Game {
    const COMMON_STYLE = new PIXI.TextStyle({
        fontFamily: 'Roboto',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fill: ['#FFFFFF'],
    });
    export class Standings extends PIXI.Container {
        private arrStandingsLabel: Array<string> = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",]
        private arrCarsSprite: Array<PIXI.Sprite> = [];
        private arrLabel: Array<PIXI.Text> = [];
        private carFinishCount: number = 0;
        constructor() {
            super();
            this.initialize();
        }

        public initialize() {
            for (let j: number = 0; j < 10; j++) {
                let label: PIXI.Text = new PIXI.Text(this.arrStandingsLabel[j], COMMON_STYLE)
                let carSprite: PIXI.Sprite = PIXI.Sprite.fromFrame("cars_" + (j + 1) + ".png");
                carSprite.scale.x = carSprite.scale.y = .5
                label.y = 30;
                carSprite.y = 80
                carSprite.x = label.x = 50 + (115 * j);
                this.arrCarsSprite.push(carSprite);
                this.arrLabel.push(label)
                this.addChild(label, carSprite);
            }
        }

        public update(carsCurrDistance: Array<number>) {
            let sortArr: Array<number> = carsCurrDistance.slice();
            let carIndex: number = 0
            sortArr.sort(function (a, b) { return a - b })
            //carsCurrDistance = array of cars' current "x-coordinates"
            //sortArr = array of sorted cars' current "x-coordinates" for tracking 
            //of cars current ranking
            for (let x: number = 0; x < 10; x++) {
                carIndex = sortArr.indexOf(carsCurrDistance[x])
                this.arrCarsSprite[x].x = this.arrLabel[carIndex].x;
                sortArr[carIndex] = undefined;
                //declare sortArr[carIndex] to 'undefined' so that 
                //sortArr.indexOf wont return the same index incase 
                //cars have the same current distance 
            }
        }

        public update2(carsCurrDistanceObj) {
            var sortable = [];
            for (var param in carsCurrDistanceObj) {
                sortable.push([carsCurrDistanceObj[param].xCoord, carsCurrDistanceObj[param].carNumber]);
            }//store the object values for sorting
            sortable.sort(function(a, b) {return a[0] - b[0]});
            for (let x: number = 0; x < 10; x++) {
                this.arrCarsSprite[sortable[x][1]].x = this.arrLabel[x].x;
            }
        }
    }
}