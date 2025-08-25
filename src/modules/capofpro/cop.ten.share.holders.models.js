const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------

/**
 * {
 *     '名次': 10,
 *     '股东名称': 'MERRILL LYNCH INTERNATIONAL',
 *     '股东性质': 'QFII',
 *     '股份类型': 'A股',
 *     '持股数': 485362,
 *     '占总流通股本持股比例': 0.3970713734,
 *     '增减': '新进',
 *     '变动比率': null
 *   }
 */


const StockShareholder = db.define('StockShareholder',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'cop_stock_shareholder',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

// --------------------------------------------------------------------------------
module.exports = {
    StockShareholder,
};
