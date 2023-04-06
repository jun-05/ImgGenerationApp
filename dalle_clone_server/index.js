import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";

import connectDB from "./mongodb/connet.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // 클라이언트 도메인을 여기에 입력하세요.
  methods: ["GET", "POST", "PUT", "DELETE"], // 요청 허용 방식 지정
  allowedHeaders: ["Content-Type"], // 허용되는 헤더 설정
  credentials: true, // 쿠키 및 인증 헤더를 허용하려면 이 값을 true로 설정하세요.
};

app.use(cors(corsOptions));

app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
