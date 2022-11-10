import { Model } from 'sequelize'
import { getHash } from '../helpers/password'
import { USER_ROLE } from '../helpers/constants'

export default (sequelize, DataTypes) => {
  /** User */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     * @static
     * @memberof User
     */
    static associate() {
      /** define association here */
    }
  }

  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', getHash(value))
      },
    },
    role: DataTypes.INTEGER,
    mobile_phone: DataTypes.STRING,
    last_login: DataTypes.DATE,
    created_by: DataTypes.BIGINT,
    deleted_by: DataTypes.BIGINT,
    updated_by: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: true,
    tableName: 'users',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
  })

  return User
}
