import image from '../img/Hot-Chocolate.jpg'

const Hero = ({
    title = 'Take your coffee',
    subtitle = 'Give the order online and take without any delay ',
  }) => {
    return (
      <section className='bg-custom-coffe-brown py-20 flex flex-row'>

        <div className='w-8/12 flex flex-col'>
          <div className='text-center flex flex-col h-full justify-center'>
            <h1 className='text-5xl font-extrabold text-white sm:text-5xl md:text-6xl'>{title}</h1>
            <p className='my-4 text-xl text-white'>{subtitle}</p>
          </div>
        </div>
        <div className='flex flex-col justify-start w-4/12'>
            <img className='rounded-full mb-4 mx-2' src={image} width={220}></img>
        </div>

      </section>
    );
  };
  export default Hero;