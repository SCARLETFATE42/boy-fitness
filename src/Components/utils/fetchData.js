export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'c9f044dff7msh1a4ab3a02813ac4p141e64jsn6905b4eb45d4',
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};


export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'c9f044dff7msh1a4ab3a02813ac4p141e64jsn6905b4eb45d4',
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



