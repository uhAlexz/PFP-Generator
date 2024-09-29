

async function getUUID(username) {
    try {
        const response = await fetch('/generate_pfp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const data = await response.json();
        if (data.uuid) {
            return data.uuid
        } else {
            alert(data.error);
            console.log('This error indeed works.')
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}



document.getElementById('generateBTN').addEventListener('click', async function() {

    const username = document.getElementById('username').value;
    const uuid = await getUUID(username);
    console.log(uuid);
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    
    const canvas = document.getElementById('gradientCanvas');
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    const skinUrl = `https://skins.mcstats.com/skull/${uuid}?scale=1&fallbackTexture=steve&overlay=true&cropMeasurement=pixels&expandMeasurement=pixels&cropLeft=0&cropRight=0&cropTop=0&cropBottom=0&expandLeft=0&expandRight=0&expandTop=0&expandBottom=0&alwaysSquare=true&grayscale=false`;
    const playerHeadImg = new Image();
    playerHeadImg.src = skinUrl;
    playerHeadImg.crossOrigin = "anonymous";

    playerHeadImg.onload = function() {
        const headSize = 300;
        const x = (canvas.width - headSize) / 2;
        const y = (canvas.height - headSize) / 2;
        ctx.drawImage(playerHeadImg, x, y, headSize, headSize);

        canvas.classList.remove('hidden');
        
        const dataURL = canvas.toDataURL('image/png');
        const downloadBTN = document.getElementById('downloadBTN');
        
        downloadBTN.href = dataURL;
        downloadBTN.classList.remove('hidden');
        downloadBTN.classList.add('block');
        downloadBTN.download = `${username}_pfp.png`;
    }

    playerHeadImg.onerror = function() {
        alert("Error loading the Minecraft skin. Please check the username.");
    };

});