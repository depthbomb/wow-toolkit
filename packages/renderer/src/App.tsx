import { lazy } from 'react';
import { Shell } from './components/Shell';
import { useAccentColor } from './hooks/useAccentColor';
import { Route, Routes, MemoryRouter } from 'react-router';

// Service components
import { WowTokenService } from './features/wow-token/components/WowTokenService';
import { BeledarService } from './features/beledar/components/BeledarService';
import { RealmStatusService } from './features/realm-status/components/RealmStatusService';

// Pages
import { WowTokenPage } from './features/wow-token/WowTokenPage';

const BeledarPage = lazy(() => import('./features/beledar/BeledarPage'));
const DmfPage = lazy(() => import('./features/dmf/DmfPage'));
const ResetsPage = lazy(() => import('./features/resets/ResetsPage'));
const RealmStatusPage = lazy(() => import('./features/realm-status/RealmStatusPage'));
const TradingPostPage = lazy(() => import('./features/trading-post/TradingPostPage'));
const TimeRiftPage = lazy(() => import('./features/time-rift/TimeRiftPage'));

export const App = () => {
	useAccentColor();

	return (
		<MemoryRouter>
			<Shell>
				<WowTokenService/>
				<BeledarService/>
				<RealmStatusService/>
				<Routes>
					<Route index element={<WowTokenPage/>}/>
					<Route path="/beledar" element={<BeledarPage/>}/>
					<Route path="/dmf" element={<DmfPage/>}/>
					<Route path="/resets" element={<ResetsPage/>}/>
					<Route path="/realm-status" element={<RealmStatusPage/>}/>
					<Route path="/trading-post" element={<TradingPostPage/>}/>
					<Route path="/time-rift" element={<TimeRiftPage/>}/>
					<Route path="*" element={<WowTokenPage/>}/>
				</Routes>
			</Shell>
		</MemoryRouter>
	);
};
