import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const AboutUsPage = () => {
    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Team Nosver </h2>
                    <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">We are passionate computer engineering students interested in Web development from Kadir Has University </p>
                </div>
                <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                    <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/D4D03AQFIYexS6A2L9w/profile-displayphoto-shrink_200_200/0/1678907731482?e=2147483647&v=beta&t=26V1tWLcvrioZN_YqCgMtZZmUoRgK9qz8c6olv0eQ00" alt="Bonnie Avatar" />
                        </a>
                        <div class="p-5">
                            <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Kemal Faruk Karaağaçlı
                            </h3>
                            <ul class="flex space-x-4 sm:mt-0">

                                <li>
                                    <a href="https://github.com/Kml159" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tr.linkedin.com/in/kemal-faruk-karaa%C4%9Fa%C3%A7l%C4%B1-407344111" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>


                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/D4D03AQEqzmHmVzW4-A/profile-displayphoto-shrink_200_200/0/1676557375638?e=2147483647&v=beta&t=x3WONlhp1aoOdNYQTcIQ6BCCgU9YxzXpvWqUG6OT6Q8" alt="Jese Avatar" />
                        </a>
                        <div class="p-5">
                            <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Doğukan Gökalp
                            </h3>
                            <ul class="flex space-x-4 sm:mt-0">

                                <li>
                                    <a href="https://github.com/Dogukan0101" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tr.linkedin.com/in/do%C4%9Fukan-g%C3%B6kalp" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://media.licdn.com/dms/image/D4D03AQH4bwtdayKLlw/profile-displayphoto-shrink_200_200/0/1706806922693?e=2147483647&v=beta&t=K5gLh7pi0S4erx2-tfVq4-G-Q3DRxCELrTUoa56uIKA" alt="Michael Avatar" />
                        </a>
                        <div class="p-5">
                            <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Masis Öznigolyan
                            </h3>
                            <ul class="flex space-x-4 sm:mt-0">

                                <li>
                                    <a href="https://github.com/MasisOznigolyan" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/masis-%C3%B6znigolyan-a8a432263/" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img style={{ width: '200px', height: '200px' }} class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src='https://media.licdn.com/dms/image/D4D03AQEB2uxeUexPEA/profile-displayphoto-shrink_400_400/0/1690285973970?e=1717632000&v=beta&t=WMhrSPYmlrMvdVczlFhxpWDfgfmGzeDntd-_L4XPzA4' alt="Guney Avatar" />
                        </a>
                        <div class="p-5">
                            <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Güney Fırat Elhakan
                            </h3>
                            <ul class="flex space-x-4 sm:mt-0">

                                <li>
                                    <a href="https://github.com/gnyfrt" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://tr.linkedin.com/in/g%C3%BCney-f%C4%B1rat-elhakan" target="_blank" className="text-gray-500 hover:text-black dark:hover:text-white">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </li>
                                <li>

                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
