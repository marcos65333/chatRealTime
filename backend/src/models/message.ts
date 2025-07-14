import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/database';
import User from './user';

export interface MessageAttributes {
  id?: number;
  content: string;
  userId: number;
}


interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> { }

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Message',
    sequelize: db,
  }
);

Message.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });
export default Message;


