
const HandleUploads = async ({file})=> {
    const cloudUrl = import.meta.env.UPLOAD_IMAGE_CLOUD_URL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PayTrek"); // Set in Cloudinary

    try {
        const response = await fetch(`${cloudUrl}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        return false;
    }
}

export default HandleUploads;
