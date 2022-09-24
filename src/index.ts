import app from "./app";

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
