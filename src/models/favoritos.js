const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Favorito = sequelize.define(
    "Favoritos",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "favoritos",
      timestamps: true,
      createAt: true,
      updatedAt: false,
    }
  );

  Favorito.associate = (modelos) => {
    Favorito.belongsTo(modelos.Usuarios, {
      foreignKey: "id_usuario",
      as: "usuarios",
    });
  };

  return Favorito;
};
