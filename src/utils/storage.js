export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem("loggedInUser"))
    } catch(e){
        return null;
    }
};

const key = (userId, suffix) => `edu:lms:${userId}:${suffix}`;

export const getEnrolled = (userId)=>{
    try {
        return JSON.parse(localStorage.getItem(userId, "enrolled")) ||[]
    } catch(e){
       return [];   
    }
}

export const setEnrolled = (userId, list) =>{
      localStorage.setItem(key(userId,"enrolled"), JSON.stringify(list))
}

export const getProgress = (userId, courseId) =>{
    try {
     return JSON.parse(localStorage.getItem(key(userId,`progress:${courseId}`))) || {
        completedLessonsIds:[],
        lastLessonId:null,
        percent: 0
     }
    } catch (e) {
     return {
        completedLessonsIds:[],
        lastLessonId:null,
        percent: 0
     }
    }
}

export const setProgress = (userId,courseId, data)=>{
    localStorage.setItem(key(userId, `progress:${courseId}`), JSON.stringify(data))
}

export const getNotes = (userId, courseId, lessonId)=>{
    try {
         return localStorage.getItem(key(userId, `notes:${courseId}:${lessonId}`))
    } catch (e) {
        return "";
    }
}

export const setNotes =(userId, courseId, lessonId, text)=>{
    localStorage.setItem(key(userId,`notes:${courseId}:${lessonId}`), JSON.stringify(text))
} 