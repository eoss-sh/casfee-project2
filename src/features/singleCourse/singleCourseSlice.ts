import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import singelCourse from '../../interfaces/course'
//[ToDo]: Rename the Functino
import { getAdditionalUserInfo } from '../auth/authApi';


const initialState: singelCourse = {
  course: {
    name: '',
    shortDesc: '',
    desc: '',
    uid: '',
    url: '',
    type: '',
    error: '',
  }
};

// Func to fetch Single Course from Firestore
export const fetchCourse = createAsyncThunk(
  'course/fetchSingleCourse',
  async (uid: string) => {
    const result = await getAdditionalUserInfo('courses', uid)
    return result.data();
  }
);

const courseReducer = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.fulfilled, (state: singelCourse, action) => {
        console.log('before')
        console.log(action.payload?.shortDesc)
        console.log('after')
        state.course = {
          name: action.payload?.name,
          shortDesc: action.payload?.shortDesc,
          desc: action.payload?.desc,
          url: action.payload?.url,
          type: action.payload?.type,
          uid: action.payload?.uid,
          error: '',
        };
      })
      .addCase(fetchCourse.rejected, (state: singelCourse) => {
        state.course = {
          name: '',
          shortDesc: '',
          desc: '',
          url: '',
          type: '',
          uid: '',
          error: 'Could not fetch Course',
        };
      })
      .addCase(fetchCourse.pending, (state: singelCourse) => {
        state.course = {
          name: '',
          shortDesc: '',
          desc: '',
          url: '',
          type: '',
          uid: '',
          error: 'Still pending',
        };
      });
  },
});

export default courseReducer.reducer;
