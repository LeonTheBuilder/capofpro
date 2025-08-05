const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;

const OfficialInstitution = db.define('OfficialInstitution',
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

// 新闻：战争、科技突破等等
const News = db.define('News',
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



// 政令、规定、




module.exports = {
    OfficialInstitution,
    News,
};
