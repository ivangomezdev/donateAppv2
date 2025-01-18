import { DataTypes, Model } from "sequelize";
import {sequelize} from "../lib/sequelize"
// Valid
export class Payment extends Model { }
  
  Payment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      from: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      message: {
        type: DataTypes.STRING,
        primaryKey: true
      }
      ,
      amount: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      date: {
        type: DataTypes.DATE,
        primaryKey: true
      },
      status: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    },
    { sequelize },
  );
  
  