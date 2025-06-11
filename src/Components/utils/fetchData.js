export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '960a3fbe01msh515fa685f11a260p1df61fjsn25df6125545d',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};


export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '960a3fbe01msh515fa685f11a260p1df61fjsn25df6125545d',
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429) {
        alert("You are making too many requests. Please wait and try again later.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};



