import client from "./client"

const endPoint = "/listings"

const getListings = () => client.get(endPoint);


export const addListing = (listing, onUploadProgress) => {
    const data = new FormData();
    data.append("title", listing.title);
    data.append("price", listing.price);
    data.append("categoryId", listing.category.id);
    data.append("description", listing.description);

    listing.images.forEach((image, index) =>
        data.append("images", {
            name: "image" + index,
            type: "image/jpeg",
            uri: image,
        })
    );

    data.append("type", listing.type);
    data.append("entreprise", listing.entreprise);
    data.append("location", listing.location);

    return client.post(endPoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
    getListings,
    addListing
}