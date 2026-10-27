import { afterAll, describe, expect, it } from "vitest";
import { buildApp } from "../src/app.js";

const app = buildApp();

describe("RelayGraph API", () => {
  afterAll(async () => {
    await app.close();
  });

  it("returns a healthy status", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      status: "ok",
      service: "relaygraph-api",
    });
    expect(response.json().timestamp).toBeTypeOf("string");
  });
});
