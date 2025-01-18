import { DataTypes, Model } from "sequelize";
import {sequelize} from "../sequelize"
// Valid
export class Payment extends Model { }
  
  Payment.init(
    {
      id: {
        type: DataTypes.STRING,
      },
    },
    { sequelize },
  );
  
  