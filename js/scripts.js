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

function toggleMarquee() {
  const marquee = document.querySelector('.rss-marquee');
  const toggle = document.getElementById('toggle-marquee');

  if (toggle.checked) {
    marquee.style.visibility = 'visible';  // Show marquee
    localStorage.setItem("marquee", "visible");
    toggle.checked = true;
  } else {
    marquee.style.visibility = 'hidden';   // Hide marquee
    localStorage.setItem("marquee", "hidden");
    toggle.checked = false;
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

  const savedMarquee = localStorage.getItem("marquee");
  if (savedMarquee) {
      const marquee = document.querySelector('.rss-marquee');
      marquee.style.visibility = savedMarquee;  // Show marquee
      document.getElementById("toggle-marquee").checked = (savedMarquee === "visible");
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
    const rssURL = "https://rss2json.com/api.json?rss_url=https://www.reddit.com/r/popular.rss"; // Replace with your RSS feed URL
    const marquee = document.getElementById("rss-marquee");

    try {
        const response = await fetch(rssURL);
        const data = await response.json(); // Get the JSON response
        const items = data.items;

        if (items.length > 0) {
            // Map through the items and create a string with the titles
            let marqueeContent = "";
            for (let i = 0; i < items.length; i++) {
                const title = items[i].title;
                marqueeContent += `<span>${title}</span> | `;
            }

            // Insert the content into both marquee-content elements
            const marqueeContents = marquee.getElementsByClassName("marquee-content");
            marqueeContents[0].innerHTML = marqueeContent;
            marqueeContents[1].innerHTML = marqueeContent;

            // Set the animation to start after content is loaded
            setTimeout(() => {
              marqueeContents[0].style.animationPlayState = 'running'; // Start the animation after content is loaded
              marqueeContents[1].style.animationPlayState = 'running';
            }, 100); // Small delay to ensure everything is loaded
        } else {
            marquee.innerHTML = "<div class='marquee-content'>No feed items available.</div>";
        }
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
    }
};

// Initialize the RSS fetch
fetchRSS();
  