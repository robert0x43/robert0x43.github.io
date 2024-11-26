// Function to toggle between dark and light modes
function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      // Switch to dark mode
      body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");  // Save "dark" mode preference
      document.getElementById("toggle-mode").checked = true;  // Check the checkbox
  } else {
      // Switch to light mode
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light");  // Save "light" mode preference
      document.getElementById("toggle-mode").checked = false;  // Uncheck the checkbox
  }
}

// Function to toggle the visibility of the marquee
function toggleMarquee() {
  const marquee = document.querySelector('.rss-marquee');
  const toggle = document.getElementById('toggle-marquee');

  if (toggle.checked) {
    // Show marquee
    marquee.style.visibility = 'visible';  
    localStorage.setItem("marquee", "visible");  // Save marquee visibility preference
  } else {
    // Hide marquee
    marquee.style.visibility = 'hidden';   
    localStorage.setItem("marquee", "hidden");  // Save marquee visibility preference
  }
}

// Function to fetch RSS data and populate the marquee
const fetchRSS = async () => {
  const rssURL = "https://rss2json.com/api.json?rss_url=https://www.reddit.com/r/popular.rss";  // RSS feed URL
  const marquee = document.getElementById("rss-marquee");

  try {
      const response = await fetch(rssURL);
      const data = await response.json();  // Parse the JSON response
      const items = data.items;

      if (items.length > 0) {
          // Create the marquee content by looping through the RSS items
          let marqueeContent = "";
          for (let i = 0; i < items.length; i++) {
              const title = items[i].title;
              const link = items[i].link;
              marqueeContent += ` | <a href="${link}" class="marquee-link">${title}</a>`;
          }

          // Insert content into the marquee elements (two for seamless scrolling)
          const marqueeContents = marquee.getElementsByClassName("marquee-content");
          marqueeContents[0].innerHTML = marqueeContent;
          marqueeContents[1].innerHTML = marqueeContent;

          // Start the animation after a slight delay to ensure content is fully loaded
          setTimeout(() => {
            marqueeContents[0].style.animationPlayState = 'running';  // Begin the animation
            marqueeContents[1].style.animationPlayState = 'running';
          }, 100);  // Small delay to ensure proper loading
      }
  } catch (error) {
      console.error("Error fetching RSS:", error);
  }
};

// Function to search Google with the query from the search bar
function searchGoogle() {
  const query = document.querySelector('.search-bar').value;
  if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query + ' site:reddit.com')}`;
  }
}

// Trigger search when the Enter key is pressed in the search bar
document.querySelector('.search-bar').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      searchGoogle();
  }
});

// Apply saved theme and marquee preferences when the page loads
window.onload = function() {
  // Apply saved theme if it exists
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(savedTheme + "-mode");

      // Set the toggle checkbox state based on the saved theme
      document.getElementById("toggle-mode").checked = (savedTheme === "dark");
  }

  // Apply saved marquee visibility preference
  const savedMarquee = localStorage.getItem("marquee");
  if (savedMarquee) {
      const marquee = document.querySelector('.rss-marquee');
      marquee.style.visibility = savedMarquee;  // Apply saved marquee visibility
      document.getElementById("toggle-marquee").checked = (savedMarquee === "visible");
  }

  // Fetch RSS content after the page loads
  fetchRSS();
};
