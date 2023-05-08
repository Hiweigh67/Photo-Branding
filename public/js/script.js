function loadImage(event) {
    const image = document.getElementById("image");
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      image.src = e.target.result;
  
      // Create a temporary image element to get the dimensions of the loaded image
      const tempImg = new Image();
      tempImg.src = e.target.result;
  
      tempImg.onload = function() {
        const width = tempImg.width;
        const height = tempImg.height;
  
        // Get the container element
        const container = document.getElementById("container");
        console.log(`this is height ${height} and width ${width}`)
        // Set the height of the container element based on the image orientation
        if (height > width) {
          // Portrait orientation
          container.style.height = `${height}px`;
          container.style.width = `${width}px`
        } else if (height < width) {
          // Landscape orientation
          container.style.height = `${height}px`;
          container.style.width = `${width}px`
        } else {
          // Square orientation
          container.style.height = `${height}px`;
          container.style.width = `${width}px`
        }
      };
    };
  
    reader.readAsDataURL(file);
  }
  
// Get the container element
const container = document.getElementById('container');
const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', () => {
  // Use html2canvas to create a canvas from the container
  html2canvas(container).then(canvas => {

    // Convert the canvas to a data URL and create an image element
    const imgData = canvas.toDataURL('image/png');
    const img = new Image();
    img.src = imgData;
    const over = document.createElement('div')
    over.className = "overlay"
    const over1 = document.createElement('div')
    over1.className = "over1"
    // Append the image element to the body
    var year = new Date().getFullYear()
    var month = addZero(new Date().getMonth())
    var day = addZero(new Date().getDay())
    var time = `${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}`
    // Optionally, you can also download the image using the following code
    const link = document.createElement('a');
    link.download = `${year}-${month}-${day}-${time}.png`;
    link.className = "dLink"
    link.href = imgData;
    link.text = "download Image"
    link.style.display = "block"
    link.onclick = downloadImage
    // link.click()
    const btn = document.createElement('button');
    btn.className = "bLink"
    btn.textContent = "Cancle"
    btn.onclick = downloadImage;


    over1.append(img)
    over1.append(link)
    over1.append(btn)
    over.append(over1)
    document.body.appendChild(over);
  });
});
function downloadImage(){
    const m = document.getElementsByClassName('overlay');
    for(var i=0;i< m.length; i++){
        m[i].style.display = "none"
    }
}

function addZero(a){
    if(a < 10){
        return `0${a}`
    }
    else{
        return a
    }
}
$('h2').on('click',(e)=>{
    var txt = $(e.target).text()
    console.log(txt)
    var txt1 = prompt("Enter product Name",txt)
    if(txt1===null || txt1 === ""){
        return
    }
    else{
        console.log(txt1)
        $(e.target).text(txt1)
    }
})