//from cloudniry web
const cloud_name="df7i1wfqo";
const uplode_preset="Saja Lahaleh";


export const uplodeToCloudinary=async(pics,fileType)=>{

    if(pics && fileType){
        const data=new FormData();
        data.append("file",pics);
        data.append("upload_preset",uplode_preset);
        data.append("cloud_name",cloud_name);

       // const res=await fetch(`CLOUDINARY_URL=cloudinary://717828926835743:xMU7rBb1DTqXbEVx1-OpFs9YCSU@df7i1wfqo`),

       const res=await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
        {method:"post",body:data}
       );

       console.log("res=> ",res)
       const fileData = await res.json();
       console.log("fileData.url=> ",fileData.url)
       return fileData.url
    }else{
        console.log("erorrrrrrrrr123");
    }

}