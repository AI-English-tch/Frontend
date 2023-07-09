import { defineStore } from "pinia"

const sideBarStore = defineStore('sideBar',{
    state: () => {
        return {
            currentSelectedSideBarItem:null
        }
    },
    actions:{
        handleChangeSide(value){
            this.currentSelectedSideBarItem = value
        },
    },
})

export default sideBarStore
