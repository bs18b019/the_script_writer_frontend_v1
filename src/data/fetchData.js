import { SERVER_URL } from '../config';

export const getFiltersData = async (kpi, ujp, business, uat, userGl, userIDGl) => {
  try {
    const res = await fetch(SERVER_URL + '/ujpkpidrill-s/fetchFiltersData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ KPI_ID: kpi, BUSINESS: business, UAT: uat, user: userGl, userID: userIDGl })
    });
    const response = await res.json();

    return response.filterColumns;
  } catch (error) {
    console.log(error);
    return {error};
  }
};

export const saveContent = async (username, mainContent, contentTitle, uid) => {
  try {
    if(mainContent.length === 0 || contentTitle.length === 0){
      console.log("Please type some content to save it");
    }
    const res = await fetch(SERVER_URL + '/dbInteractions/saveContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, mainContent, contentTitle, uid})
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.error('Error saving content:', error);
    return { error: error.message };
  }
};

export const deleteContent = async (id) => {
  try {
    const res = await fetch(SERVER_URL + '/dbInteractions/deleteContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error('Error saving content:', error);
    return { error: error.message };
  }
};

export const fetchAllContents = async (username) => {
  try {
    const res = await fetch(SERVER_URL + '/dbInteractions/fetchContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username})
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.error('Error saving content:', error);
    return { error: error.message };
  }
};


// export const getRhymings = async () => {
//   try {
//     const res = await fetch(SERVER_URL + '/dbInteractions/getRhymingWords', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({})
//     });
//     const response = await res.json();

//     return response;
//   } catch (error) {
//     console.error('Error saving content:', error);
//     return { error: error.message };
//   }
// };

// export const getSynonyms = async () => {
//   const data = ["moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon", "moon", "spoon", "loon"];
//   setSynonyms(data);
// };






