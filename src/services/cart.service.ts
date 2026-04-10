import { DbClient } from "../configs/db.config.ts";

export const deleteCartByProductId = async (db: DbClient, productId: number) => {
  const query = `delete from cart where product_id = $1`;
  await db.query(query, [productId]);
  return true;
};

export const deleteCartByUserId = async (db: DbClient, userId: number) => {
  const query = `delete from cart where user_id = $1`;
  await db.query(query, [userId]);
  return true;
};
