import { DbClient } from "../configs/db.config.ts";
import { NewProductRangeInput } from "../types/product.type.ts";

export const getProductRangeByProductId = async (db: DbClient, productId: number) => {
  const query = `select * from productrange where product_id = $1`;
  const { rows } = await db.query(query, [productId]);
  return rows;
};

export const createProductRange = async (db: DbClient, data: NewProductRangeInput) => {
  const query = `insert into productrange (product_id, color, size, price, discount) values ($1, $2, $3, $4, $5) returning *`;
  const { rows } = await db.query(query, [data.productId, data.color, data.size, data.price, data.discount]);
  return rows[0];
};

export const deleteProductRangeByProductId = async (db: DbClient, productId: number) => {
  const query = `delete from productrange where product_id = $1`;
  await db.query(query, [productId]);
  return true;
};
