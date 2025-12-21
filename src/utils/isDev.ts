export function isDev(): boolean {
    // @ts-ignore
	return import.meta.env.DEV;
}

