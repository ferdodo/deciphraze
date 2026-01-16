import type { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function mapButtonDisabled() {
	return (source: Observable<[boolean, boolean, number]>) =>
		source.pipe(
			map(([disabled, activeIndeterminateProgress, loading]) => {
				return (
					disabled ||
					activeIndeterminateProgress ||
					(loading > 0 && loading < 100)
				);
			})
		);
}
