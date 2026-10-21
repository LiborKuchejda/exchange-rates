import { describe, expect, it, vi } from "vitest";
import { ApiError, customFetch } from "./customFetch";

describe("ApiError", () => {
  it("sets message from body.message when present", () => {
    const err = new ApiError(400, { message: "Bad request" });
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("ApiError");
    expect(err.status).toBe(400);
    expect(err.body).toEqual({ message: "Bad request" });
    expect(err.message).toBe("HTTP 400: Bad request");
  });

  it("falls back to 'Networking problem' if no message in body", () => {
    const err = new ApiError(500, {});
    expect(err.message).toBe("HTTP 500: Networking problem");
  });

  it("works when body is undefined", () => {
    const err = new ApiError(503);
    expect(err.message).toBe("HTTP 503: Networking problem");
  });
});

describe("customFetch", () => {
  it("returns parsed JSON on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ foo: "bar" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await customFetch<{ foo: string }>("http://test", { method: "GET" });
    expect(result).toEqual({ foo: "bar" });
    vi.unstubAllGlobals();
  });

  it("throws ApiError with parsed body on error response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => JSON.stringify({ message: "Not found" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(customFetch("http://test", { method: "GET" })).rejects.toBeInstanceOf(ApiError);
    await expect(customFetch("http://test", { method: "GET" })).rejects.toMatchObject({
      status: 404,
      body: { message: "Not found" },
    });
    vi.unstubAllGlobals();
  });

  it("throws ApiError with 'Server returned non-JSON response' when response is not JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => "<html>oops</html>",
      headers: new Headers({ "content-type": "text/html" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(customFetch("http://test", { method: "GET" })).rejects.toBeInstanceOf(ApiError);
    try {
      await customFetch("http://test", { method: "GET" });
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      expect((e as ApiError).status).toBe(200);
      expect((e as ApiError).body).toEqual({ message: "Server returned non-JSON response" });
    }
    vi.unstubAllGlobals();
  });
});
