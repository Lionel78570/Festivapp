import { collection, Firestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { onSnapshot,  orderBy, query, serverTimestamp } from 'firebase/firestore';
import { SearchIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon,UserGroupIcon,HeartIcon, ChatIcon, StarIcon } from '@heroicons/react/outline';
import { HomeIcon, DotsHorizontalIcon, HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import Moment from 'react-moment';
import { useAuth } from '../context/AuthContext';

function Post({ id, username, userImg, image, caption}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const {user} = useAuth();

    useEffect (()=>onSnapshot
    (query(collection(db, "posts", id, "likes"), 
    orderBy("timestamp","desc")), 
    (snapshot) => setLikes(snapshot.docs)), 
    [db, id]
    );

    useEffect (()=>
        setHasLiked(
            likes.findIndex((like) => like.id === id)!== -1
        ),
     [likes]
     );

    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes"), id);
        } else {
            await setDoc(doc(db, "posts", id, "likes", id), {
                username,
            })
        }
    };


    useEffect (
        () => 
        onSnapshot
        (query(collection(db, "posts", id, "comments"), 
        orderBy("timestamp","desc")),
        (snapshot) => setComments(snapshot.docs)
        ), [db, id]
    );


    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: username,
            timestamp: serverTimestamp(),
        });
    };

    return(
        <div className='bg-yellow-50 border-gray-200 border my-7 border-rounded-sm rounded-xl'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
                alt="profile" className="w-12 h-12 rounded-full mr-3 object-contain border p-1"/>
                <p className='flex-1 font-bold'>{username}</p>
            </div>
            
            {/* img */}
            <img src={image} alt="post" className="object-cover w-full"/>
            
            {/* buttons */}
            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {
                        hasLiked?(
                            
                            <HeartIcon onClick={likePost} className="btn" />
   
                            ) : (
                                
                                <HeartIconFilled onClick={likePost} className="btn text-blue-900" />
                        )
                    }
                </div>
            </div>
            
            {/* captions */}

            <div>
                <p className='p-5 truncate'>
                     {likes.length > 0 &&(
                        <p className='font-bold'>{likes.length} likes</p>
                     )}
                    <span className='font-bold mr-1'>{username}</span> {caption}
                </p>
            </div>
            
            {/* comments */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin' >
                    {comments.map(comment => (
                        <div
                        className='flex items-center space-x-2 mb-3' 
                        key={comment.id} >
                            <img
                            className='h-7 rounded-full' 
                            src={comment.data().image} alt=''/>    
                            <p>
                                <span className='font-bold'>{comment.data().username}</span>{" "}
                                {comment.data().comment}
                            </p>

                            <Moment fromNow>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}


            {/* input box */}
            <form className='flex items-center p-5'>
                <input 
                type="text" 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className=" flex-1 bg-gray-50 block w-full pl-10 sm:text-sm outline-none 
                border-blue-50 focus:ring-blue-900 focus:border-blue-900 rounded-md mr-4" 
                placeholder="Add a comment..."/>
                <button 
                type="submit" 
                onClick={sendComment}
                disabled={!comment.trim()} 
                className="font-semibold text-blue-900">Post</button>
            </form>

        </div>
    );
}
export default Post;