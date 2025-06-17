import { Router } from "express";
import routerRoom from "./roomRouter";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({
    hotelName: "Hotel Miranda",
    message: "Bienvenido a la API del Hotel Miranda",
    availableEndpoints: [
      { path: "/api/rooms", methods: ["GET", "POST"] },
      { path: "/api/rooms/:id", methods: ["GET", "PUT", "DELETE"] },
    ],
  });
});

apiRouter.use("/rooms", routerRoom);

export default apiRouter;