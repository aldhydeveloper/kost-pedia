'use client'
import Popular from '@/components/Search/popular';
import WrapCity from './wrap';
import HeaderCity from './HeaderCity';
import { CityProvider, useCity } from './CityContext';

const DefaultSearchComponent = () => {
    return  <CityProvider>
        <div className="px-5">
            <HeaderCity />
                <p className="mt-6 mb-3 opacity-60">Kampus Populer</p>
                <div className="grid lg:grid-cols-5 grid-cols-3 gap-4 pb-1"><Popular /></div>
            <WrapCity />
        </div>
    </CityProvider>
}

export default DefaultSearchComponent;