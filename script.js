

const group = document.querySelector('.group');
const parent = document.querySelector('.videos');

const apiKey = 'AIzaSyBV9BzNLdJNXHfSq9pKT_cMEZu0qCndlH4'; // ← Paste your API key here
const playlistId = 'PL0D1m9x7BZeAPeqU6HCOBMTVh2Q4BsWUq';
const maxResults = 50;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;

fetch(url)
    .then(res => res.json())
    .then(data => {
    data.items.forEach(item => {
        const videoId = item.snippet?.resourceId?.videoId;
        const title = item.snippet?.title || 'No Title';
        const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        const link = `https://www.youtube.com/watch?v=${videoId}`;

        // Skip if no video ID or thumbnail
        if (!videoId || !thumbnail) return;

        const el = document.createElement('div');
        el.className = 'video';
        el.setAttribute('onClick', `window.open("${link}", "_blank")`);
        el.innerHTML = `
            <img class="thumbnail" src="${thumbnail}" alt="${title}">
            <p>${title}</p>
        `;
        group.appendChild(el);
    });
    })
    .then(() => {
        parent.appendChild(group.cloneNode(true)).setAttribute('aria-hidden', 'true');
        parent.appendChild(group.cloneNode(true)).setAttribute('aria-hidden', 'true');
    })

