import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import { handleErrors } from './Error.Handling';
import variables from '../data/env';

const path = variables.SERVER_URL + "/api/notifications";
let notificationList = [];

class NotificationService {
    
    async getNotifications() {
        notificationList = [];
        await axios.get(path)
            .then((response) => {
                response.data.forEach(doc => {
                    notificationList.push(doc);
                });
            })
            .catch(handleErrors);
        return notificationList;
    }

    async getNotificationsByDistrict(district) {
        notificationList = [];
        await axios.get(`${path}/district/${district}`)
            .then((response) => {
                response.data.forEach(doc => {
                    notificationList.push(doc);
                });
            })
            .catch(handleErrors);
        return notificationList;
    }

    async getNotification(id) {
        let notification = null;
        await axios.get(`${path}/${id}`)
            .then((response) => {
                notification = response.data;
            })
            .catch(handleErrors);
        return notification;
    }

    async addNotification(notification) {
        await axios.post(path, notification)
            .then((response) => {
                if (response.data) {
                    EventEmitter.emit("notificationAdded", { added: true });
                } else {
                    alert("Error occurred. Please check your input.");
                }
            })
            .catch(handleErrors);
    }

    async updateNotification(id, notification) {
        await axios.put(`${path}/${id}`, notification)
            .then((response) => {})
            .catch(handleErrors);
    }

    async deleteNotification(id) {
        await axios.delete(`${path}/${id}`)
            .then((response) => {})
            .catch(handleErrors);
    }
}

export default new NotificationService();
