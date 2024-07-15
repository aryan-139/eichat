import axiosApi from '../utils/AxiosConfig';

const checkIfUserExists = async (user_id) => {
    try {
        const res = await axiosApi.post('/user/login', { user_id });
        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return false;
    }
}
export { checkIfUserExists };