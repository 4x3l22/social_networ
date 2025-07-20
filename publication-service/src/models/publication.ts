import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface PublicationAttributes {
  id: number;
  title: string;
  content: string;
  likes?: number;
  authorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PublicationCreationAttributes = Optional<PublicationAttributes, 'id'>;

export interface PublicationInstance
  extends Model<PublicationAttributes, PublicationCreationAttributes>,
    PublicationAttributes {}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Publication extends Model<PublicationAttributes, PublicationCreationAttributes> implements PublicationAttributes {
    public id!: number;
    public title!: string;
    public content!: string;
    public authorId!: number;
    public likes?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Publication.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'publications',
      modelName: 'Publication',
      timestamps: true,
    }
  );

  return Publication;
     
}
