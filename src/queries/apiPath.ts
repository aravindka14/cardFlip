const apiPath ={ 
    aiTools : {
        getAllAiTools :"/ai-tools/getAllAiTools",
        addAiTools :"/ai-tools/addAiTools",
        deleteAiTools: (id: number)=> `/ai-tools/${id}/deleteAiTools`
    },
    profile: {
        getProfile: "/profile/getProfile",
        addProfile: "/profile/addProfile",
        updateProfile: "/profile/updateProfile",
    }
}

export default apiPath