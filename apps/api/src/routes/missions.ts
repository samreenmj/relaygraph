import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createMission, getMission } from "../missions.js";

const createMissionSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1).max(10_000),
});

const uuidSchema = z.string().uuid();

export async function missionRoutes(app: FastifyInstance) {
  app.post("/missions", async (request, reply) => {
    const parsed = createMissionSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid mission input",
        details: parsed.error.flatten(),
      });
    }

    const mission = await createMission(parsed.data);
    return reply.code(201).send({ mission });
  });

  app.get("/missions/:id", async (request, reply) => {
    const params = request.params as { id: string };
    const parsedId = uuidSchema.safeParse(params.id);

    if (!parsedId.success) {
      return reply.code(400).send({ error: "Invalid mission ID" });
    }

    const mission = await getMission(parsedId.data);

    if (!mission) {
      return reply.code(404).send({ error: "Mission not found" });
    }

    return reply.send({ mission });
  });
}
