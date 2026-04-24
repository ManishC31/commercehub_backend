import { DbClient } from "../configs/db.config.ts";
import { NewWishlistInput } from "../types/product.type.ts";

export const getWishlistOfUser = async (db: DbClient, userId: number) => {
  const query = `select p.title, p.description,  pr.size, pr.color, pr.price, pr.discount from wishlist w 
  join productrange pr on pr.id = w.productrange_id
  join product p on pr.product_id = p.id
  where w.user_id = $1`;
  const { rows } = await db.query(query, [userId]);
  return rows;
};

export const createWishlist = async (db: DbClient, data: NewWishlistInput) => {
  const query = `insert into wishlist (productrange_id, user_id) values ($1, $2) returning *`;
  const { rows } = await db.query(query, [data.productRangeId, data.userId]);
  return rows[0];
};

export const deleteWishlistByUserId = async (db: DbClient, userId: number) => {
  const query = `delete from wishlist where user_id = $1`;
  await db.query(query, [userId]);
  return true;
};

export const deleteWishListByProductRange = async (db: DbClient, productRangeId: number) => {
  const query = `delete from wishlist where productrange_id = $1`;
  await db.query(query, [productRangeId]);
  return true;
};

export const deleteWishListByProductId = async (db: DbClient, productId: number) => {
  const query = ``;
  await db.query(query, [productId]);
  return true;
};
