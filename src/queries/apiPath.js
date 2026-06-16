const apiPath ={ 
    aiTools : {
        getAllAiTools :"/ai-tools/getAllAiTools",
        addAiTools :"/ai-tools/addAiTools",
        deleteAiTools: (id)=> `/ai-tools/deleteAiTools/${id}`
    }
}

export default apiPath