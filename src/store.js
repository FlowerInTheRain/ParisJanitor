import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: !!localStorage.getItem('token')
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        }
    },
    actions: {
        updateAuthentication({ commit }, status) {
            commit('setAuthentication', status);
        }
    }
});

export default store;