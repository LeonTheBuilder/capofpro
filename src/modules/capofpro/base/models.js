const a = require('aframework');
const db = a.db;
const DataTypes = a.models.DataTypes;
// --------------------------------------------------------------------------------
const AgentLog = db.define('AgentLog',
    {
        id: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
        },
        tags: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: 'base_agent_log',
        freezeTableName: true,
        charset: 'utf8mb4',
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    }
);
// --------------------------------------------------------------------------------
module.exports = {
    AgentLog,
};
