type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
};

async function fetchAPI<T = any>(url: string, options?: FetchOptions): Promise<T> {
    const { method = 'GET', headers = {}, body } = options || {};

    const fetchOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) fetchOptions.body = JSON.stringify(body);

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Fetch failed: ${(error as Error).message}`);
    }
}

export default fetchAPI;
