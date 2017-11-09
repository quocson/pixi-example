module Game {
    /**
     * Market Config
     */
    export interface Market {
        /**
         * MarketId
         */
        a: number;
        /**
         * ProductId
         */
        p: number;
        /**
         * Official Site
         */
        offsite?: string;
        /**
         * Market Betting period
         */
        afreq: number;
        /**
         * Market Time Zone
         */
        timezone: number;
        /**
         * I have no idea about this
         */
        afmt: string;
        /**
         * Market Bet Type Config
         */
        set: Array<BetTypeConfig>;

        /**
         * Stop Betting Time
         */
        stop: number;

        /**
         * Market Stopped: 0 CLosed, 1 Open, 2 Suspend
         */
        s?: number;
    }
    /**
     * Bet Type Config
     */
    export interface BetTypeConfig {
        id: number;
        /**
         * Odds
         */
        o: string;
        lo: string;
        hi: string;

        min?: number;
        max?: number;
    }

    /**
     * Draw information
     */
    export interface Draw {
        /**
         * Market Id
         */
        a?: number;
        /**
         * Draw Number
         */
        dno?: string;
        /** 
         * Result
         */
        rno?: string;
        /**
         * Product Id
         */
        p?: number;
        /**
         * Date
         */
        s?: number;

        dateStr: string;

        timeStr: string;

        e?: number;
        rt: string;
        /**
         * Start  1 = left, 2 = right
         */
        start: number;
        /**
         * Odd Even odd = 1, even = 2
         */
        oe: number;
        /**
         * Leg 3,4
         */
        legs: number;
        // goal left
        result: string;
        lb: string;
        // number of people bet on left
        OddBet: number;
        // number of people bet on right
        EvenBet: number;
    }

    export interface UserInfo {
        /**
         * Currency
         */
        curr: string;
        /**
         * Ignore Markets
         */
        mkt: string;
        /**
         * UserId
         */
        userid: string;
        /**
         * Balance
         */
        wallet: number;
        /**
         * Limits Config
         */
        lmt: Array<LimitConfig>;
    }

    export interface LimitConfig {
        /**
         * ProductId
         */
        p: number;
        /**
         * Limit list: min1, min2,...| max1, max2,...
         */
        mul: string;
    }

    /**
     * Bet information
     */
    export interface Bet {
        /**
         * Bet Amount
         */
        amt: number;
        /**
         * Bet ticket number
         */
        bno: string;
        /**
         * Bet Content: MarketId @ DrawNo @ BetTypeNo @ Odd @ Balls @ 1 
         */
        cont: string;
        /**
         * Bet Time
         */
        date: number;
        /**
         * Odds
         */
        o: string;
        /**
         * Winning Amount
         */
        win: number;
    }


    export interface IBetData {
        /**
         * Market Id
         */
        a: number;
        /**
         * Bet Amount
         */
        amt: number;
        /**
         * Bet Count
         */
        bets: number;
        /**
         * Product Id
         */
        p: number;
        /**
         * Client Platform Id
         */
        pla: number;
        /**
         * Bet Type Id
         */
        id: number;
        /**
         * Draw Number
         */
        dno: string;
        /**
         * Bet Stake
         */
        stk: number;
        /**
         * Bet Content
         */
        cont: string;
    }
    export class BetData implements IBetData {
        public a: number;
        public amt: number;
        public bets: number;
        public p: number = 4;
        public pla: number
        public id: number;
        public dno: string;
        public stk: number;
        public cont: string;
        constructor(betTypeId: number, drawNo: string,
            stake: number) {
            this.a = 1;
            this.id = betTypeId;
            this.dno = drawNo;
            this.pla = 1;
            this.amt = this.stk = stake;
            this.bets = 1;
            this.cont = "";
        }
    }

    export interface BetContent {
        BetType: number;
        Stake: number;
    }

    export interface BetStackItem {
        BetType: number;
        Value: number;
        OriValue: number;
    }
    export interface PlacedBet extends BetContent {
        DrawNo: string;
    }



    export interface Vendor {
        fund_url?: string;
        chat_url?: string;
        rule_url?: string;
        login_url?: string;
        lobby_url?: string;
        logout_url?: string;
        home_url?: string;
    }
} 