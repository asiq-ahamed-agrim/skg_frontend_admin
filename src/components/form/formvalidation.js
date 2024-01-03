import "../style/form/test.scss"
import { useEffect, useState } from "react";
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    textAlign: 'center',
    padding: '20px',
    cursor: 'pointer',
  };
  
  const croppedImageStyles = {
    maxWidth: '100%',
    height: 'auto',
  };
  
export default function TestPage() {
    const[state,setstate]=useState(false)
    const[state2,setstate2]=useState(false)

const aaa=(e)=>{       
    e.stopPropagation();
        // $("#email-popup").show("fast");
        setstate(true)
    }
    const bbb=(e)=>{
        e.stopPropagation();
        // $("#phone-popup").show("fast");
        setstate2(true)

    }
    
    $(document).click(function(e) {
         if (!(e.target.id === 'email-popup' || e.target.id === 'phone-popup')) {
            //  $("#email-popup, #phone-popup").hide("fast"); 
             setstate(false)        
             setstate2(false)                       
               
         }
    });  

    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 });
    const [croppedImage, setCroppedImage] = useState(null);
  
    const handleImageChange = (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedImage(URL.createObjectURL(file));
    };
  
    const handleCropChange = (newCrop) => {
      setCrop(newCrop);
    };
  
    const handleCropComplete = (cropArea, imagePixelSize) => {
      if (selectedImage) {
        const image = new Image();
        image.src = selectedImage;
  
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / imagePixelSize.width;
        const scaleY = image.naturalHeight / imagePixelSize.height;
  
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          cropArea.x * scaleX,
          cropArea.y * scaleY,
          cropArea.width * scaleX,
          cropArea.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );
  
        canvas.toBlob((blob) => {
          setCroppedImage(URL.createObjectURL(blob));
        }, 'image/jpeg');
      }
    };
  
    return (
      <div className="testpage" >
        
<input type="button" class="email" value="email" onClick={aaa} />
<input type="button" class="phone" value="phone" onClick={bbb} />

<Dropzone onDrop={handleImageChange}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag and drop an image here, or click to select one.</p>
          </div>
        )}
      </Dropzone>
      {selectedImage && (
        <ReactCrop
          src={selectedImage}
          crop={crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
        />
      )}
      {croppedImage && (
        <div>
          <p>Cropped Image Preview:</p>
          <img src={croppedImage} alt="Cropped" style={croppedImageStyles} />
        </div>
      )}
      </div>
    );
  }




