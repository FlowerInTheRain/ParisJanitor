import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: !!localStorage.getItem('token'),
        
        provider: null
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        },
        setProvider(state, provider){
            state.provider = provider
        }
    },
    
    actions: {
        updateAuthentication({ commit }, status) {
            commit('setAuthentication', status);
        },
        login({ commit }, token) {
            localStorage.setItem('token', token);
            commit('setAuthentication', true);
        },
        getProvider() {
            return
        },
        updateProvider({ commit }, provider) {
            commit('setProvider', provider);
        },
        logoutProvider({ commit }) {
            commit('setAuthentication', true);
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            commit('setAuthentication', false);
            commit('setProvider', null);
        }
    }
});

export default store;
