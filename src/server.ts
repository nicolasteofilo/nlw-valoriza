import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

import "./database";
import { router } from "./routes";

// import swaggerDocs from './swagger.yaml'

import swaggerUi from "swagger-ui-express";
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.use(express.json());
app.use(cors());

// Routes
app.use(router);

// Error Middleware
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

const port = process.env.PORT_APP || 3001;
app.listen(port, () =>
  console.log(`Server is running in http://localhost:${port}`)
);
