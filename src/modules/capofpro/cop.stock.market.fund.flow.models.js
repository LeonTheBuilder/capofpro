const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------

const StockMarketFundFlow = db.define('StockMarketFundFlow',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'cop_stock_market_fund_flow',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


// --------------------------------------------------------------------------------
module.exports = {
    StockMarketFundFlow,
};
