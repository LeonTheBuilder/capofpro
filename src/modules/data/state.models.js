const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;


// 成交量、换手量、机构持股比例

// 价格
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
        // 价格
        price: { // 元
            type: DataTypes.DECIMAL(65, 30),
            allowNull: false,
        },
        // 价格浮动百分比
        priceRatioDay: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        priceRatioDay3: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        priceRatioDay5: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // 换手率
        turnoverRatioDay: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnoverRatioDay3: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnoverRatioDay5: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // 换手量
        turnoverDay: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnoverDay3: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        turnoverDay5: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // 资金流出入净额万元
        capFlowDay: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        capFlowDay3: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        capFlowDay5: {
            type: DataTypes.DECIMAL(65, 30),
            allowNull: true,
        },
        // 资金流入万元
        capFlowIn: {
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


// 规模
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
        amount: { // 多少股票
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


module.exports = {
    CapFlow,
    StockBigTrade,
    StockState,
    Scale,
    Event,
};
