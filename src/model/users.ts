import { DataTypes, Model } from "sequelize";
import {sequelize} from "../lib/sequelize"
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
  
  const user = new Payment({ id: 1 });
  console.log(user);
  