import { NewUserInput } from "../types/user.type.ts";
import bcrypt from "bcryptjs";
import { DbClient } from "../configs/db.config.ts";

export const getUserByEmail = async (db: DbClient, email: string) => {
  const query = `SELECT * FROM users WHERE email =$1 limit 1`;
  const { rows } = await db.query(query, [email]);
  return rows[0] ?? null;
};

export const getUserById = async (db: DbClient, id: number) => {
  const query = `SELECT * FROM users WHERE id =$1 limit 1`;
  const { rows } = await db.query(query, [id]);
  return rows[0] ?? null;
};

export const createUser = async (db: DbClient, data: NewUserInput) => {
  const query = `INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING id, name, email, created_at`;

  const encPassword = await bcrypt.hash(data.password, 10);

  const { rows } = await db.query(query, [data.name, data.email, encPassword]);
  return rows[0];
};

export const deleteUser = async (db: DbClient, id: number) => {
  try {
    const query = `DELETE FROM users where id = $1`;
    const response = await db.query(query, [id]);
    return true;
  } catch (error) {
    console.error("Err deleteUser:", error);
    throw error;
  }
};
