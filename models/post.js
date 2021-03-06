module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    inputFile: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
    fileLocation: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  // We're saying that a Post should belong to a User
  // A Post can't be created without a User due to the foreign key constraint
  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
