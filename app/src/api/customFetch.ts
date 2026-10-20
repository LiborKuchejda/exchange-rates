export class ApiError<T = unknown> extends Error {
    constructor(
        public readonly status: number,
        public readonly body?: T,
    ) {
        const message = (body as { message?: unknown } | undefined)?.message;
        super(`HTTP ${status}: ${typeof message === "string" ? message : "Networking problem"}`);
        this.name = "ApiError";
    }
}

export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    const res = await fetch(url, options);
    const text = await res.text();

    let body: unknown;
    if (text) {
        try {
            body = JSON.parse(text);
        } catch {
            console.error("customFetch: non-JSON response", {
                url,
                status: res.status,
                contentType: res.headers.get("content-type"),
                text: text.slice(0, 200),
            });
            throw new ApiError(res.status, { message: "Server returned non-JSON response" });
        }
    }

    if (!res.ok) {
        console.error("customFetch:", { status: res.status, body });
        throw new ApiError(res.status, body);
    }

    return body as T;
};

// Orval uses these helper types to type the error in hooks
export type ErrorType<E> = ApiError<E>;
export type BodyType<B> = B;