const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;


const TokenUsage = db.define('TokenUsage',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        model: {
            type: DataTypes.STRING(18),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(18),
            allowNull: true,
        },
        status_code: {
            type: DataTypes.STRING(1),
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        prompt_tokens: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        completion_tokens: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        duration: { // 秒
            type: DataTypes.DECIMAL(10, 4),
            allowNull: true,
        }
    },
    {
        charset: 'utf8mb4',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    }
);


module.exports = {
    TokenUsage,
};
