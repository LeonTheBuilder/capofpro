const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------

const MarginTradingDetail = db.define('MarginTradingDetail', {
    // 主键 ID，格式为 "证券代码_交易日期"
    id: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    tableName: 'cop_margin_trading_detail',
    freezeTableName: true,
    charset: 'utf8mb4',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});

module.exports = MarginTradingDetail;
// --------------------------------------------------------------------------------
module.exports = {
    MarginTradingDetail,
};
