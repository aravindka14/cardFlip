const apiPath ={ 
    aiTools : {
        getAllAiTools :"/ai-tools/getAllAiTools",
        addAiTools :"/ai-tools/addAiTools",
        deleteAiTools: (id)=> `/ai-tools/${id}/deleteAiTools`
    },
    profile: {
        getProfile: "/profile/getProfile",
        addProfile: "/profile/addProfile",
    }
}

export default apiPath