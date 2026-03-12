import { ErrorResponse } from '../../types';

type Options = Record<string, string>;

class Loader {
    constructor(
        protected baseLink: string,
        protected options: Options
    ) {}

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: (data: T) => void
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach(key => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: (data: T) => void,
        options: Options = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then(res => res.json())
            .then(data => callback(data as T))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;