import Posts from './Posts';
import MiniProfile from './MiniProfile';


function Feed() {

    return(
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 max-w-6xl mx-auto">
            {/* Sections */}
            <section className="col-span-2">
                <Posts />
            </section>
            
            {/* MiniProfile */}
            <section className='hidden xl:inline-grid md:col-span-1'>
                <div>
                    <MiniProfile />
                </div>
            </section>
                
        </main>
    );
}
export default Feed;