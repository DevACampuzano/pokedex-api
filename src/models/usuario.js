const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      documento: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      password: {
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
      tableName: "usuarios",
      timestamps: true,
      createAt: true,
      updatedAt: false,
    }
  );

  Usuario.associate = (modelos) => {
    Usuario.hasMany(modelos.Favoritos, {
      foreignKey: "id_usuario",
      as: "favoritos",
    });
  };

  return Usuario;
};
