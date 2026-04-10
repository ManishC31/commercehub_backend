import { DbClient } from "../configs/db.config.ts";
import { NewProductInput } from "../types/product.type.ts";

export const getProductById = async (db: DbClient, productId: number) => {
  const query = `select * from product where id = $1`;
  const { rows } = await db.query(query, [productId]);
  return rows[0];
};

export const getProductByName = async (db: DbClient, productName: string) => {
  const query = `select * from product where lower(title) = $1 limit 1`;
  const { rows } = await db.query(query, [productName.toLowerCase()]);
  return rows[0];
};

export const getAllProducts = async (db: DbClient, limit: number = 10, offset: number = 0) => {
  const query = `select * from product offset $1 limit $2`;
  const { rows } = await db.query(query, [offset, limit]);
  return rows;
};

export const createProduct = async (db: DbClient, data: NewProductInput) => {
  const query = `insert into product (
    title, description, category_id, material, care_instructions, fit, price, discount) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`;

  const { rows } = await db.query(query, [
    data.title,
    data.description,
    data.categoryId,
    data.material,
    data.careInstructions,
    data.fit,
    data.price,
    data.discount,
  ]);

  return rows[0];
};

export const getProductInformationById = async (db: DbClient, productId: number) => {
  const productQuery = `select * from products where id = $1`;
};

export const deleteProductById = async (db: DbClient, productId: number) => {
  const query = `delete from product where id = $1`;
  await db.query(query, [productId]);
  return true;
};
