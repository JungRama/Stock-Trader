const stockData = [
    {id : 1, name: 'Mandiri', price: 30000},
    {id : 2, name: 'Sampoerna', price: 25000},
    {id : 3, name: 'Torabika', price: 40000},
    {id : 4, name: 'Waterboom', price: 25000}
]

const state = {
    stocks: []
}

const getters = {
    getStocks: state =>{
        return state.stocks
    }
}

const mutations = {
    SET_STOCKS:(state, stocks)=>{
        state.stocks = stocks
    },
    RANDOM_PRICE: (state) =>{
        state.stocks.forEach(stock => {
            stock.price = stock.price * (1 + Math.random() - 0.5)
        });
    }
}

const actions = {
    initStocks: ({commit})=>{
        commit('SET_STOCKS', stockData)
    },
    randomPrice: ({commit}) =>{
        commit('RANDOM_PRICE')
    }
}

export default{
    state, getters, mutations, actions
}