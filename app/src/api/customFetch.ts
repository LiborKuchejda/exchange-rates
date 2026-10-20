export class ApiError<T extends { message?: string } = { message?: string }> extends Error {
    constructor(
        public readonly status: number,
        public readonly body?: T,
    ) {
        super(`HTTP ${status}: ${body?.message ?? "Networking problem"}`);
        this.name = "ApiError";
    }
}

export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    const res = await fetch(url, options);

    const text = await res.text();
    const body = text ? JSON.parse(text) : undefined;
    
    if (!res.ok) {
        console.error("customFetch:", {status: res.status, text});
        throw new ApiError(res.status, body);
    }

    return body as T;
};

// Orval uses these helper types to type the error in hooks
export type ErrorType<E> = ApiError<E>;
export type BodyType<B> = B;