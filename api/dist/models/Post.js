'use strict'
const Post(sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: new DataTypes.STRING(1024),
        allowNull: false
    }, {})
    Post.associate = (models) => {
        Post.belongsTo(models.User)
    }
    return Post
}

export default Post