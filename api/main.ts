import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import data from "./data.json" with { type: "json" };
import { Dino } from "../src/types.ts";

/**creates the router */
const router = new Router();

/** defines the routes within the application */

router.get("/api/dinosaurs", (context) => {
    context.response.body = data;
  });
  
router.get("/api/dinosaurs/:dinosaur", (context) => {
  if (!context?.params?.dinosaur) {
    context.response.body = "No dinosaur name provided.";
  }

  const dinosaur = data.find((item: Dino ) =>
    item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
  );

  context.response.body = dinosaur ?? "No dinosaur found.";
});

/** creates the application */
const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
