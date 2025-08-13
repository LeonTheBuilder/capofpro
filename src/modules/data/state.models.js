const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;


const StockState = db.define('StockState',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        stockId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        dateInt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // -----------------
        totalMarketValue: { // 总市值：亿
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        circulatingMarketValue: { // 流通市值：亿
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        priceToBookRatio: { // 市净率
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        priceEarningsRatioDynamic: {  // 市盈率(动)
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // -----------------
        openPrice: { // 今开
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        highestPrice: { // 最高
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        lowestPrice: { // 最低
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        previousClose: { // 昨收
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        amplitude: { // 振幅 (%)
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // -----------------

        tradingVolume: { // 成交量 (万)
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnover: {  // 成交额（亿）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnoverRate: { // 换手律 (%)
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // -----------------
        capFlowIn: { // 资金流入（万）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // 资金流出万元
        capFlowOut: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },

    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
        indexes: [
            {
                fields: ['stockId', 'dateInt'],
            },
        ],
    }
);

const StockBigTrade = db.define('StockBigTrade',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        stockId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        dateInt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // 价格
        price: { // 元
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        tradePrice: { // 交易价格
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },

        tradeVolume: { // 交易数量（万股）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        tradeAmount: { // 交易额（万）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        premiumRate: { // 溢价率（百分比）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        instBuyId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        instSellId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        }
    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


// 规模
const Scale = db.define('Scale',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

// 基金流向
const CapFlow = db.define('CapFlow',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


// 事件 ： 比如股票的涨停、涨跌5%，涨跌10%，涨跌15%，
const Event = db.define('Event',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


// 股票十大股东
const StockHolding = db.define('StockHolding',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        stockId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        dateInt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // 股东名称
        traderId: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        holdType: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        holdQuantity: { // 持股数量（万股）
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        holdRatio: { // 持股比例
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        }
    },
    {
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


module.exports = {
    CapFlow,
    StockBigTrade,
    StockState,
    StockHolding,
    Scale,
    Event,
};
