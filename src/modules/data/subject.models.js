const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;

// 基金经理
const FundManager = db.define('FundManager',
    {
        id: { 
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        name: { 
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


// 营业部
const SecurityBusinessDepartment = db.define('SecurityBusinessDepartment',
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

// 机构
const Institution = db.define('Institution',
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
    FundManager,
    SecurityBusinessDepartment,
    Institution,
};
