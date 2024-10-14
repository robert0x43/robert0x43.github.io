function toggleMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
    }
  }
  
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
  