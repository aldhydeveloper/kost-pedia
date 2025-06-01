'use client'
import Popular from '@/components/Search/popular';
import WrapCity from './wrap';
import { CityProvider } from './CityContext';
import District from '../District';

const DefaultSearchComponent = () => {
    return  <CityProvider>
        <WrapCity />
        <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
        <div className="grid grid-cols-5 gap-4 pb-1"><Popular /></div>
        <District />
    </CityProvider>
}

export default DefaultSearchComponent;