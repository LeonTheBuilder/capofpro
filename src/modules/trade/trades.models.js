const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;



// 分析结果
const AnalysisResult = db.define('AnalysisResult',
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



// 模拟交易
const PaperTrade = db.define('PaperTrade',
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
    AnalysisResult,
    PaperTrade,
};
