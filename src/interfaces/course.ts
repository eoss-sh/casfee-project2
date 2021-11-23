export interface hole {
    data: {
        dist1: string,
        dist2: string,
        dist3: string,
        dist4: string,
        par: string,
        hcp: string,
    },
    no: string,
}

export default interface singelCourse {
    course : {
        name: string,
        shortDesc: string,
        uid: string, 
        desc: string, 
        type: string, 
        url: string,
        error: string,
        holes?: hole[]

    }
}