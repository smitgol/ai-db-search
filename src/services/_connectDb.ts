import { DataSource, DataSourceOptions  } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";

export const connectDb = async (_datasource: DataSourceOptions):Promise<SqlDatabase> => {
  try {
    const datasource = new DataSource({
      ..._datasource
    });
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: datasource,
    });
    return db
  }
  catch (e) {
    console.log(e)
    throw e
  }
}