import axios from 'axios';
import { handleErrors } from './Error.Handling';
import variables from '../data/env';

const baseURL = variables.SERVER_URL + "/api/personal-infos"; 

class PersonalInfoService {
    async getAllPersonalInfo() {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getPersonalInfoById(id) {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async createPersonalInfo(personalInfo) {
        try {
            const response = await axios.post(baseURL, personalInfo);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async updatePersonalInfo(id, personalInfo) {
        try {
            const response = await axios.put(`${baseURL}/${id}`, personalInfo);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async deletePersonalInfo(id) {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getLatestPersonalInfoByUsername(username) {
        try {
            const response = await axios.get(`${baseURL}/latest/${username}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }
}

export default new PersonalInfoService();
