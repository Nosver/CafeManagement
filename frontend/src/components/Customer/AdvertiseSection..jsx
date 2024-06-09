import React from 'react'
import image from '../../img/Advertise.jpeg'
import image2 from '../../img/Advertise2.jpeg'
import AdvertiseBox from './AdvertiseBox'


const AdvertiseSection = () => {
  return (

    <section className = 'flex flex-col mb-4 w-full items-center justify-center'>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 1.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 3.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image = {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 4.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image = {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 2.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 5.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 6.jpeg"}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

    </section>
    
  )
}

export default AdvertiseSection
