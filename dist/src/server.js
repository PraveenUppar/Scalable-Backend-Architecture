import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
// import Logger from "./logs/Logger.js";
import "./redis/redis.js";
dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
    connectDB();
    console.log(`Todo Server running on port ${port}`);
    // Logger.info(`Todo Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map