import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

import university from './global-store/university'
import filter from './global-store/filter'
import globalStore from './global-store'

import codes from "./activiation-codes/codes.js"
import packages from "./activiation-codes/packages.js"
import invoices from "./invoices"
import home from "./home" 


import faculties from './content-management/faculties'
import subjects from './content-management/subjects'
import interviews from './content-management/interviews'
import cources from './content-management/cources'
import natification from "./content-management/notifications"
import feedbacks from "./content-management/contact"
import banks from './content-management/banks'
import questions from './content-management/questions'
import advertising from './content-management/advertising'
import telescope from './content-management/telescope'

import accounts from './accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    home,

    accounts,

    codes,
    packages,
    invoices,
    
    feedbacks,
    natification,
    faculties,
    subjects,
    interviews,
    cources,
    banks,
    questions,
    advertising,
    telescope,
    
    filter,
    globalStore,
    university,
  },
  strict: process.env.DEV,
})
