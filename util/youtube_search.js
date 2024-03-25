import axios from "axios";

// 개인 api key
const YOUTUBE_API_KEY = "AIzaSyBYpYqVTEksn3DY0VvPXk30XjTY-jhG_Zw";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

// youtube에 정보를 가져올 수 있는 코드(현재 사용 중은 아님)
export const searchYoutube = async (keyword) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet",
        maxResults: 10,
        key: YOUTUBE_API_KEY,
        q: keyword,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("YouTube 검색 에러:", error);
    return [];
  }
};
