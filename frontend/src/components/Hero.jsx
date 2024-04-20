import image from '../img/Hot-Chocolate.jpg'

const Hero = ({
    title = 'Take your coffe',
    subtitle = 'Give the order online and take without any delay ',
  }) => {
    return (
      <section className='bg-custom-coffe-brown py-20 flex flex-row'>

        <div className='max-w-7xl ml-40 mr-10 px-4 sm:px-6 lg:px-8 flex flex-col'>
          <div className='text-center flex flex-col h-full justify-center'>
            <h1 className='text-5xl font-extrabold text-white sm:text-5xl md:text-6xl'>{title}</h1>
            <p className='my-4 text-xl text-white'>{subtitle}</p>
          </div>
        </div>
        <div className='max-w-7xl mx-5 px-4 sm:px-6 lg:px-8 flex justify-center'>
            <img className='rounded-full mb-4 mx-2' src={image} width={220}></img>
        </div>

      </section>
    );
  };
  export default Hero;