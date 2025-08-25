const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------

const HsgtTradeSummary = db.define('HsgtTradeSummary', {
    id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
    },
    value: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    tableName: 'cop_hsgt_trade_summary',
    freezeTableName: true,
    charset: 'utf8mb4',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
// --------------------------------------------------------------------------------
module.exports = {
    HsgtTradeSummary,
};
