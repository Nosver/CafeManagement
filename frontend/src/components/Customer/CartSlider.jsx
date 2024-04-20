import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';






export const CartSlider = () => {

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Espresso',
      size: 'Small',
      price: '12.00',
      quantity: 2,
      imageSrc: 'https://example.com/espresso.jpg',
    },
    {
      id: 2,
      name: 'Cappuccino',
      size: 'Medium',
      price: '15.00',
      quantity: 1,
      imageSrc: 'https://example.com/cappuccino.jpg',
    },
    {
      id: 3,
      name: 'Latte',
      size: 'Medium',
      price: '18.00',
      quantity: 3,
      imageSrc: 'https://example.com/latte.jpg',
    },
    {
      id: 4,
      name: 'Mocha',
      size: 'Large',
      price: '20.00',
      quantity: 1,
      imageSrc: 'https://example.com/mocha.jpg',
    },
    {
      id: 5,
      name: 'Tea',
      size: 'Small',
      price: '10.00',
      quantity: 1,
      imageSrc: 'https://example.com/tea.jpg',
    }
    // Daha fazla ürün eklenebilir.
  ]);

  function removeItem(item) {
    const updatedProducts = cartItems.map(p => {
      if (p.id === item.id) {
        //api delete call
        return null; 
      }
      return p;    
    }).filter(Boolean);
    setCartItems(updatedProducts);
  }

  const [open, setOpen] = useState(true);

  const totalPrice = cartItems.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden bg-gray-100/30">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.length > 0 ? cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.href}>{item.name}</a>
                                      </h3>
                                      <p className="ml-4" dangerouslySetInnerHTML={{ __html: item.price + ' x ' + item.quantity + '&nbsp;&nbsp;&nbsp;' + ((parseFloat(item.price) * parseFloat(item.quantity))).toFixed(2).toString() + ' ₺' }}>
                                      </p>                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Quantity {item.quantity}</p>

                                    <div className="flex">
                                      <button onClick={() => removeItem(item)}
                                        type="button"
                                        className="font-medium text-custom-brown hover:text-black"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )) : <p>no items in the cart</p>}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>{totalPrice} ₺</p>
                      </div>
                      <div className="mt-6">
                        <NavLink
                          to="/cart"
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-custom-coffe-brown px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-950"
                        >
                          Checkout
                        </NavLink>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-custom-coffe-brown hover:text-custom-light-brown"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};
export default CartSlider;
