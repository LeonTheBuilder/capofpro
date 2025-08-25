const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------


const RealtimeQuote = db.define('RealtimeQuote',
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
        tableName: 'cop_realtime_quote',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);
// --------------------------------------------------------------------------------
module.exports = {
    RealtimeQuote,
};
