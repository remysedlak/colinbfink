import Socials from '../components/Socials';
import AboutMe from '../components/AboutMe';
import Portrait from '../components/Portrait';
import SlideShow from '../components/SlideShow';

function Home() {
    return (
        <div className="p-4 flex lg:flex-row flex-col justify-around">
            <div className="flex flex-col max-w-2xl items-center">
                <Portrait />
                <Socials />
            </div>
            <div className="flex flex-col max-w-2xl items-center">
                <AboutMe />
                <SlideShow  />
            </div>
        </div>
    )
}
export default Home;