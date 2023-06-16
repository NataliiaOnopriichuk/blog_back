import mongoose from "mongoose"
import { app } from "./app.js";

const {DB_HOST, PORT = 3000 } = process.env

mongoose
.connect(DB_HOST)
.then(() => {
    console.log("DB CONNECTED");
    app.listen(PORT)
})
.catch((err) => {
    console.log('DB error', err.message)
    process.exit(1)
})

