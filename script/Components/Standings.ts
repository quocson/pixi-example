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
        private arrLabel:Array<PIXI.Text> = [];
        private carFinishCount:number = 0;
        constructor() {
            super();
            this.initialize();
        }

        public initialize() {
            for (let j: number = 0; j < 10; j++) {
                let label: PIXI.Text = new PIXI.Text(this.arrStandingsLabel[j], COMMON_STYLE)

                let carSprite:PIXI.Sprite = PIXI.Sprite.fromFrame("cars_" + (j + 1) + ".png");
                carSprite.scale.x = carSprite.scale.y = .5
                label.y = 30;
                carSprite.y = 80
                //carSprite.x = 50 + (110 * j);
                carSprite.x = label.x = 50 + (115 * j);
                this.arrCarsSprite.push(carSprite);
                this.arrLabel.push(label)
                this.addChild(label, carSprite);
            }
        }



        public update(carsCurrDistance: Array<number>) {
           // console.log(carsCurrDistance)
            let sortArr:Array<number> = carsCurrDistance.slice();
            let carIndex:number = 0
            sortArr.sort(function(a, b){return a - b})
            //console.log("sortArr =="+sortArr);
            //console.log("carsCurrDistance =="+carsCurrDistance);
            //console.log("carsCurrDistance =="+carsCurrDistance);
            for(let x:number = 0; x < 10; x++){
                
                carIndex = sortArr.indexOf(carsCurrDistance[x])
                this.arrCarsSprite[x].x = this.arrLabel[carIndex].x;
                sortArr[carIndex] = -99;
            }
            
            
        }
    }
}