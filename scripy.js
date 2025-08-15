 apconstiKey = "c2e38691b5b7485493065b959df45a3a"; // Replace with your NewsAPI key
const container = document.getElementById("news-container");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

// Fetch news by keyword
async function fetchNews(query) {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    container.innerHTML = "<p>Loading...</p>";
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok" || data.articles.length === 0) {
      container.innerHTML = "<p>No news found.</p>";
      return;
    }

    container.innerHTML = ""; // Clear old news
    data.articles.forEach(article => {
      const newsEl = document.createElement("article");
      newsEl.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/300x180'}" alt="News Image">
        <h2>${article.title}</h2>
        <p>${article.description || ""}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      container.appendChild(newsEl);
    });
  } catch (err) {
    console.error("Error fetching news:", err);
    container.innerHTML = "<p>Failed to load news.</p>";
  }
}

// Event listener for search
form.addEventListener("submit", e => {
  e.preventDefault();
  const query = input.value.trim();
  if (query) {
    fetchNews(query);
  }
});
