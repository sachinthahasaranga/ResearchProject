import axios from 'axios';
import { handleErrors } from './Error.Handling';
import variables from '../data/env';

const baseURL = variables.SERVER_URL + "/api/plans"; // Adjust the base URL to match your backend route

class PlansService {
    async getAllPlans() {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getPlanById(id) {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async createPlan(plan) {
        console.log(plan)
        try {
            const response = await axios.post(baseURL, plan);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async updatePlan(id, plan) {
        try {
            const response = await axios.patch(`${baseURL}/${id}`, plan);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async deletePlan(id) {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getPlansByUser(user) {
        try {
            const response = await axios.get(`${baseURL}/user/${user}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }
}

export default new PlansService();
