import api from "@api";
export default {
    state: {
        notificationList: [],
        notificationDto: {
            id: "",
            title: "",
            body: "",
            date: new Date(),
            notificationType: 0,
            userIds: []
        },
        notificationFilterDto: {
            faculityId: 0,
            cityId: 0
        }
    },
    getters: {
        filterdUserListForNotification(state, getter, glState) {
            return glState.accounts.usersList.filter((user) => {
                if(
                    (user.facultyId == state.notificationFilterDto.faculityId || state.notificationFilterDto.faculityId == 0) &&
                    (user.cityId == state.notificationFilterDto.cityId || state.notificationFilterDto.cityId == 0)
                ) {
                    return true
                }
            })
        }
    },
    mutations: {
        Get_Notification(state, payload) {
            state.notificationList = payload;
        },
        Upload_Notification_Create(state, payload) {
            state.notificationList.unshift(payload);
        },
        Reset_Notification_Dto(state) {
            Object.assign(state.notificationDto, {
                id: "",
                title: "",
                body: "",
                date: new Date(),
                notificationType: 0,
                userIds: []
            });
        },
        Delete_Notification(state, payload) {
            state.notificationList.splice(
                state.notificationList.findIndex(item => item.id == payload), 1)
        }
    },
    actions: {
        newNotification({ commit }, payload) {
            api.post("Notification/Add", payload, ({ data }) => {
                commit("Upload_Notification_Create", data);
            });
        },
        getNotification({ commit }) {
            api.get("Notification/GetAll", ({ data }) => {
                commit("Get_Notification", data);
            });
        },
        deleteNotification({ commit }, payload) {
            api.delete("Notification/Delete?id=" + payload, ({ data }) => {
                if(data.isSuccess) {
                    commit("Delete_Notification", payload);
                }
            });
        }
    }
};
