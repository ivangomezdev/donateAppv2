import { DataTypes, Model } from "sequelize";
import {sequelize} from "../lib/sequelize"
// Valid
export class Payment extends Model { }
  
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER, // Tipo de dato para el ID
        autoIncrement: true, // Incremento automático
        primaryKey: true, // Clave primaria
      },  
      from: {
        type: DataTypes.STRING,

      },
      message: {
        type: DataTypes.STRING,
        
      }
      ,
      amount: {
        type: DataTypes.STRING,
        
      },
      date: {
        type: DataTypes.DATE,
        
      },
      status: {
        type: DataTypes.STRING,
        
      },
    },
    { sequelize,
      modelName: 'Payment' },
  );
  
  