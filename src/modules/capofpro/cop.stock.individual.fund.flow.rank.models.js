const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------
const StockFundFlowRank = db.define('StockFundFlowRank',
    {
        id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'cop_stock_fund_flow_rank',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

// --------------------------------------------------------------------------------
module.exports = {
    StockFundFlowRank
};
