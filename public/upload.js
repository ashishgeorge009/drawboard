const imageupload=document.querySelector(".image-upload");
const imagePicker=document.getElementById("imagePicker")


imageupload.addEventListener("change",function(e){
    const img=document.createElement("img");

  const  imgdata=imageupload.files[0];
    img.src=URL.createObjectURL(imgdata);
    console.log(img.src);
    const body=document.querySelector("body");
    // img.height=400+"px";
    // img.width=400+"px";
    body.appendChild(img);
})


imagePicker.addEventListener("click",function(e)
{
  imageupload.click();
})


const download=document.querySelector('.download-tool')

download.addEventListener("click",function()
{
  const url = board.toDataURL("image/jpeg");
  const anchor = document.createElement('a');

  anchor.download = "filename.jpeg"
  anchor.href =url;
  anchor.click()
  anchor.remove()
})

