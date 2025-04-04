let currentIframeContainer = null;


function loadAccountPage() {
   
    openIFrame('accountsettings');
}

function loadUploadPage() {
   
    openIFrame('uploadframe');
}

function openIFrame(containerId)
{
    if(currentIframeContainer)
    {
        currentIframeContainer.style.display='none';
    }

    const newIframeContainer=document.getElementById(containerId);
    if(newIframeContainer)
    {
        newIframeContainer.style.display='block';
        currentIframeContainer= newIframeContainer;
    }
}

