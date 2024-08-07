import api from "@api";
import router from "@/router";
export default {
    state: {
        interviewsList: [],
        interviewQuestionList: {
            questions: [],
            dateCreated: "",
            subject: {},
            semesterId: "",
            questionsCount: 0,
            price: 0,
            isFree: false,
            tagIds: [],
            id: "",
            name: "",
            year: 0,
            type: 0,
            subjectId: ""
        },
        interviewsDto: {
            id: "",
            name: "",
            year: 0,
            type: 0,
            subjectId: "",
            price: 0,
            isFree: false,
            tagIds: []
        }
    },
    mutations: {
        Fetch_Interviews(state, payload) {
            state.interviewsList = payload;
        },
        Fetch_Interviews_Details(state, payload) {
            state.interviewQuestionList = payload;
        },
        Reset_Interviews_Dto(state, id) {
            if (!id) {
                Object.assign(state.interviewsDto, {
                    id: "",
                    name: "",
                    year: 0,
                    type: 0,
                    subjectId: "",
                    price: 0,
                    isFree: false,
                    tagIds: []
                });
            } else {
                Object.assign(state.interviewsDto, {
                    id: state.interviewQuestionList.id,
                    name: state.interviewQuestionList.name,
                    year: state.interviewQuestionList.year,
                    type: state.interviewQuestionList.type,
                    price: state.interviewQuestionList.price,
                    isFree: state.interviewQuestionList.isFree,
                    subjectId: state.interviewQuestionList.subjectId,
                    tagIds: state.interviewQuestionList.tagIds
                });
            }
        },
        Add_Interviews(state, payload) {
            state.interviewsList.unshift(payload);
        },
        Update_Interview(state, payload) {
            state.interviewQuestionList.name = payload.name;
            state.interviewQuestionList.year = payload.year;
            state.interviewQuestionList.type = payload.type;
            state.interviewQuestionList.price = payload.price;
            state.interviewQuestionList.isFree = payload.isFree;
            state.interviewQuestionList.subjectId = payload.subjectId;
            state.interviewQuestionList.tagIds = payload.tagIds;
        }
    },
    actions: {
        fetchInterviews({ commit }) {
            api.get("Interview/GetAll", ({ data }) => {
                commit("Fetch_Interviews", data);
            });
        },
        fetchInterviewsDetails({ commit }, id) {
            api.get("Interview/" + id + "/Question/GetAll", ({ data }) => {
                commit("Fetch_Interviews_Details", data[0]);
            });
        },
        addInterview({ commit }, payload) {
            api.post("Interview/Add", payload, ({ data }) => {
                commit("Add_Interviews", data);
            });
        },
        updateInterview({ commit }, payload) {
            api.put("Interview/Update", payload, ({ data }) => {
                commit("Update_Interview", data);
            });
        },
        deleteInterview(ctx, id) {
            api.delete("Interview/Delete/" + id, ({ data }) => {
                if (data.isSuccess) {
                    router.push("/interviews");
                }
            });
        }
    }
};
