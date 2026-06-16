const apiPath ={ 
    aiTools : {
        getAllAiTools :"/ai-tools/getAllAiTools",
        addAiTools :"/ai-tools/addAiTools",
        deleteAiTools: (id)=> `/ai-tools/${id}/deleteAiTools`
    }
}

export default apiPath