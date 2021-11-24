export interface hole {
  data: {
    dist1: number;
    dist2: number;
    dist3: number;
    dist4: number;
    par: number;
    hcp: number;
  };
  no: number;
}

export default interface singelCourse {
    course : {
        name: string,
        shortDesc: string,
        uid: string, 
        desc: string, 
        type: string, 
        url: string,
        total_distance1?: number,
        total_distance2?: number,
        total_distance3?: number,
        total_distance4?: number,
        par: number,
        error: string,
        holes?: hole[]

    }
}