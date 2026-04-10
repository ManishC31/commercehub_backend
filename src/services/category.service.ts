import { DbClient } from "../configs/db.config.ts";
import { NewCategoryInput } from "../types/category.type.ts";

export const getAllCategories = async (db: DbClient) => {
  const query = `SELECT * FROM category`;
  const { rows } = await db.query(query);
  return rows;
};

export const getCategoryById = async (db: DbClient, categoryId: number) => {
  const query = `SELECT * FROM category WHERE id = $1`;
  const { rows } = await db.query(query, [categoryId]);
  return rows[0];
};

export const createCategory = async (db: DbClient, data: NewCategoryInput) => {
  const query = `INSERT INTO category (name) values ($1) returning *`;
  const { rows } = await db.query(query, [data.name]);
  return rows[0];
};
