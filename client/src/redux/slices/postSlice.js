import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (filters, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (filters?.type) queryParams.append('type', filters.type);
            if (filters?.skill) queryParams.append('skill', filters.skill);
            
            const response = await api.get(`/posts?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Fetch failed');
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await api.post('/posts', postData);
            return response.data.post; 
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Creation failed');
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        clearPostsStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                // Prepend new post to feed
                state.items.unshift(action.payload);
            });
    }
});

export const { clearPostsStatus } = postSlice.actions;
export default postSlice.reducer;
