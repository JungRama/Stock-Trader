const state = {
    stockPortfolio: [],
    funds: 300000,
    test: 0
}

const getters = {
    stockPortfolio (state, getters){
        return state.stockPortfolio.map(portfolio =>{ // mapping the stockportfolio
            // find id that match with our portfolio to get the data information
            const record  = getters.getStocks.find(e => e.id == portfolio.id) // getStock from stocks.js, 
            // return the data
            return {
                id: portfolio.id,
                quantity: portfolio.quantity,
                // get the inormation from record
                name: record.name, 
                price: record.price
            } 
        })
    },
    getFunds(state){
        return state.funds
    }
}

const mutations = {
    BUY_PORTFOLIO: (state, payload) =>{
        // return stockportfolio that match request id
        const record = state.stockPortfolio.find(e => e.id == payload.id) // auto return id
        // if we already have stock in our portfolio add the quantity
        if(record){
            record.quantity += payload.quantity
        }
        // else push new stock to portfolio
        else{
            state.stockPortfolio.push({
                id: payload.id,
                quantity: payload.quantity
            })
        }
        // state.funds in store.js
        state.funds -= payload.price * payload.quantity // minus the fund 
    },
    SELL_PORTFOLIO: (state, payload) => {
        // return stockportfolio that match request id
        const record = state.stockPortfolio.find(e => e.id == payload.id) // auto return 
        // if stock-portfolio quantity > quantity that will sell
        if(record.quantity > payload.quantity){
            record.quantity -= payload.quantity
        }
        // else remove stockportfolio by id
        else{
            record.quantity -= payload.quantity
            state.stockPortfolio.splice(payload.index, 1)
        }
        // state.funds in store.js
        state.funds += payload.price * payload.quantity // minus the fund 
    },
    SET_FUNDS: (state, payload) => {
        state.funds = payload
    },
    SET_STOCK_PORTFOLIO: (state, payload) => {
        state.stockPortfolio = payload
    }
}

const actions = {
    buyPortfolio: ({commit}, payload) => {
        commit('BUY_PORTFOLIO', payload)
    },
    sellPortfolio: ({commit}, payload) => {
        commit('SELL_PORTFOLIO', payload)
    },
    LoadData: ({commit}, payload) =>{
        commit('SET_FUNDS', payload.funds)
        commit('SET_STOCK_PORTFOLIO', payload.stockPortfolio)
        commit('SET_STOCKS', payload.stocks)
    }
}

export default{
    state, getters, mutations, actions
}