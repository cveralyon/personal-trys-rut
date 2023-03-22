export const strict = false

// state
export const state = () => ({
  ref: null,

})

// getters
export const getters = {
  getRef(state){
    return state.ref
  }

}

// mutations
export const mutations = {
  SET_REF(state, ref) {
    state.ref = ref
  },

}

// actions
export const actions = {
  setRef(context, ref) {
    context.commit('SET_REF', ref)
  }

}
