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

const getGroupNameByID=async (group_id)=>{
    try {
        const res = await axiosApi.post('/group/get_group_name', { group_id });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.error('Error getting group name:', error);
        return false;
    }
}

export { checkIfGroupExists, getGroupNameByID };