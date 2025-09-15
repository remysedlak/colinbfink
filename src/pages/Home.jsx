import Socials from '../components/Socials';
import AboutMe from '../components/AboutMe';
import Portrait from '../components/Portrait';
import SlideShow from '../components/SlideShow';

function Home() {
    return (
        <div className="p-4 flex flex-col lg:flex-row justify-around items-stretch w-full overflow-x-hidden">
            <div className="flex flex-col max-w-2xl w-full items-center">
                <Portrait />
                <Socials />
            </div>
            <hr className="hidden lg:block border-l-2 border-gray-300 mx-8" />
            <div className="flex flex-col max-w-2xl w-full items-center">
                <AboutMe />
                <SlideShow />
            </div>
        </div>
    )
}
export default Home;