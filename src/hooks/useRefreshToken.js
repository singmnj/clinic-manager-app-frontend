import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', 
        {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { user: response.data.username, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    };

    return refresh;
};

export default useRefreshToken;