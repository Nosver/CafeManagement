import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../components/StarRaiting';


export const TestPage = () => {
    return (<>


        <article>
            <div class="flex items-center mb-4">

            <FontAwesomeIcon icon={faUser} className="w-10 h-10 me-4 rounded-full" />
                <div class="font-medium dark:text-white">
                    <p>Jese Leos </p>
                </div>
            </div>
            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <StarRating rating={3}/>
                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
            </div>
            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><time datetime="2017-03-03 19:00">March 3, 2017</time></footer>
            <p class="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
           
        </article>

    </>

    )
}
