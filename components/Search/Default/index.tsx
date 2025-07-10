'use client'
import Popular from '@/components/Search/popular';
import WrapCity from './wrap';
import HeaderCity from './HeaderCity';
import { CityProvider, useCity } from './CityContext';

const DefaultSearchComponent = () => {
    return  <CityProvider>
            <HeaderCity />
        <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
        <div className="grid grid-cols-5 gap-4 pb-1"><Popular /></div>

        <WrapCity />
    </CityProvider>
}

export default DefaultSearchComponent;