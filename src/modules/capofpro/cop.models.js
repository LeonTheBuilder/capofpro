const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------
const TradeDay = db.define('TradeDay',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'cop_trade_day',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

const TradeDaySync = db.define('TradeDaySync',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        tradeDay: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        // markType
        markType: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        sifStatus: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

    },
    {
        tableName: 'cop_trade_day_sync',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


//
const Stock = db.define('Stock',
    {
        id: { // 股票代码
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        latestPrice: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        marketCap: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        circulatingMarketCap: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        // ------------------------------------------------
        // 一些标记位
        tenHolderSyncDateInt: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },

    },
    {
        tableName: 'cop_stock',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);


// --------------------------------------------------------------------------------
const Mark = db.define('Mark',
    {
        id: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'cop_mark',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

// --------------------------------------------------------------------------------
module.exports = {
    TradeDaySync,
    TradeDay,
    Stock,
    Mark,
};
