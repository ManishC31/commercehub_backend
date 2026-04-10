import "dotenv/config";
import app from "./app.ts";

const port = process.env.PORT;

if (!port) {
  throw new Error("Environment vaiables not found. Make sure to add .env file");
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
