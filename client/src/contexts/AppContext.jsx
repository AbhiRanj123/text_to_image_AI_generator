import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(false); // to check the state of the user whether logged in or not

    const [isSticky,setIsSticky] = useState(false); // to check the state of the navbar whether sticky or not

    const navigate = useNavigate();

    const[image,setImage] = useState(assets.sample_img_1);

    const [isImageLoaded,setIsImageLoaded]  = useState(false); // to check the state of the image whether loaded or not

    const [isLoading,setIsLoading] = useState(true); // to check the state of the image whether loading or not

    const [input,setInput] = useState(''); // to check the state of the input whether empty or not

    const[isSignedUp,setIsSignedUp] = useState(true); // to check the state of the user whether signed up or not   

    const [showLoginModal, setShowLoginModal] = useState(false); // to check the state of the login modal whether open or not

    useEffect(()=>{
        const handleScroll = () => {
            if(window.scrollY > 0){
                setIsSticky(true);
            }else{
                setIsSticky(false);
            }
        }
        window.addEventListener('scroll',handleScroll);
        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[])

    const value = {
        user,
        setUser,
        isSticky,
        setIsSticky,
        navigate,
        image,
        setImage,
        isImageLoaded,
        setIsImageLoaded,
        isLoading,
        setIsLoading,
        input,
        setInput,
        isSignedUp,
        setIsSignedUp,
        showLoginModal,
        setShowLoginModal,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;