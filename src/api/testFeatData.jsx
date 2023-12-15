const BASE_URL = "https://rolling-api.vercel.app/1-7";

async function fetcher(url) {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function testData() {
  return fetcher("/recipients/831/messages/?limit=1000");
}

export async function testDataEmoji() {
  return fetcher("/recipients/831/reactions/");
}

export async function testDataAll() {
  return fetcher(`/recipients/?limit=10`);
}

// export async function emojiPost(emoji) {
//   const api = await fetch(`${BASE_URL}/recipients/831/reactions/`);
//   try {
//     const response = await fetch(api, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ emoji }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   } catch (error) {
//     console.error("Error in emojiPost:", error);
//     throw error;
//   }
// }