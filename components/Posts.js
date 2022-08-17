import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebase";
import Post from './Post';




function Posts(params) {
    const [post, setPosts] = useState([]);

    useEffect(() =>
        onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
            setPosts(snapshot.docs);
        }), [db]);

    return(
        <div>
            {post.map((post) => (
                <Post key={post.id} 
                id={post.id}
                username={post.data().username}
                image={post.data().image}
                caption={post.data().caption}
                
                />

            ))}
        </div>
    );
}
export default Posts;