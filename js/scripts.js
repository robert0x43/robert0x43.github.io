function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark"); // Save "dark" theme to localStorage
      document.getElementById("toggle-mode").checked = true; // Check the checkbox
  } else {
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light"); // Save "light" theme to localStorage
      document.getElementById("toggle-mode").checked = false; // Uncheck the checkbox
  }
}

// Function to apply the saved theme on page load
window.onload = function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(savedTheme + "-mode");
      
      // Set the checkbox state based on the saved theme
      document.getElementById("toggle-mode").checked = (savedTheme === "dark");
  }
};
  
  function searchGoogle() {
    const query = document.querySelector('.search-bar').value;
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query + ' site:reddit.com')}`;
    }
  }
  
  // Trigger search when Enter key is pressed
  document.querySelector('.search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchGoogle();
    }
  });

  const fetchRSS = async () => {
    const rssURL = "https://rss2json.com/api.json?rss_url=https://www.reddit.com/r/popular/.rss"; // Replace with your RSS feed URL
    const marquee = document.getElementById("rss-marquee");

    try {
        const response = await fetch(rssURL);
        const data = await response.json();

        if (data && data.items) {
            const items = data.items.map(item => `<span>${item.title}</span>`);
            marquee.innerHTML = items.join(" | ");
        } else {
            marquee.innerHTML = "<span>No feed items available.</span>";
        }
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        marquee.innerHTML = "<span>Error loading feed.</span>";
    }
};

// Initialize the RSS fetch
fetchRSS();
  