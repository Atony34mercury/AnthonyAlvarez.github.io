const jellyfinBaseUrlEncrypted = 'aHR0cDovLzE0NC4xMjYuMTQ3LjIxNzo4MDk2';
// Example of obfuscation
const encryptedApiKey = "NjYyYThjMDgxZDk2NGVhMWFhZDEzMjZkOGJhYjI3N2M="; // This is base64-encoded "Some encrypted key"

// Decode the key when needed
function decodeApiKey(encryptedKey) {
    const decodedKey = atob(encryptedKey); // Base64 decoding
    return decodedKey;
}

const jellyfinBaseUrl = decodeApiKey(jellyfinBaseUrlEncrypted);

async function getVideoStreamUrl(videoId) {
    // const url = `${jellyfinBaseUrl}/Videos/${videoId}/stream.mp4?api_key=${apiKey}`;
    const url = `${jellyfinBaseUrl}/Videos/${videoId}/stream?api_key=${decodeApiKey(encryptedApiKey)}&Static=true`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Emby-Token': decodeApiKey(encryptedApiKey)
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const streamUrl = response.url; // Get the actual stream URL
        return streamUrl;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function playVideo(video) {
    const videoPlayer = document.getElementById('video-player');
    const streamUrl = await getVideoStreamUrl(video.Id);

    if (streamUrl) {
        console.log('Stream URL:', streamUrl); // Debugging: log the stream URL
        videoPlayer.src = streamUrl;

        // Ensure volume is set to a reasonable level and unmuted
        videoPlayer.volume = 1.0;
        videoPlayer.muted = false;

        videoPlayer.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const movieList = document.getElementById('movie-list');
    let url = `${jellyfinBaseUrl}/Items?IncludeItemTypes=Movie&Recursive=true&Fields=PrimaryImageAspectRatio,CanDelete,CanDownload,HasSubtitles,HasMediaSources,HasDefaultImage&SortBy=SortName&SortOrder=Ascending`
    fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Emby-Token': decodeApiKey(encryptedApiKey)
            }
        })
        .then(response => response.json())
        .then(data => {
            const movies = data.Items;
            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.textContent = movie.Name;
                listItem.onclick = function() {
                    const videoContainer = document.getElementById('video-container');
                    // Remove the 'hidden' attribute
                    videoContainer.removeAttribute('hidden');

                    playVideo(movie);
                };
                movieList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
});

