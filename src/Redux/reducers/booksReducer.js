import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    books: null,
    loading: false,
    error: null,
};

// Async thunk to fetch data from API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    try {
        const response = await axios.get('https://d1krvzwx5oquy1.cloudfront.net/books.json');
        return response.data;
    } catch (error) {
        // If there's an error fetching data, it will be captured here
        throw Error('Failed to fetch books');
    }
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const booksReducer = booksSlice.reducer;

export const booksSelector=(state)=>state.booksReducer.books
export const loadingSelector=(state)=>state.booksReducer.loading
export const errorSelector=(state)=>state.booksReducer.error





