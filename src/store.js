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
        },
        login({ commit }) {
            localStorage.setItem('token', 'your-token-value');
            commit('setAuthentication', true);
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            commit('setAuthentication', false);
        }
    }
});

export default store;