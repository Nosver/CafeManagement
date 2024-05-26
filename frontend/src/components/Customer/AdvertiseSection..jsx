import React from 'react'
import image from '../../img/Advertise.jpeg'
import image2 from '../../img/Advertise2.jpeg'
import AdvertiseBox from './AdvertiseBox'


const AdvertiseSection = () => {
  return (

    <section className = 'flex flex-col mb-4 w-full items-center justify-center'>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image= {image2}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image= {image2}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image = {image}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image = {image}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image= {image}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
            <AdvertiseBox
            image= {image2}
            title="Special Offer"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio ut urna volutpat vestibulum."
            />
        </section>

    </section>
    
  )
}

export default AdvertiseSection
