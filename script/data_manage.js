let movieDataList = [];

export const getMovieDataList = () => {
    return movieDataList;
}

export const addMovieData = (item) => {
    movieDataList.push(item);
}

export const clearMovieDataList = () => {
    movieDataList.length = 0;
}