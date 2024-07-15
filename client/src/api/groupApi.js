import axiosApi from '../utils/AxiosConfig';

const checkIfGroupExists = async (group_id) => {
    try {
        const res = await axiosApi.post('/group/check_group', { group_id });
        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Error checking if group exists:', error);
        return false;
    }
}

export { checkIfGroupExists };