import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRaiting';

export const Comment = ({comment}) => {
    return (

        <article class="border border-gray-200 rounded-lg mb-2" >
            <div class="flex items-center mb-4">

                <FontAwesomeIcon icon={faUser} className="w-10 h-10 mt-2 me-4 rounded-full" />
                <div class="font-medium dark:text-white">
                    <p>{comment.ownerName} </p>
                </div>
            </div>
            <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <StarRating rating={comment.rating} />
                <h3 class="ms-2 text-sm font-semibold text-gray-900 dark:text-white">{comment.heading}</h3>
            </div>
            <footer class="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>{comment.time} </p></footer>
            <p class="mb-2 text-gray-500 dark:text-gray-400">{comment.content}</p>

        </article>
    )
}

export default Comment;