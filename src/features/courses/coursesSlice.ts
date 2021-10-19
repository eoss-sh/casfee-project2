import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {database, storage} from '../../config/firebase'

interface course {
    name: string
}

interface coursesState {
    courses: course[],
    loading: boolean,
}

const initialState: coursesState = {
    courses: [],
    loading: false,
}

export const fetchCoursesList = createAsyncThunk(
    "courses/fetchListOfCourses",
    async () => {
        const coursesCollection: course[] = []
        const snapshot = await database.collection('courses').get()
        snapshot.forEach((doc) => {
            coursesCollection.push(doc.data().name)
        })
        return coursesCollection;
    }

)


const coursesReducer = createSlice({
    name: 'courses',
    initialState: initialState,
    reducers: {
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoursesList.fulfilled, (state: coursesState, action) => {
            state.courses = action.payload
                })
            .addCase(fetchCoursesList.rejected, (state: coursesState) => {
                state = {
                    courses: [],
                    loading: true
                }
            })
    }
})

export default coursesReducer.reducer;