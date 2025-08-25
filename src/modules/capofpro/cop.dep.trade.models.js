const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------

const DepartmentTradeDetail = db.define('DepartmentTradeDetail',
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
        tableName: 'cop_department_trade_detail',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
);

const DepartmentActivity = db.define('DepartmentActivity',
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
        tableName: 'cop_department_activity',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);

// --------------------------------------------------------------------------------
module.exports = {
    DepartmentTradeDetail,
    DepartmentActivity,
};
