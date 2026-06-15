const apiPath ={ 
    aiTools : {
        getAllAiTools :"/getAllAiTools",
        addAiTools :"/addAiTools",
        deleteAiTools: (id)=> `/deleteAiTools/${id}`
    }
}

export default apiPath