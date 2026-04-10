import { DbClient } from "../configs/db.config.ts";
import { NewFeedbackInput } from "../types/product.type.ts";

export const getFeedbacksByProductId = async (db: DbClient, productId: number) => {
  const query = `select * from feedback where product_id = $1`;
  const { rows } = await db.query(query, [productId]);
  return rows;
};

export const createFeedback = async (db: DbClient, data: NewFeedbackInput) => {
  const query = `insert into feedback (product_id, user_id, rating, comment) values ($1, $2, $3, $4) returning *`;
  const { rows } = await db.query(query, [data.productId, data.userId, data.rating, data.comment]);
  return rows[0];
};

export const deleteFeedbackByProductId = async (db: DbClient, productId: number) => {
  const query = `delete from feedback where product_id = $1`;
  await db.query(query, [productId]);
  return true;
};

export const deleteFeedbackByUserId = async (db: DbClient, userId: number) => {
  const query = `delete from feedback where user_id = $1`;
  await db.query(query, [userId]);
  return true;
};
