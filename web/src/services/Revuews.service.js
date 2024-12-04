import axios from 'axios';
import { handleErrors } from './Error.Handling';
import variables from '../data/env';

const baseURL = variables.SERVER_URL + "/api/reviews"; 

class ReviewService {
    async getAllReviews() {
        try {
            const response = await axios.get(baseURL);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getReviewById(id) {
        try {
            const response = await axios.get(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async createReview(review) {
        console.log(review)
        try {
            const response = await axios.post(baseURL, review);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async updateReview(id, review) {
        try {
            const response = await axios.put(`${baseURL}/${id}`, review);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async deleteReview(id) {
        try {
            const response = await axios.delete(`${baseURL}/${id}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getReviewsByUsername(username) {
        try {
            const response = await axios.get(`${baseURL}/user/${username}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getReviewsByActivity(activity) {
        try {
            const response = await axios.get(`${baseURL}/activity/${activity}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getReviewsBySubject(subject) {
        try {
            const response = await axios.get(`${baseURL}/subject/${subject}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    // /search/:subject/byActivity/:activity/byUser/:username

    async getReviewsSearch(subject, activity, username) {
        try {
            const response = await axios.get(`${baseURL}/search/${subject}/byActivity/${activity}/byUser/${username}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }

    async getReviewsByUsernameSubject(subject, username) {
        try {
            const response = await axios.get(`${baseURL}/subject/${subject}/byUser/${username}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }
}

export default new ReviewService();
