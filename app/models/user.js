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
      this.addHook('beforeFind', (options) => {
        if (!options.attributes) {
          // eslint-disable-next-line no-param-reassign
          options.attributes = this.getBasicAttribute()
        }
      })
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

  // eslint-disable-next-line func-names
  /**
   * get array of attribute that can be called multiple times
   * @memberof User
   * @function getBasicAttribute
   * @returns {Array} array of attributes
   */
  User.getBasicAttribute = function () {
    return [
      'id',
      'uuid',
      'name',
      'email',
      'role',
      'mobile_phone',
      'last_login',
      'created_by',
      'updated_by',
    ]
  }

  User.getTitle = () => 'User'

  User.columnsList = function () {
    return [
      {
        label: 'id',
        attribute: 'id',
        type: 'text',
      },
      {
        label: 'Nama',
        attribute: 'name',
        type: 'text',
      },
      {
        label: 'Email',
        attribute: 'email',
        type: 'text',
      },
      {
        label: 'Mobile Phone',
        attribute: 'mobile_phone',
        type: 'text',
      },
    ]
  }

  User.detail = async function (data) {
    return [
      {
        label: 'Name',
        value: data?.name || '',
      },
      {
        label: 'Email',
        value: data.email || '',
      },
      {
        label: 'Mobile Phone',
        value: data.mobile_phone || '',
      },
    ]
  }

  User.renderForm = async function (args = {}) {
    const {
      title, linkAction, data = {}, errors = {}, res,
    } = args

    return res.render('form.hbs', {
      title,
      paramsForm: {
        title,
        linkAction,
        formData: [
          {
            label: 'Nama',
            type: 'text',
            value: data.name,
            attribute: 'name',
            errors: errors.name,
          },
          {
            label: 'Email',
            type: 'email',
            value: data.email,
            attribute: 'email',
            errors: errors.email,
          },
          {
            label: 'Mobile Phone',
            value: data.mobile_phone,
            attribute: 'mobile_phone',
            type: 'text',
            errors: errors.mobile_phone,
          },
          {
            label: 'Password',
            value: '',
            attribute: 'password',
            type: 'password',
            errors: errors.password,
          },
          {
            label: 'Password Confirmation',
            value: '',
            attribute: 'password_confirmation',
            type: 'password',
            errors: errors.password_confirmation,
          },
          {
            label: 'Role',
            value: USER_ROLE.ADMIN,
            attribute: 'role',
            type: 'hidden',
            errors: errors.role,
          },
          {
            label: '',
            value: data.id,
            attribute: 'id',
            type: 'hidden',
          },
        ],
      },
    })
  }

  const commonAdminFields = [
    'name',
    'password',
    'email',
    'mobile_phone',
    'role',
  ]

  User.getCreateFields = () => commonAdminFields

  User.getUpdateFields = () => commonAdminFields

  return User
}
