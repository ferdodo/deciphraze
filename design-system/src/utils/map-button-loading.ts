import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function mapButtonLoading() {
	return (
		source: Observable<[number | null, boolean]>
	) =>
		source.pipe(
			map(
				([ progress, indeterminateProgress ]: [number | null, boolean]) => {
					if (indeterminateProgress) {
						return 100;
					}

					return progress || 0;
				}
			)
		);
}
