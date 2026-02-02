function getProfile() {
  const username = document.getElementById("username").value;
  const profile = document.getElementById("profile");

  if (!username) {
    profile.classList.remove("hidden");
    profile.innerHTML = "<p>Please enter a username</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => {
      profile.classList.remove("hidden");
      profile.innerHTML = `
        <img src="${data.avatar_url}">
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || "No bio available"}</p>

        <div class="stats">
          <div>
            <strong>${data.followers}</strong>
            <p>Followers</p>
          </div>
          <div>
            <strong>${data.following}</strong>
            <p>Following</p>
          </div>
          <div>
            <strong>${data.public_repos}</strong>
            <p>Repos</p>
          </div>
        </div>
<div>
        <button onclick="window.open('${data.html_url}', '_blank')">View GitHub Profile</button>
</div>
      `;
    })
    .catch(() => {
      profile.classList.remove("hidden");
      profile.innerHTML = "<p>❌ User not found</p>";
    });
}
