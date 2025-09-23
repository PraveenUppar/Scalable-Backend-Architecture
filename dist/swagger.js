import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const router = express.Router();
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Todo API",
            version: "1.0.0",
            description: "Todo API",
        },
        tags: [
            {
                name: "todos",
                description: "Todos API",
            },
            {
                name: "users",
                description: "Users API",
            },
        ],
        servers: [
            {
                url: `http://localhost:5000`,
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
                Bearer: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "JWT authorization of an API",
                },
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                    description: "API key authorization of an API",
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
require("swagger-model-validator")(swaggerSpec);
router.get("/json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;
//# sourceMappingURL=swagger.js.map