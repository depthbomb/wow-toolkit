import { Store } from './store';
import { StoreReader } from './storeReader';
import { StoreWriter } from './storeWriter';

export class StoreFactory {
	public createStore<Store extends Record<string, any>>(path: string) {
		return new Store<Store>(
			new StoreReader(),
			new StoreWriter(),
			path
		);
	}
}
