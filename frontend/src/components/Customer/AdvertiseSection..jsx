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
            title="Morning Bliss Combo"
            description="Enjoy a freshly brewed coffee and a delicious croissant at a special discount! Treat yourself to this delightful combo."
            />
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 3.jpeg"}
            title="Sunshine Sip Special"
            description="Enjoy a refreshing lemonade at a special discount! Brighten your day with this zesty treat."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image = {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 4.jpeg"}
            title="Cocoa Croissant Craze"
            description="Dive into decadence with our chocolate croissant at a special discount! Indulge in buttery layers and rich chocolate."
            />
            <AdvertiseBox
            image = {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 2.jpeg"}
            title="Velvet Vanilla Delight"
            description="Enjoy a rich and creamy vanilla latte at a special discount! Indulge in this smooth, aromatic treat."
            />
        </section>

        <section className = 'flex flex-row w-full items-center justify-center'>
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 5.jpeg"}
            title="Turkish Delight Deal"
            description="Enjoy a rich, authentic Turkish coffee at a special discount! Elevate your coffee experience."
            />
            <AdvertiseBox
            image= {"https://publiccafein.blob.core.windows.net/publiccafein/Ads 6.jpeg"}
            title="Basque Bliss Special"
            description="Indulge in our exquisite San Sebastian cake at a special discount! Treat yourself to this creamy, caramelized delight."
            />
        </section>

    </section>
    
  )
}

export default AdvertiseSection
