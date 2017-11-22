namespace Game {

        export class BetType extends PIXI.Container {

                public topThreeText; bigSmallText; oddEvenText; dragonTigerText: PIXI.Text;
                public result_1_10; result_2_9; result_3_8; result_4_7; result_5_6: string;

                public threeArray: Array<number> = [];
                public sumNum: number;
                public bigSmall; oddEven: string;

                public result: Array<string> = ["6", "S", "E"];
                public resultTexts: Array<PIXI.Text> = [];

                public result_dt: Array<string> = ["T", "T", "T", "T", "T", "T"];
                public resultTexts_dt: Array<PIXI.Text> = [];

                public style = new PIXI.TextStyle({
                        fontFamily: 'Roboto',
                        fontSize: 35,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: ['#a80101'],
                });

                public style_1 = new PIXI.TextStyle({
                        fontFamily: 'Roboto',
                        fontSize: 35,
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fill: ['#ffffff'],
                });

                constructor() {
                        super();

                        this.topThreeText = new PIXI.Text("Top 3: ", this.style);
                        this.topThreeText.position.set(-420, 500);

                        this.dragonTigerText = new PIXI.Text("Dragon/Tiger: ", this.style);
                        this.dragonTigerText.position.set(100, 500);

                        this.addChild(this.topThreeText, this.dragonTigerText);
                        this.showStatus();
                }

                public showStatus() {
                        for (let i = 0; i < 3; i++) {
                                let labelResult: PIXI.Text = new PIXI.Text(this.result[i], this.style_1);
                                labelResult.x = labelResult.x = -270 + (80 * i);
                                labelResult.y = 500;

                                this.resultTexts.push(labelResult);
                                this.addChild(labelResult);
                        }

                        for (let i = 0; i < 5; i++) {
                                let labelResult_dt: PIXI.Text = new PIXI.Text(this.result_dt[i], this.style_1);
                                labelResult_dt.x = labelResult_dt.x = 370 + (80 * i);
                                labelResult_dt.y = 500;

                                this.resultTexts_dt.push(labelResult_dt);
                                this.addChild(labelResult_dt);
                        }
                }

                public updateValues() {
                        for (let i = 0; i < 3; i++) {
                                this.result = [this.sumNum.toString(), this.bigSmall, this.oddEven];
                                this.resultTexts[i].text =  this.result[i];
                        }

                        for (let j = 0; j < 5; j++) {
                                this.result_dt = [this.result_1_10, this.result_2_9, this.result_3_8, this.result_4_7, this.result_5_6];
                                this.resultTexts_dt[j].text = this.result_dt[j];
                        }
                }
        }
}