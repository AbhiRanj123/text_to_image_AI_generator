import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(false); // to check the state of the user whether logged in or not

    const [isSticky,setIsSticky] = useState(false); // to check the state of the navbar whether sticky or not

    const navigate = useNavigate();

    const[image,setImage] = useState(assets.sample_img_1);

    const [isImageLoaded,setIsImageLoaded]  = useState(false); // to check the state of the image whether loaded or not

    const [isLoading,setIsLoading] = useState(false); // to check the state of the image whether loading or not

    const [input,setInput] = useState(''); // to check the state of the input whether empty or not

    const[isSignedUp,setIsSignedUp] = useState(true); // to check the state of the user whether signed up or not   

    const [showLoginModal, setShowLoginModal] = useState(false); // to check the state of the login modal whether open or not

    const [token, setToken] = useState(localStorage.getItem('token')); // to check the state of the token whether present or not

    const [credit, setCredit] = useState(false); // to check the state of the credit whether present or not   

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

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const creditData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', {
                headers: { token }
            });

            console.log('Credit API response:', data); // Optional for debug

            if (data.success) {
                setCredit(data.credits); // ✅ correct field
                setUser(data.user);
            } else {
                toast.error(data.message || 'Failed to fetch credit data.');
            }
        } catch (err) {
            console.error('Credit fetch error:', err);
            toast.error(err.message);
        }
    }

    const generateImage = async (prompt) =>{
        try{
            const { data } = await axios.post(backendUrl + '/api/image/generate-image', {prompt},{headers: {token}});
            if(data.success){
                creditData(); // Update credit data after image generation
                return data.imageUrl; // Return the generated image URL
            }
            else{
                toast.error(data.message || 'Failed to generate image.');
                creditData();
                if(data.credits === 0){
                    navigate('/buy-credit'); // Redirect to buy credit page if credits are insufficient
                }
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    useEffect(() => {
        if(token){
            creditData();
        }
    },[token]);

    const value = {
        user,setUser,
        isSticky,setIsSticky,
        navigate,
        image,setImage,
        isImageLoaded,setIsImageLoaded,
        isLoading,setIsLoading,
        input,setInput,
        isSignedUp,setIsSignedUp,
        showLoginModal,setShowLoginModal,
        backendUrl,
        token, setToken,
        credit, setCredit,
        creditData,
        logout,
        generateImage
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;