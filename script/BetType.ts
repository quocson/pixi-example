namespace Game {

        export class BetType extends PIXI.Container {

                private topThreeText: PIXI.Text;
                private bigSmallText: PIXI.Text;
                private oddEvenText: PIXI.Text;

                private dt_1_10: PIXI.Text;
                private dt_2_9: PIXI.Text;
                private dt_3_8: PIXI.Text;
                private dt_4_7: PIXI.Text;
                private dt_5_6: PIXI.Text;
                
                public threeArray: Array<number> = [];
                public sumNum: number;
                public bigSmall: string;
                public oddEven: string;

                constructor() {
                        super();

                        let style = new PIXI.TextStyle({
                                fontFamily: 'Roboto',
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#4286f4'],
                        });

                        this.topThreeText = new PIXI.Text("Top 3: ", style);
                        this.topThreeText.position.set(-420, 500);

                        this.bigSmallText = new PIXI.Text("Big or Small: ", style);
                        this.bigSmallText.position.set(-420, 540);
                        
                        this.oddEvenText = new PIXI.Text("Odd or Even: ", style);
                        this.oddEvenText.position.set(-420, 580);
                        
                        this.addChild(this.topThreeText, this.bigSmallText, this.oddEvenText);
                }

                public showStatus() {
                        let style = new PIXI.TextStyle({
                                fontFamily: 'Roboto',
                                fontSize: 30,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fill: ['#4286f4'],
                        });
                        this.topThreeText = new PIXI.Text("Top 3: " + this.sumNum, style);
                        this.topThreeText.position.set(-420, 500);

                        this.bigSmallText = new PIXI.Text("Big or Small: " + this.bigSmall, style);
                        this.bigSmallText.position.set(-420, 540);
                        
                        this.oddEvenText = new PIXI.Text("Odd or Even: " + this.oddEven, style);
                        this.oddEvenText.position.set(-420, 580);

                        //Dragon or Tiger
                        this.dt_1_10 = new PIXI.Text("1st & 10th: ", style);
                        this.dt_1_10.position.set(-420, 640);

                        this.dt_2_9 = new PIXI.Text("2nd & 9th: ", style);
                        this.dt_2_9.position.set(-420, 680);

                        this.dt_3_8 = new PIXI.Text("3rd & 8th: ", style);
                        this.dt_3_8.position.set(-420, 720);

                        this.dt_4_7 = new PIXI.Text("4th & 7th: ", style);
                        this.dt_4_7.position.set(-420, 760);

                        this.dt_5_6 = new PIXI.Text("5th & 6th: ", style);
                        this.dt_5_6.position.set(-420, 800);

                        this.addChild(this.topThreeText, this.bigSmallText, this.oddEvenText);
                        this.addChild(this.dt_1_10, this.dt_2_9, this.dt_3_8, this.dt_4_7, this.dt_5_6);
                }
        }
}