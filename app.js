
const urlContainer = document.querySelector('.url-container');
const shortenButton = document.querySelector('.btn-shorten');
const urlInput = document.querySelector('.url-input');
const inputError = document.querySelector('.input-error');

urlInput.addEventListener('keypress', () => {
    inputError.style.display = 'none';
    urlInput.style.border = 'none';
    urlInput.style.color = '#000';
});

shortenButton.addEventListener('click', async (event) => {

    console.log('Shorten button clicked');

    // Error check
    if(urlInput.value == '') {
        console.log('ERROR');
        inputError.style.display = 'block';
        urlInput.style.border = '1px red solid';
        urlInput.style.color = 'red';
    }

    console.log(urlInput.value)  

    // Fetch data from API
    let res;

    try {
        shortenButton.textContent = 'Converting';
        res = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlInput.value}`)
        shortenButton.textContent = 'Shorten it!';
    } catch(error) {
        console.log('API Error');
        shortenButton.textContent = 'Shorten it!';
        return;
    }

    res = (await res.json()).result.full_short_link;

    // Create the url data container
    const urlData = document.createElement('div');
    urlData.classList.add('url-data');
    const urlOrg = document.createElement('a');
    urlOrg.classList.add('url-org');
    urlOrg.textContent = urlInput.value;
    urlOrg.href = urlInput.value;

    const urlShort = document.createElement('a');
    urlShort.classList.add('url-short');
    urlShort.textContent = res;
    urlShort.href = res;

    const copyButton = document.createElement('button');
    copyButton.addEventListener('click', () => {
        console.log('Copy Button clicked');
        copyButton.style.backgroundColor = 'hsl(255, 11%, 22%)';
        copyButton.textContent = 'Copied';
    });

    copyButton.textContent = "Copy";

    urlData.appendChild(urlOrg);
    urlData.appendChild(urlShort);
    urlData.appendChild(copyButton);

    urlContainer.appendChild(urlData);
});