import * as dotenv from 'dotenv';
import { Refresh_Token } from 'src/auth/entities/refresh-token.entity';
import { Gstin_Business } from 'src/user/entites/gst_buss.entity';
import { Gstin_Detail } from 'src/user/entites/gst_detail.entity';
import { Gstin_filing } from 'src/user/entites/gst_filing.entity';
import { User } from 'src/user/entites/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
dotenv.config();

const config: MysqlConnectionOptions = {
  type: "mysql",
  host: "161.97.177.80",
  port: 3306,
  username: "bipin_gstin",
  password: "Gstin@123",
  database: "gstin_bipin",
  entities: [User, Refresh_Token, Gstin_Business, Gstin_filing, Gstin_Detail],
  synchronize: true,
}

export default config;